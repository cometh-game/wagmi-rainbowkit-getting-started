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
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { getComethConnectWallet } from "@cometh/connect-sdk-viem";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY!;

const inter = Inter({
  subsets: ["latin"],
});

const comethConnect = getComethConnectWallet({ apiKey });

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [comethConnect],
    },
    ...getDefaultWallets().wallets,
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
  storage: createStorage({
    storage: cookieStorage,
  }),
});

const queryClient = new QueryClient();

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
            <RainbowKitProvider modalSize="compact">
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
