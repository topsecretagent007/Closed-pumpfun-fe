import Image from 'next/image'
import React, { useContext } from 'react'
import { FaCheck } from "react-icons/fa";
import CapaIcon from "@/../public/assets/images/tools/capa.png"
import CapaBg1 from "@/../public/assets/images/tools/capa-bg-1.png"
import CapaBg2 from "@/../public/assets/images/tools/capa-bg-2.png"
import UserContext from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { warningAlert } from '../others/ToastGroup';
import { useWallet } from "@solana/wallet-adapter-react";
import { launchAuthority } from '@/utils/util';

export default function CreateTokenBtn() {
  const { publicKey } = useWallet();
  const { setIsLoading, } = useContext(UserContext);
  const router = useRouter();

  const goToPage = async (e: string) => {
    setIsLoading(true);
    if (e === "/create-coin" && !publicKey) {
      setIsLoading(false);
      warningAlert("Connect your wallet!");
      return;
    } else {
      const LaunchAuthority = await launchAuthority(publicKey.toBase58());
      if (LaunchAuthority === true) {
        router.push(e);
      } else {
        setIsLoading(false);
        warningAlert("You need to get launch authority before token launch.")
        return;
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center py-20 2xs:py-40 w-full h-full">
      <Image src={CapaBg1} alt="CapaBg1" className="bottom-[12rem] 2xs:bottom-[16.8rem] absolute flex flex-col w-[400px] h-[250px]" />
      <Image src={CapaBg2} alt="CapaBg2" className="-bottom-4 2xs:-bottom-14 absolute flex flex-col w-[550px]" />

      <div className="z-30 relative container">
        <div className="flex flex-col justify-center items-center gap-7 2xs:gap-14 mx-auto px-4 w-full max-w-[986px]">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white/10 border-[2px] border-white/20 rounded-lg w-[52px] 2xs:w-[72px] h-[52px] 2xs:h-[72px]">
              <Image src={CapaIcon} alt="CapaIcon" className="flex flex-col w-7 2xs:w-11 h-7 2xs:h-11" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full max-w-[780px]">
            <div className="flex flex-row justify-center items-center gap-2 2xs:text-[34px] text-2xl">
              <p className="text-[#784FD8]">Launch</p>
              <p className="text-white">Your Own Token</p>
            </div>
            <p className="justify-center items-center text-[12px] text-white/70 2xs:text-base text-center">
              Create, authenticate, and launch your token effortlessly with built-in market-ready features.
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center gap-3 w-full">
            <div className="flex flex-row items-center gap-2 bg-white/5 p-1 border-[1px] border-white/10 rounded-full">
              <div className="flex flex-col justify-center items-center bg-[#784FD8] rounded-full w-6 h-6 text-white">
                <FaCheck className="text-sm" />
              </div>
              <p className="pr-2 text-[12px] text-white md2:text-sm">
                Quick & Easy Token Creation
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 bg-white/5 p-1 border-[1px] border-white/10 rounded-full">
              <div className="flex flex-col justify-center items-center bg-[#784FD8] rounded-full w-6 h-6 text-white">
                <FaCheck className="text-sm" />
              </div>
              <p className="pr-2 text-[12px] text-white md2:text-sm">
                Built-in Smart Contract & Authentication
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 bg-white/5 p-1 border-[1px] border-white/10 rounded-full">
              <div className="flex flex-col justify-center items-center bg-[#784FD8] rounded-full w-6 h-6 text-white">
                <FaCheck className="text-sm" />
              </div>
              <p className="pr-2 text-[12px] text-white md2:text-sm">
                Launch with Market-Ready Features
              </p>
            </div>
          </div>
          <div onClick={() => goToPage("/create-coin")} className="z-40 flex flex-col bg-[#784FD8] px-6 py-3 rounded-full text-white cursor-pointer founded-full">
            Create Token
          </div>
        </div>
      </div>
    </div>
  )
}
