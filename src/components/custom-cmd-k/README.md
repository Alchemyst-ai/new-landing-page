# Custom command menu

`CustomCommandK` is mounted once in the root layout. It composes the shadcn CLI-installed Command and Popover components into a bottom-center trigger and upward-opening panel. Open with Cmd+K, Ctrl+K, or the button; navigate with arrows/Enter and dismiss with Escape or an outside click.

The implementation is adapted from `alchemyst-labs-website`, with all copied files owned by this repository. It never calls the Labs application.

- `index.tsx`: trigger, positioning, navigation, debouncing, lazy answer UI.
- `SearchQueryHandling.tsx`: Markdown answers, loading, errors, retry, copy and mode switching.
- `src/hooks/useHybridAnswer.ts`: cancellable same-origin requests and optional on-device generation.
- `src/lib/webllm/engine.ts`: lazily loads the same WebLLM model as Labs.
- `src/app/api/answer/route.ts`: online generation using OpenRouter and local tool helpers.
- `src/app/api/tools/route.ts`: tools used by on-device generation.
- `src/lib/tools/`: Alchemyst context retrieval and the same web-search provider used by Labs.

Configure these environment variables in this project's `.env.local` and deployment environment:

```dotenv
OPENROUTER_API_KEY=
ALCHEMYSTAI_API_KEY=
# Optional overrides:
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openrouter/free
```

The Alchemyst key must be scoped to public website content in the `alchemyst-ai` group. Do not give this public search endpoint access to confidential business documents. API keys remain on the server. No credentials are copied from Labs.

Online answers require both keys; missing configuration returns HTTP 503. On-device generation requires WebGPU and an explicit mode switch to download the model. It is not fully offline: tools still call this site's API routes and their configured providers. Navigation works without AI configuration.

The original Labs directory is read-only reference material. Changes here do not affect it. Query logs from the original implementation were removed, and cancellation, input validation, request timeouts and actual error statuses were added.
