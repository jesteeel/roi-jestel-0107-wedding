# RSVP integration — deployment instructions

Your Google Apps Script web app is deployed at:
https://script.google.com/macros/s/AKfycbxq_vtHIJqd1BMKmQAEzQj091N7-ipPmZ-Hr-gWXL8xepj6t9r-ydrAUEOTcZ37UfMkPQ/exec

The existing frontend was built for REST routes and cannot directly call the Google Apps Script endpoint. `worker.js` is the bridge translating the frontend requests to the Apps Script actions and returning CORS-enabled responses.

1. In Cloudflare Workers, create a Worker and replace its code with `worker.js`. Deploy.
2. In Worker Settings → Variables and Secrets, set `APPS_SCRIPT_URL` to the `/exec` URL above, and `ALLOWED_ORIGIN` to `https://jesteeel.github.io` (or your exact custom-domain origin). You can use a secret for the URL.
3. Copy the Worker URL (e.g. `https://your-worker.your-subdomain.workers.dev`) into `config.js` as `window.WEDDING_API_BASE`. No trailing slash.
4. Upload the `roi-jestel-website` contents (not the enclosing folder) to the GitHub repository `jesteeel/roi-jestel-0107-wedding`. Enable GitHub Pages from main/root.
5. Test guest lookup using one of the sample names and its matching link; submit a test RSVP; verify the Sheet and RSVP Logger. Test admin login, add/edit/delete, and copy links.
6. Replace sample guests with real guests before sharing links.

Security notes: invitation URLs act as bearer secrets and may be forwarded. Name + code is lightweight verification. The admin token is stored in sessionStorage, not persistent storage. The Google Apps Script deployment must remain accessible to the Worker. The Worker is a CORS adapter, not a security boundary against direct Apps Script calls. Rate limiting and abuse prevention are advisable before public release.

IMPORTANT: The code has not been live end-to-end tested or deployed. The site must not be considered live until these steps and tests succeed.
