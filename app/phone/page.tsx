"use client";

import { NetworkProviderI, networkProvider } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const EnterUserPhonePage = () => {
  const [phone, setPhone] = useState<string>("");

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProviderI>();

  const searchParams = useSearchParams();

  const router = useRouter();

  const network = searchParams.get("network");
  const bundle = searchParams.get("bundle");

  useEffect(() => {
    setSelectedNetwork(
      networkProvider.find((wantedNetwork) => wantedNetwork.name === network)
    );
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userPhone = "256" + phone;
    router.push(
      `/payment?network=${network}&bundle=${bundle}&phone=${userPhone}`
    );
  };

  return (
    <div className="h-screen w-full  flex flex-col p-5">
      <form onSubmit={(e) => handleSubmit(e)} className=" flex flex-1 flex-col">
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
              <Image src={selectedNetwork.image} fill alt="cusd logo" />
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className="w-full h-28 border rounded-md my-5 flex flex-col p-4">
          <p className="text-xs ">Recipient number</p>

          <div className="w-full flex flex-row items-center flex-1 gap-3">
            <h4 className="text-sm">256</h4>

            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border w-full p-1 rounded-md outline-none bg-neutral-100"
            />
          </div>
        </div>

        <button
          // onClick={handleSubmit}
          disabled={!phone || phone.length <= 4}
          type="submit"
          className={`w-full my-4 p-3 font-medium ${
            !phone || phone.length <= 4
              ? "bg-neutral-200 text-white"
              : "bg-yellow-400"
          }  rounded-full text-xs`}
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default EnterUserPhonePage;
