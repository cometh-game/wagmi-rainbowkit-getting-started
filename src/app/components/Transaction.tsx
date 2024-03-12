"use client";

import { Icons } from "../lib/ui/components";
import React, { useEffect } from "react";
import Alert from "../lib/ui/components/Alert";
import { PlusIcon } from "@radix-ui/react-icons";
import countContractAbi from "../../app/contract/counterABI.json";
import {
  useAccount,
  useClient,
  useReadContract,
  useWriteContract,
} from "wagmi";

const COUNTER_CONTRACT_ADDRESS = "0x84ADD3fa2c2463C8cF2C95aD70e4b5F602332160";

export function Transaction() {
  const client = useClient();
  const { address, connector } = useAccount();
  const { data: balance } = useReadContract({
    address: COUNTER_CONTRACT_ADDRESS,
    abi: countContractAbi,
    functionName: "counters",
    args: [address],
  });
  const {
    data: txResult,
    isSuccess,
    isError,
    isPending,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    console.log("client", client);
  }, [client]);

  function TransactionButton() {
    return (
      <>
        <button
          className="mt-1 flex h-11 py-2 px-4 gap-2 flex-none items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
          onClick={async () => {
            writeContract({
              address: COUNTER_CONTRACT_ADDRESS,
              abi: countContractAbi,
              functionName: "count",
              connector: connector,
            });
          }}
        >
          {isPending ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <PlusIcon width={16} height={16} />
            </>
          )}{" "}
          Increment counter
        </button>
      </>
    );
  }

  return (
    <main>
      <div className="p-4">
        <div className="relative flex items-center gap-x-6 rounded-lg p-4">
          <TransactionButton />
          <p className=" text-gray-600">{Number(balance)}</p>
        </div>
      </div>
      {isPending && !txResult && (
        <Alert
          state="information"
          content="Transaction in progress.. (est. time 10 sec)"
        />
      )}
      {isSuccess && (
        <Alert
          state="success"
          content="Transaction confirmed !"
          link={{
            content: "Go see your transaction",
            url: `https://mumbai.polygonscan.com/tx/${txResult}`,
          }}
        />
      )}
      {isError && <Alert state="error" content="Transaction Failed !" />}
    </main>
  );
}
