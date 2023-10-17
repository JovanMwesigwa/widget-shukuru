"use client";

import { BundleI, NetworkProviderI, bundles, networkProvider } from "@/data";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const MakePaymentPage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProviderI>();
  const [selectedBundle, setSelectedBundle] = useState<BundleI>();

  const { status, data: session } = useSession();

  const searchParams = useSearchParams();

  const network = searchParams.get("network");
  const bundle = searchParams.get("bundle");
  const phone = searchParams.get("phone");

  useEffect(() => {
    setSelectedNetwork(
      networkProvider.find((wantedNetwork) => wantedNetwork.name === network)
    );

    setSelectedBundle(
      bundles.find((wantedBundle) => wantedBundle.id == Number(bundle))
    );
  }, []);

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

      <div className="flex flex-col gap-3">
        <button className="w-full p-3 font-medium bg-yellow-400 rounded-full text-xs">
          CONFIRM
        </button>

        <Link href="/">
          <button className="w-full p-3 font-medium text-yellow-400 rounded-full text-xs">
            Cancel
          </button>
        </Link>
      </div>
    </main>
  );
};

export default MakePaymentPage;
