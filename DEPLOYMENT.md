# Production deployment checklist

## Before connecting the domain

1. Copy `.env.example` to `.env.local` for local testing, or add the same variables in Vercel Project Settings > Environment Variables.
2. Set `NEXT_PUBLIC_SITE_NAME` to the final public brand.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS URL, without a trailing slash.
4. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the support email for the domain.
5. Run `npm run typecheck` and `npm run build`.

## Advertising

1. Create and publish the Privacy, Cookie, Terms, About, and Contact pages.
2. Add a real cookie-consent experience if required by the countries you serve.
3. After AdSense approval, set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` to the value beginning with `ca-pub-`.
4. Verify `/ads.txt` returns the AdSense seller line.
5. Add the final AdSense script and ad slots only after approval.

## Files that change later

- `.env.local` locally, or Vercel environment variables in production
- `app/contact/page.tsx` only if you want to add more support details
- `README.md` for developer documentation

Do not commit `.env.local`. It is ignored by `.gitignore`.
