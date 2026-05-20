# Hinoki Technologies — Marketing Site

This is the production implementation of the `design_handoff_hinoki/` prototype using **Next.js App Router**, **TypeScript**, and **Tailwind CSS v4**.

## Local development

```bash
npm install
npm run dev
```

## Routes

- `/` — marketing one-pager (Nav → Hero → Metrics → Features → Applications → CTA → Footer)
- `/reflex` — canvas animation reference (discrete vs continuous control)
- `/hub` — private deck index (password: `PITCH_HUB_PASSWORD`; notes sync via Vercel Blob in production, or `data/pitch-hub-notes.json` locally). Old URL `/pitch/hub` redirects here.
- `/pitch` — English investor deck (share this link; PDF at `/pitch/pdf`)
- `/pitch/pre-seed` — redirects to `/pitch` (bookmarks)
- `/pitch-jp` — Japanese investor deck

## Assets

This repo includes lightweight SVG placeholders:

- `public/assets/logo-mark-light.svg`
- `public/assets/logo-mark.svg`

If you have the official handoff assets (`logo-mark-light.png`, `logo-mark.png`, `banner.jpg`), copy them into `public/assets/` and update the `<img src="...">` paths if desired.

## Deploy to Vercel

1. Push this folder to GitHub (or any Git provider).
2. In Vercel, **Import Project** and set:
   - **Root Directory**: `hinoki-site`
   - **Framework Preset**: Next.js (auto-detected)
3. Deploy.

If you want to deploy from the CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
