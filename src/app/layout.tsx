"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "next/font/google";
import "./lib/ui/globals.css";

import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
  WagmiProvider,
} from "wagmi";
import { polygon } from "viem/chains";
import {
  connectorsForWallets,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { phantomWallet } from "@rainbow-me/rainbowkit/wallets";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { comethConnectWallet } from "@cometh/connect-sdk-viem";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";

const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY!;

const inter = Inter({
  subsets: ["latin"],
});

const connectors = connectorsForWallets(
  [
    {
      groupName: "Cometh",
      wallets: [() => comethConnectWallet({ apiKey })],
    },
  ],
  {
    appName: "Cometh",
    projectId: "00ff1e306abeeb8d646b4aa297fff6d5",
  }
);

const wagmiConfig = createConfig({
  connectors,
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  ssr: true,
});

// export const wagmiConfig = getDefaultConfig({
//   wallets: [
//     {
//       groupName: "Cometh",
//       wallets: [() => comethConnectWallet({ apiKey })],
//     },
//   ],
//   appName: "Cometh",
//   projectId: "00ff1e306abeeb8d646b4aa297fff6d5",
//   chains: [polygon],
//   ssr: true,
// });

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig,
  projectId: "00ff1e306abeeb8d646b4aa297fff6d5",
  connectorImages: {
    "cometh-connect":
      "https://pbs.twimg.com/profile_images/1679433363818442753/E2kNVLBe_400x400.jpg",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
