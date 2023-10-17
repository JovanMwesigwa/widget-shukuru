import { NetworkProviderI, networkProvider } from "@/data";
import Image from "next/image";
import React from "react";

interface Props {
  setSelectedNetwork: (network: NetworkProviderI) => void;
  selectedNetwork: NetworkProviderI;
}

const SelectProvider = ({ setSelectedNetwork, selectedNetwork }: Props) => {
  return (
    <div className="w-full h-20 my-2 flex flex-row items-center gap-5">
      {networkProvider.map((network) => (
        <div
          key={network.name}
          onClick={() => setSelectedNetwork(network)}
          className={`h-full  p-3 w-20 ${
            selectedNetwork.name === network.name && "bg-neutral-100"
          } rounded-md`}
        >
          <div className="w-full h-full bg-white relative">
            <Image src={network.image} fill alt="mtn logo" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectProvider;
