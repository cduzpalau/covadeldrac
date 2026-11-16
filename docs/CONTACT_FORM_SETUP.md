# Contact Form & Cloudflare Free Tier Setup Guide

This project exports pure static HTML (`out/`) via Next.js (`output: "export"`) and pairs it with a lightweight **Cloudflare Pages Function** (`functions/api/contact.ts`) that forwards validated submissions to **Google Workspace** (Gmail inbox + Google Sheet backup) at **\$0/month** with zero third-party SaaS accounts and zero changes to your Google Workspace `MX` records.

---

## 1. Set Up the Google Workspace Receiver (~3 minutes)

1. Logged into your **Google Workspace** account, create a new **Google Sheet** in Google Drive (e.g., `La Cova del Drac — Consultes Web`).
2. Click **Extensions → Apps Script**.
3. Replace the default `Code.gs` contents with [`scripts/google-apps-script-contact.js`](../scripts/google-apps-script-contact.js) and press **Save (`Cmd+S` / `Ctrl+S`)**.
4. In the Apps Script top toolbar, select **`authorizePermissions`** from the function dropdown and click **Run** once to grant Google Sheets + Mail permissions for your account.
5. Generate a random secret string (for example: `openssl rand -hex 24`).
6. In Apps Script, open **Project Settings (⚙️) → Script Properties → Add script property**:
   - `CONTACT_WEBHOOK_SECRET`: `<your-random-secret>` (without surrounding quotes)
   - *(Optional)* `CONTACT_RECIPIENT_EMAIL`: `<destination-email@lacovadeldrac.com>` (you can also set or override this directly from Cloudflare environment variables whenever the final Workspace inbox or group alias is created).
7. Click **Deploy → New deployment**:
   - Select type: **Web app**
   - **Execute as**: `Me` (your Google Workspace account)
   - **Who has access**: **`Anyone`** *(Important: in Google Workspace, do **not** pick "Anyone within `<your organization>`". If "Anyone" is missing from the dropdown, go to **Google Admin Console → Apps → Google Workspace → Drive and Docs → Sharing settings** and allow sharing outside the organization).*
   - Click **Deploy** and copy the **Web app URL** ending in **`/exec`** (`https://script.google.com/macros/s/.../exec`).
   - *(Note: If you later edit `Code.gs`, click **Deploy → Manage deployments → Edit (✏️) → Version: New version → Deploy** so the live `/exec` endpoint picks up your changes).*

---

## 2. Deploy on Cloudflare Pages (Free Tier)

1. In the **Cloudflare Dashboard**, go to **Workers & Pages → Create → Pages → Connect to Git** and select this repository.
2. Configure build settings:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
3. Under **Settings → Variables and Secrets** (Production & Preview), add (without surrounding quotes):
   - `GOOGLE_SCRIPT_WEBHOOK_URL` = `<Web app /exec URL from Step 1>`
   - `CONTACT_WEBHOOK_SECRET` = `<same secret from Step 1>` (save as **Secret**)
   - `CONTACT_RECIPIENT_EMAIL` = `<target@lacovadeldrac.com>` *(optional until you decide the exact email; if left empty, emails go to the Google Workspace user who owns the Google Sheet/Apps Script—and you can change `CONTACT_RECIPIENT_EMAIL` here anytime).*
4. Trigger a new deployment after adding or editing environment variables so Cloudflare binds them to the live function.

Cloudflare Pages automatically deploys both the static `out/` site (including `public/_redirects` for `/ → /ca`) and `functions/api/contact.ts` as `POST /api/contact`.

---

## 3. Local End-to-End Testing

```bash
cp .dev.vars.example .dev.vars
# Fill in GOOGLE_SCRIPT_WEBHOOK_URL and CONTACT_WEBHOOK_SECRET in .dev.vars
npm run build
npx wrangler pages dev out
```
