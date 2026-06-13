# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm lint:fix     # Auto-fix lint issues
pnpm format:fix   # Auto-fix formatting
pnpm type-check   # TypeScript type check (no emit)
```

Pre-commit hooks run `lint:fix` and `format:fix` automatically on staged files via husky + lint-staged.

## Environment Setup

Copy `.env.example` to `.env.local`. Key variables:

- `NEXT_PUBLIC_API_URL` — backend API base URL
- `NEXT_PUBLIC_APP_URL` — this app's URL (used for internal API proxy)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — get from https://cloud.walletconnect.com
- `API_KEY` — server-side key injected into all external API requests

## Architecture

### Routing

Next.js App Router with `next-intl`. All pages live under `src/app/[locale]/`. The locale prefix is set to `'never'` — URLs do not include `/en/`. Two route groups:

- `(app)` — main dApp layout (navbar + footer via `MainLayout`)
- `(landing)` — marketing layout (`LandingPageLayout`)

### Wallet / Web3

RainbowKit + wagmi v2 + viem. Configured chains: Ethereum, Arbitrum, Base, BSC.

- Config: [src/config/wagmi.ts](src/config/wagmi.ts)
- Provider: [src/providers/WalletContextProvider.tsx](src/providers/WalletContextProvider.tsx) — wraps with `WagmiProvider` + dedicated `QueryClientProvider` + `RainbowKitProvider`
- Use `<ConnectButton />` from `@rainbow-me/rainbowkit` for wallet UI
- Add more chains in `wagmi.ts` — full list at `wagmi/chains`

### API Layer

Two Axios instances in [src/api/axios.ts](src/api/axios.ts):

- `request` — calls backend directly (server-side only)
- `requestInternal` — calls Next.js `/api/*` route handlers (client-side)

`getApiRequestClient()` returns the right one based on `typeof window`. Client components always go through the BFF proxy in `src/app/api/`.

Each API domain in `src/api/<domain>/` follows this structure:

- `requests.ts` — axios calls (or mock with `new Promise(setTimeout)` during development)
- `keys.ts` — URL + React Query key constants
- `queries.ts` — `useQuery` hooks
- `mutations.ts` — `useMutation` hooks
- `types.ts` — TypeScript types
- `index.ts` — re-exports all

**Template:** copy `src/api/_example/` for a new domain. Mock requests use `new Promise(setTimeout)` — replace with real `getApiRequestClient()` calls when backend is ready.

**Route handler template:** `src/app/api/_example/route.ts` — has GET, POST, PUT, PATCH with mock data.

### State Management

Zustand stores in `src/stores/`. Use `createSelectorFunctions` for individual selectors:

```ts
useSessionStore.use.accessToken(); // ✓
useSessionStore.use.user(); // ✓
```

`sessionStore` persists to cookie via `createCookieStorage`. `modalStore` controls modal UI state.

### Provider Tree

```
WalletContextProvider  (WagmiProvider + QueryClient for wagmi + RainbowKitProvider)
  NextIntlClientProvider
    ProgressProvider
      QueryClientProvider  (app's TanStack Query — for data fetching)
        ThemeProvider
          {children}
          Toaster
```

## Code Style

Biome enforces all formatting and linting. Key rules:

- Single quotes, 2-space indent, 120-char line width
- `import type` required for type-only imports in `.ts`/`.tsx`
- Sorted Tailwind classes (Biome `useSortedClasses` rule — auto-fixed on save)
- No nested ternaries
- Conventional commits: `feat | fix | docs | chore | style | refactor | ci | test | revert | perf | release`

SVGs: import as React component directly, or as URL with `import logo from './logo.svg?url'`.

## AI Harness Workflow Integration

This project will run base on Harness Engineering, so before starting any task, please read the AGENTS.md file first to understand the rules and workflow.

Knowledge memory:

- Use memory.searchKnowledge MCP tool before starting tasks to find prior conventions and decisions. Store decisions with memory.storeKnowledge. If MCP is unavailable, use the memory skill (npx ai-devkit memory search/store).
