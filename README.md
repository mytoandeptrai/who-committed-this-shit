# Web3 dApp Boilerplate

A Next.js 15 boilerplate for building EVM-based decentralized applications, with multi-chain wallet support via RainbowKit + wagmi.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Wallet**: [RainbowKit](https://rainbowkit.com/) + [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Prerequisites

- **Node.js** 18+
- **pnpm** 10.17.1+

## Getting Started

### 1. Clone & install

```bash
git clone <repository-url>
cd <project-dir>
pnpm install
```

> **Windows only:** run these first to avoid line-ending issues:
> ```bash
> git config --global core.eol lf
> git config --global core.autocrlf input
> ```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` — at minimum set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (get one free at [cloud.walletconnect.com](https://cloud.walletconnect.com)).

### 3. Run dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | | App name shown in wallet modal |
| `NEXT_PUBLIC_APP_URL` | ✓ | Public URL of this app |
| `NEXT_PUBLIC_API_URL` | ✓ | Backend API base URL |
| `NEXT_PUBLIC_API_VERSION` | | API version prefix (default `/v1`) |
| `NEXT_PUBLIC_API_PREFIX` | | API path prefix (default `/backend`) |
| `NEXT_PUBLIC_INTERNAL_API_PREFIX` | | Internal BFF prefix (default `/api`) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ✓ | WalletConnect project ID |
| `NEXT_PUBLIC_EXPLORER_URL` | | Block explorer base URL |
| `NEXT_PUBLIC_X_URL` | | Twitter/X profile URL |
| `NEXT_PUBLIC_TELEGRAM_URL` | | Telegram URL |
| `API_KEY` | | Server-side API key (not exposed to client) |

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format:fix` | Auto-fix formatting |
| `pnpm type-check` | TypeScript type check |

## Project Structure

```
src/
├── api/
│   ├── _example/        # Template API layer (mock with setTimeout)
│   ├── axios.ts         # Axios instances (direct + BFF proxy)
│   └── interceptors.ts  # Request/response interceptors
├── app/
│   ├── api/
│   │   └── _example/    # Template route handler (GET POST PUT PATCH)
│   └── [locale]/
│       ├── (app)/       # Main dApp layout (header + footer)
│       └── (landing)/   # Marketing layout
├── components/
│   ├── common/          # Shared UI components
│   ├── form-field/      # Form field wrappers
│   ├── layouts/         # MainLayout, LandingPageLayout
│   ├── providers/       # ThemeProvider
│   └── ui/              # shadcn/ui primitives
├── config/
│   ├── wagmi.ts         # wagmi + RainbowKit config (chains)
│   └── fonts.ts         # Font definitions
├── hooks/               # Custom React hooks
├── i18n/                # next-intl routing & messages
├── lib/                 # Utilities (cn, cookie-storage...)
├── providers/
│   └── WalletContextProvider.tsx  # wagmi + RainbowKit + QueryClient
├── stores/              # Zustand stores (session, modal)
├── styles/              # Global CSS
├── types/               # Shared TypeScript types
└── utils/               # Constants, routes, helpers
```

## Wallet & Chains

Configured chains (edit `src/config/wagmi.ts` to add/remove):

- Ethereum Mainnet
- Arbitrum
- Base
- BSC

Supported wallets via RainbowKit: MetaMask, WalletConnect, Coinbase Wallet, Rainbow, and more.

## Adding a New API Domain

Copy `src/api/_example/` → `src/api/<domain>/`. The template includes:

- `const.ts` — enums
- `types.ts` — request/response types
- `keys.ts` — URL + query key constants
- `requests.ts` — mock requests (replace `setTimeout` with `getApiRequestClient()` calls when backend is ready)
- `queries.ts` — `useQuery` hooks
- `mutations.ts` — `useMutation` hooks
- `index.ts` — re-exports

For the corresponding BFF route handler, copy `src/app/api/_example/route.ts` → `src/app/api/<domain>/route.ts`.

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject
```

Types: `feat` `fix` `docs` `chore` `style` `refactor` `ci` `test` `revert` `perf` `release`
