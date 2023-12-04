"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "next/font/google";
import "./lib/ui/globals.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygon } from "viem/chains";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { rainbowkitComethConnect } from "@cometh/connect-sdk-viem";

const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY!;
const baseUrl = "http://127.0.0.1:8000/connect";

const inter = Inter({
  subsets: ["latin"],
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [rainbowkitComethConnect({ apiKey, chain: polygon, baseUrl })],
  },
]);

const wagmiConfig = createConfig({
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
