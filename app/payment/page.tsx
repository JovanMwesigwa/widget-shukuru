"use client";

import { BundleI, NetworkProviderI, bundles, networkProvider } from "@/data";
import { Provider, ethers } from "ethers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Spinner from "../components/Spinner";
import { useConnect } from "wagmi";
import { CeloContract, newKitFromWeb3 } from "@celo/contractkit";
import { InjectedConnector } from "wagmi/connectors/injected";
import Web3 from "web3";
import TooltipComponent from "./TooltipComponent";
import { APIURL } from "@/data/apiUrl";

const MakePaymentPage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProviderI>();
  const [selectedBundle, setSelectedBundle] = useState<BundleI>();
  const [provider, setProvider] = useState<Provider>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const { status, data: session } = useSession();

  const searchParams = useSearchParams();

  const network = searchParams.get("network");
  const bundle = searchParams.get("bundle");
  const phone = searchParams.get("phone");

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    setSelectedNetwork(
      networkProvider.find((wantedNetwork) => wantedNetwork.name === network)
    );

    setSelectedBundle(
      bundles.find((wantedBundle) => wantedBundle.id == Number(bundle))
    );

    connect();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const web3 = new Web3(window.ethereum);
      const kit = newKitFromWeb3(web3 as any);

      const parsedAmount = await ethers.parseEther(
        selectedBundle!.inUsd.toString()
      );

      const amount_ = parsedAmount.toString();

      let accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];

      await kit.setFeeCurrency(CeloContract.StableToken);

      let cUSDcontract = await kit.contracts.getStableToken();
      let cUSDtx = await cUSDcontract
        .transfer("0xD2c2591162162Fc57a40bc8a3C9cff0E6dFc9824", amount_)
        .send({ feeCurrency: cUSDcontract.address });

      let resultTx = await cUSDtx.waitReceipt();

      if (resultTx.transactionHash) {
        const res = await fetch(`${APIURL}/one-pushId`, {
          method: "POST",
          body: JSON.stringify({
            user: session?.user?.name,
            msg: `Shuku 🚀, your ${selectedBundle?.amount} ${selectedBundle?.size} data order was delivered to ${phone}. Payment processed in cUSD. Enjoy! `,
            name: "INFO",
          }),
          headers: { "Content-Type": "application/json" },
        });

        await res.json();

        setSuccess(false);

        // return;
      } else {
        // Return error
        setError("Transaction failed!");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (error) {
      setLoading(false);
      setError("Transaction failed!");
    }
  };

  return (
    <main className="h-screen w-full  flex flex-col p-5">
      <div className=" flex flex-1 flex-col">
        <div className="flex w-full flex-row  justify-between">
          <div className="flex flex-row ">
            <Image src="/logo.png" width={20} height={10} alt="Shukuru" />
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-sm font-bold">Buy Data</h1>
          </div>

          <div className="flex"></div>
        </div>

        {/*  */}
        <div className="w-full h-28 items-center flex justify-center gap-3">
          <div className="h-16 w-16 relative bg-neutral-300 rounded-full">
            <Image src="/cusd.png" fill alt="cusd logo" />
          </div>
          <MdOutlineKeyboardDoubleArrowRight size={30} />
          <div className="h-16 w-16 bg-neutral-300 relative rounded-full overflow-hidden">
            {selectedNetwork && (
              <Image src={selectedNetwork?.image} fill alt="cusd logo" />
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className="w-full border rounded-md my-5 flex flex-col p-4 justify-evenly">
          <div className="flex flex-row">
            <p className="text-xs font-medium mr-1">Provider:</p>
            <p className="text-xs ">{selectedNetwork?.name}</p>
          </div>

          <div className="flex my-1 flex-row">
            <p className="text-xs font-medium mr-1">Phone:</p>
            <p className="text-xs ">{phone}</p>
          </div>

          <div className="flex my-1 flex-row">
            <p className="text-xs font-medium mr-1">Bundle:</p>
            <p className="text-xs ">
              {selectedBundle?.amount} {selectedBundle?.size}
            </p>
          </div>

          <div className="flex my-1 flex-row">
            <p className="text-xs font-medium mr-1">Amount:</p>
            <p className="text-xs ">UGX {selectedBundle?.price}</p>
          </div>

          <div className="divide-x h-[1px] my-2 bg-neutral-300" />

          <div className="flex flex-row py-2">
            <p className="text-xs mr-1 font-bold">Total:</p>
            <p className="text-xs font-bold">UGX {selectedBundle?.price}</p>
          </div>
        </div>
      </div>

      {error && <TooltipComponent tipType="red" message={error} />}

      {success && (
        <TooltipComponent
          tipType="green"
          message="🎉 Your purchase was successfull"
        />
      )}

      <div className="flex flex-col gap-3">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`w-full p-3 font-medium ${
            loading ? "bg-neutral-100 text-white" : "bg-yellow-400"
          }  rounded-full text-xs flex items-center justify-center`}
        >
          {loading ? <Spinner /> : "CONFIRM"}
        </button>

        {!loading && (
          <Link href="/">
            <button className="w-full p-3 font-medium text-yellow-400 rounded-full text-xs">
              Cancel
            </button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default MakePaymentPage;
