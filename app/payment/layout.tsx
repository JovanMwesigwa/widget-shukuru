"use client";

import { ReactNode } from "react";
import { celoAlfajores } from "viem/chains";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celoAlfajores],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const PaymentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <div>{children}</div>
    </WagmiConfig>
  );
};

export default PaymentLayout;
