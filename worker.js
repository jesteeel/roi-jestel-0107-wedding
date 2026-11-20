/** Cloudflare Worker bridge for the wedding website and Google Apps Script.
 * Set Worker environment variable APPS_SCRIPT_URL to your deployed /exec URL.
 * Set ALLOWED_ORIGIN to your GitHub Pages origin (e.g. https://jesteeel.github.io).
 */
const json = (obj,status=200,origin='') => new Response(JSON.stringify(obj),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...(origin?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{})}});
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 const allowed=env.ALLOWED_ORIGIN||'https://jesteeel.github.io';
 const cors=origin===allowed?origin:'';
 if(request.method==='OPTIONS') return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':cors||allowed,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Max-Age':'600','Vary':'Origin'}});
 if(origin && !cors) return json({error:'Origin not allowed'},403);
 if(request.method!=='POST') return json({error:'Method not allowed'},405,cors);
 const url=new URL(request.url); const path=url.pathname;
 let input; try{input=await request.json()}catch{return json({error:'Invalid JSON'},400,cors)}
 const token=(request.headers.get('Authorization')||'').replace(/^Bearer\s+/i,'');
 let payload;
 if(path==='/api/lookup') payload={action:'lookup',name:input.name,code:input.invitation_code};
 else if(path==='/api/rsvp') payload={action:'rsvp',name:input.name,code:input.invitation_code,responses:input.responses};
 else if(path==='/api/admin/login') payload={action:'adminLogin',password:input.passcode};
 else if(path==='/api/admin/groups' && input.operation==='list') payload={action:'adminList',token};
 else if(path==='/api/admin/guest/upsert') payload={action:'adminUpsertGuest',token,...input};
 else if(path==='/api/admin/guest/delete') payload={action:'adminDeleteGuest',token,guestId:input.guestId};
 else if(path==='/api/admin/logout') payload={action:'adminLogout',token};
 else return json({error:'Unknown endpoint'},404,cors);
 if(!env.APPS_SCRIPT_URL) return json({error:'Worker APPS_SCRIPT_URL not configured'},503,cors);
 try{
  const r=await fetch(env.APPS_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),redirect:'follow'});
  const data=await r.json();return json(data,data.ok===false?400:200,cors);
 }catch{return json({error:'RSVP service temporarily unavailable'},502,cors)}
}};
