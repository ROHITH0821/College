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

1. Push this folder to GitHub, GitLab, or Bitbucket. If your repository root is the parent folder (not `cmr-site` alone), set **Root Directory** to `cmr-site` in the Vercel project settings.
2. Import the repo at [vercel.com/new](https://vercel.com/new). Vercel detects **Next.js**; leave **Build Command** as `next build` and **Output** as default.
3. **Node:** This project targets **Node 20+** (see `package.json` `engines` and `.nvmrc`). Vercel uses Node 20.x by default on current runtimes—no env vars are required for a static marketing site.
4. Deploy. After the first build, assign your domain under **Project → Settings → Domains**.

More detail: [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs).
