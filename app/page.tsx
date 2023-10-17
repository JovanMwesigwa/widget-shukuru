"use client";

import Image from "next/image";
import CategoryTabs from "./CategoryTabs";
import SelectProvider from "./SelectProvider";
import { useState } from "react";
import { BundleI, NetworkProviderI, bundles, networkProvider } from "@/data";
import BundleCard from "./BundleCard";

export default function Home() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProviderI>(
    networkProvider[0]
  );
  const [selectedBundle, setSelectedBundle] = useState<BundleI>(bundles[0]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="px-5">
        <div className="flex w-full flex-row py-4 justify-between">
          <div className="flex flex-row ">
            <Image src="/logo.png" width={20} height={10} alt="Shukuru" />
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-sm font-bold">Buy Data</h1>
          </div>

          <div className="flex"></div>
        </div>

        {/*  */}
        <div className="w-full my-5 flex flex-row justify-between items-center">
          <h3 className="text-sm">Buy using</h3>

          <div className="flex flex-row items-center">
            <h3 className="mr-3 text-sm">cUSD</h3>
            <div className="h-6 w-6 relative rounded-full bg-neutral-300">
              <Image src="/cusd.png" fill alt="cusd" />
            </div>
          </div>

          {/*  */}
        </div>

        <p className="text-xs my-4">Select provider</p>
        <SelectProvider
          setSelectedNetwork={setSelectedNetwork}
          selectedNetwork={selectedNetwork}
        />

        <p className="text-xs my-4">Select Category</p>
        <CategoryTabs />

        <p className="text-xs mt-8">Select a Bundle</p>
      </div>

      <BundleCard
        setSelectedBundle={setSelectedBundle}
        selectedNetwork={selectedNetwork}
        selectedBundle={selectedBundle}
      />
    </div>
  );
}
