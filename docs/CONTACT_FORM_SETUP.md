# Contact Form & Cloudflare Free Tier Setup Guide

This project exports pure static HTML (`out/`) via Next.js (`output: "export"`) and pairs it with a lightweight **Cloudflare Pages Function** (`functions/api/contact.ts`) that forwards validated submissions to **Google Workspace** (Gmail inbox + Google Sheet backup) at **$0/month** with zero third-party SaaS accounts and zero changes to your Google Workspace `MX` records.

---

## 1. Set Up the Google Workspace Receiver (~3 minutes)

1. Logged into your **Google Workspace** account, create a new **Google Sheet** in Google Drive (e.g., `La Cova del Drac — Consultes Web`).
2. Click **Extensions → Apps Script**.
3. Replace the default `Code.gs` contents with [`scripts/google-apps-script-contact.js`](../scripts/google-apps-script-contact.js) and save.
4. Generate a random secret string (for example: `openssl rand -hex 24`).
5. In Apps Script, open **Project Settings (⚙️) → Script Properties → Add script property**:
   - `CONTACT_WEBHOOK_SECRET`: `<your-random-secret>`
   - *(Optional)* `CONTACT_RECIPIENT_EMAIL`: `<destination-email@covadeldrac.com>` (you can also set or override this directly from Cloudflare environment variables whenever the final Workspace inbox or group alias is created).
6. Click **Deploy → New deployment**:
   - Select type: **Web app**
   - **Execute as**: `Me` (your Google Workspace account)
   - **Who has access**: `Anyone`
   - Authorize the script when prompted and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

---

## 2. Deploy on Cloudflare Pages (Free Tier)

1. In the **Cloudflare Dashboard**, go to **Workers & Pages → Create → Pages → Connect to Git** and select this repository.
2. Configure build settings:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
3. Under **Settings → Environment variables** (Production & Preview), add:
   - `GOOGLE_SCRIPT_WEBHOOK_URL` = `<Web app URL from Step 1>`
   - `CONTACT_WEBHOOK_SECRET` = `<same secret from Step 1>` (save as **Secret**)
   - `CONTACT_RECIPIENT_EMAIL` = `<target@covadeldrac.com>` *(optional until you decide the exact email; if left empty, emails go to the Google Workspace user who deployed the Apps Script—and you can change `CONTACT_RECIPIENT_EMAIL` here anytime without redeploying the Apps Script).*

Cloudflare Pages automatically deploys both the static `out/` site (including `public/_redirects` for `/ → /ca`) and `functions/api/contact.ts` as `POST /api/contact`.

---

## 3. Local End-to-End Testing

```bash
cp .dev.vars.example .dev.vars
# Fill in GOOGLE_SCRIPT_WEBHOOK_URL and CONTACT_WEBHOOK_SECRET in .dev.vars
npm run build
npx wrangler pages dev out
```

