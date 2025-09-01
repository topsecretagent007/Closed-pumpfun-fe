"use client"
import { FC } from "react";
import { coinInfo } from "@/utils/types";
import Image from "next/image";
import LogoImg from "@/../public/assets/images/logo.png"

interface TokenDataProps {
  coinData: coinInfo;
}

const TokenData: FC<TokenDataProps> = ({ coinData }) => {

  return (
    <div className="flex xs:flex-row flex-col gap-3 px-2">
      <Image
        src={coinData?.url ? coinData.url : LogoImg}
        width={96}
        height={96}
        className="mx-auto xs:mx-0 border-[#000] border-[1px] rounded-md"
        alt="Token IMG"
      />
      <div className="flex flex-col gap-1 py-1 text-black">
        <p className="font-semibold">Token Name: <strong className="text-[#1f47ca]">{coinData?.name}</strong> - <strong className="text-[#1f47ca]">[{coinData?.ticker}]</strong></p>
        <p className="text-[14px]">{coinData?.description}</p>
      </div>
    </div>
  );
};

export default TokenData;
