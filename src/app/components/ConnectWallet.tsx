import { Icons } from "@/app/lib/ui/components";
import { comethConnectConnector } from "@cometh/connect-sdk-viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";

function ConnectWallet(): JSX.Element {
  const { isConnecting, isConnected, address } = useAccount();
  const { connect } = useConnect();

  return (
    <>
      {isConnecting ? (
        <>
          <Icons.spinner className="h-6 w-6 animate-spin" />
          {"Getting wallet..."}
        </>
      ) : (
        <>
          {/* <button
            onClick={() => {
              connect({
                connector: comethConnectConnector({
                  apiKey: process.env.NEXT_PUBLIC_COMETH_API_KEY!,
                }),
              });
            }}
          >
            {isConnected ? address : "Connect Wallet"}
          </button> */}
          {/* <ConnectButton /> */}
          <w3m-button />
        </>
      )}
    </>
  );
}

export default ConnectWallet;
