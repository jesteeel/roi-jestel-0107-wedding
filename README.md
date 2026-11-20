# Roi & Jestel — Wedding Website

Responsive static wedding website for January 7, 2027 at 2:00 PM (Philippine time).

## Included
- `index.html`: opening screen, green invitation, gallery with Art Deco placeholders, details, entourage, attire, black-and-gold RSVP and live countdown.
- `admin/index.html`: prepared admin interface for passcode login, grouped invitations, RSVP counts and guest list management.
- `assets/`: design images and attire illustrations.
- `config.js`: future API endpoint configuration.

## Preview and publish now
Open `index.html` in a browser or publish the folder to GitHub Pages. The design and animations work immediately. The RSVP form and admin page intentionally show that the guest service is not connected yet. **No RSVP responses are saved**, and no guest list is exposed.

## Google Sheets integration — later
When the guest list is ready, connect a private Google Sheet through a Google Apps Script web app. Implement server-side lookup, group membership retrieval, RSVP updates, admin login/session validation, and admin group listing. Set `window.WEDDING_API_BASE` in `config.js` after implementing and testing the endpoint.

**Important:** Google Apps Script does not automatically support the existing REST routes, JSON CORS requests, or Authorization headers used in these starter interfaces. The frontend API adapter must be updated when the Apps Script deployment method is selected. Do not merely paste an Apps Script URL into `config.js` and assume the integration is complete.

Never put an admin passcode, private guest list, or Google Sheet credentials in HTML/JavaScript hosted on GitHub Pages. The `/admin/` page itself is public static HTML; access to guest data must be checked server-side. Name-only guest lookup is susceptible to guessing, so add rate limits or invitation codes before launch.

The RSVP UI is designed for a guest name to resolve a whole family/group; each member can be selected individually, with a calculated attending total and yes/no response. The countdown uses the Philippine time zone.

Latest visual updates: frameless gold foliage on invitation, three-column attire on desktop, Attire & Gifts section, gold favicon, footer countdown without seconds. Google Sheets integration remains pending.

Latest refinements: removed footer name/date line; gold favicon with white heart; dark forest-green attire palette with centered 3+2 cards and male/female dress reminders; separate gifts section; fine-line gold botanical corners on the invitation.

## Godparents invitation URL
Append `?attire=godparents` to the website URL to preselect the Godparents tab. Standard URLs show Guests.

## Google Sheets setup (pending)
Do not publish guest names, passcodes, or Google Sheet IDs in the public repository. Google Apps Script must verify lookup and admin requests server-side. The existing `/api/...` fetch routes are placeholders, not directly compatible with Apps Script; an adapter or backend endpoint is needed.


## Personalized invitation links (frontend prepared)
Each invitation group will have a unique, randomly generated code stored privately in Google Sheets. The admin interface shows **Copy invitation link** per group when the backend supplies `invitation_code`. It copies a URL like `https://YOUR-DOMAIN/?invite=RJ-EXAMPLE`. The guest page reads the code and sends it with the full name to `/api/lookup`. The Apps Script backend must verify BOTH against the same group, rate-limit lookups, and never return guest data without successful verification.

Set `window.WEDDING_SITE_URL` in `config.js` to your final GitHub Pages/custom-domain URL, or leave blank to use the current site URL. The button stays disabled until the backend supplies a code. **Google Sheets/Apps Script are not yet connected; no live lookup, submissions, or admin authentication are active.**

Do not publish your private sheet or put codes/passcodes in GitHub. Anyone with a personalized link may share it; treat it as a private invitation.
