# Alchemyst AI — Context Layer (new-positioning)

Next.js 16.2 App Router landing page for the Alchemyst AI Context Layer product, built around the **"Never let your AI Agents work on stale Knowledge again"** positioning.

## Stack

- **Next.js 16.2** — App Router, React Server Components, SSG by default
- **TypeScript** — strict mode
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **Framer Motion** — entrance animations on client components
- **Lucide React** — icons

## Routes

| Route | Rendering | Description |
|---|---|---|
| `/` | Static (SSG) | Full landing page |
| `/blog` | ISR (5 min) | Blog listing from Strapi CMS |
| `/blog/[slug]` | SSG + ISR | Individual blog post |
| `/llms.txt` | Dynamic | LLM manifest — static site content + Strapi blog index |
| `/llms-full.txt` | Dynamic | Full markdown dump for LLM ingestion |
| `/*.html.md` | Edge proxy | Per-page markdown (next-llms-txt spec) |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
STRAPI_API_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_strapi_api_token_here
```

The Strapi API is expected to return articles at `/api/articles` with the following flat shape:

```json
{
  "data": [{
    "id": 1,
    "documentId": "...",
    "title": "...",
    "description": "...",
    "about": "...",
    "slug": "...",
    "test": "<p>Full HTML body</p>",
    "publishedAt": "...",
    "cover": { "url": "...", "formats": { "large": { "url": "..." } } },
    "author": { "name": "...", "email": "..." },
    "category": { "name": "...", "slug": "..." }
  }],
  "meta": { "pagination": { "start": 0, "limit": 25, "total": 43 } }
}
```

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # Production build
pnpm start      # Serve production build
```

## Deployment

Recommended: **Vercel** (native Next.js support, zero config).

1. Push this branch to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add `STRAPI_API_URL` and `STRAPI_API_TOKEN` in Vercel Environment Variables
4. Deploy

## Notes

- The `test` field in each Strapi post contains the full HTML body
- `blogPostDescription()` strips HTML and truncates to 160 chars for meta descriptions
- `blogPostFullText()` strips HTML for clean LLM ingestion
- `blogPostRawHtml()` returns raw HTML for `dangerouslySetInnerHTML` rendering
