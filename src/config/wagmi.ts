import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, bsc, mainnet } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Web3 App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, arbitrum, base, bsc],
  ssr: true,
});
