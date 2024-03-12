"use client";

import { Icons } from "@/app/lib/ui/components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnectors } from "wagmi";

function ConnectWallet(): JSX.Element {
  const { isConnecting } = useAccount();

  return (
    <>
      {isConnecting ? (
        <>
          <Icons.spinner className="h-6 w-6 animate-spin" />
          {"Getting wallet..."}
        </>
      ) : (
        <ConnectButton />
      )}
    </>
  );
}

export default ConnectWallet;
