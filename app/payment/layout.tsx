"use client";

import { ethers } from "ethers";
import { ReactNode, useEffect, useState } from "react";

const PaymentLayout = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Ensure MiniPay provider is available
    // if (window.ethereum && window.ethereum.isMiniPay) {
    if (window.ethereum) {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);

      setIsActive(true);
    } else {
      console.error("MiniPay provider not detected");
    }
  }, []);
  return (
    <div>
      {children}
      {isActive && <p>Mini Pay detected!</p>}
    </div>
  );
};

export default PaymentLayout;
