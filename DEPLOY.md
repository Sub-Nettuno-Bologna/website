# Deployment Guide

This project uses a **split architecture**:

- **Static site** → Deployed on Cloudflare Pages
- **Contact API** → Deployed on Cloudflare Workers

## Prerequisites

1. Cloudflare account with Workers and Pages enabled
2. Resend account with API key
3. DNS access for `subnettuno.it` (or your domain)

## Step 1: Deploy the Contact API Worker

### 1.1 Set Worker Secrets

```bash
# Set Resend API key
wrangler secret put RESEND_API_KEY -c wrangler.api.jsonc

# Set recipient email
wrangler secret put RESEND_TO_EMAIL -c wrangler.api.jsonc

# Set sender email (must be verified in Resend)
wrangler secret put RESEND_FROM_EMAIL -c wrangler.api.jsonc

# Optional: Set allowed origins (comma-separated)
wrangler secret put ALLOWED_ORIGINS -c wrangler.api.jsonc
# Example: "https://subnettuno.it,https://www.subnettuno.it"
```

### 1.2 Deploy the Worker

```bash
npm run deploy:api
# or
wrangler deploy -c wrangler.api.jsonc
```

### 1.3 Note the Worker URL

After deployment, note the Worker URL. It will be something like:

```
https://subnettuno-contact-api.YOUR_ACCOUNT.workers.dev
```

The contact endpoint will be at:

```
https://subnettuno-contact-api.YOUR_ACCOUNT.workers.dev/contact
```

## Step 2: Deploy Static Site to Cloudflare Pages

### 2.1 Build the Site

```bash
npm run build
```

### 2.2 Set Environment Variables in Cloudflare Pages

In the Cloudflare Pages dashboard:

1. Go to your Pages project settings
2. Navigate to "Environment Variables"
3. Add the following:

- **Variable**: `PUBLIC_CONTACT_API_URL`
- **Value**: `https://subnettuno-contact-api.YOUR_ACCOUNT.workers.dev/contact`
- **Environment**: Production (and Preview if needed)

### 2.3 Deploy

```bash
npm run deploy
# or
wrangler pages deploy dist
```

Or connect your Git repository to Cloudflare Pages for automatic deployments.

## Step 3: Configure DNS

### Option A: DNS on Cloudflare (Recommended)

1. Add your domain to Cloudflare
2. Update nameservers at your domain registrar
3. In Cloudflare Pages, add custom domain `subnettuno.it`
4. Cloudflare will automatically configure DNS

### Option B: External DNS Provider

1. In Cloudflare Pages, add custom domain `subnettuno.it`
2. Cloudflare will provide verification records (TXT/CNAME)
3. Add these records to your DNS provider
4. For apex domain, use **ALIAS/ANAME** record pointing to Pages
   - If your provider doesn't support ALIAS/ANAME, you may need to use A records (IPs provided by Cloudflare)

## Step 4: Test

1. Visit your site: `https://subnettuno.it/contatti`
2. Fill out and submit the contact form
3. Verify email is received
4. Check browser console for any CORS errors

## Local Development

### Run Static Site

```bash
npm run dev
```

### Run API Worker Locally

```bash
npm run dev:api
```

The Worker will run on `http://localhost:8787`

### Configure Local API URL

Create a `.env` file:

```env
PUBLIC_CONTACT_API_URL=http://localhost:8787/contact
```

## Troubleshooting

### CORS Errors

- Ensure `ALLOWED_ORIGINS` secret includes your domain
- Check that the Origin header matches exactly (including protocol and trailing slash)

### Email Not Sending

- Verify Resend API key is correct
- Check that `RESEND_FROM_EMAIL` is verified in Resend dashboard
- Check Worker logs: `wrangler tail -c wrangler.api.jsonc`

### Form Not Submitting

- Check browser console for errors
- Verify `PUBLIC_CONTACT_API_URL` is set correctly
- Ensure Worker is deployed and accessible

## Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─── GET /contatti ────┐
       │                      │
       │                      ▼
       │              ┌──────────────┐
       │              │ Cloudflare   │
       │              │    Pages     │
       │              │  (Static)    │
       │              └──────────────┘
       │
       └─── POST /contact ────┐
                               │
                               ▼
                        ┌──────────────┐
                        │ Cloudflare   │
                        │   Worker     │
                        │   (API)      │
                        └──────┬───────┘
                               │
                               ▼
                        ┌──────────────┐
                        │    Resend    │
                        │     API      │
                        └──────────────┘
```
