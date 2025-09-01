"use client"
import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import Spinner from "../loadings/Spinner";
import Countdown from "../others/Countdown";
import ImageLoading from "../loadings/ImageLoading";
import { TOTAL_SUPPLY } from "@/config/TextData";
import VectorImg from "@/../public/assets/images/tools/Vector.png"
import VectorBgImg from "@/../public/assets/images/tools/VectorBg.png"
import User1 from "@/../public/assets/images/user/user01.png"
import User2 from "@/../public/assets/images/user/user02.png"
import User3 from "@/../public/assets/images/user/user03.png"
import CheckIcon from "@/../public/assets/images/tools/check-icon.png"

export default function SnoopDoggToken() {
  const { isLoading, setProceedModalState, lastToken, setIsLoading } = useContext(UserContext)
  const router = useRouter()

  const proceedModal = () => {
    setProceedModalState(true)
  }

  const handleToRouter = (id: string) => {
    setIsLoading(true)
    router.push(id)
  }

  return (
    <div className="relative w-full h-full object-cover overflow-hidden">
      <Image src={VectorImg} alt="VectorImg" className="top-25 -left-10 absolute flex flex-col" />
      <Image src={VectorBgImg} alt="VectorBgImg" className="top-72 -left-20 absolute flex flex-col" />

      <div className="z-20 relative container">
        <div className="flex md:flex-row flex-col justify-between items-start gap-10 px-5 py-16 md:py-[100px] w-full h-full min-h-[calc(100vh-100px)]">
          <div className="flex flex-col justify-start items-start gap-3 md:py-[72px] w-full max-w-[620px]">
            <div className="relative flex flex-row gap-2 p-1.5 border-[1px] border-white/5 rounded-full">
              <div className="relative flex flex-row items-center w-[80px]">
                <Image src={User1} alt="User1" className="z-30 absolute flex flex-col rounded-full" />
                <Image src={User2} alt="User2" className="left-6 z-20 absolute flex flex-col rounded-full" />
                <Image src={User3} alt="User3" className="left-12 z-10 absolute flex flex-col rounded-full" />
              </div>
              <p className="relative bg-clip-text bg-gradient-to-r from-[#784FD8] to-[#FFFFFF] pr-2 text-transparent text-base">
                Join 100K+ Member
              </p>
            </div>
            <div className="flex flex-col w-full font-bold text-[32px] 2xs:text-[40px] xs:text-[48px] sm:text-[56px] md:text-[40px] md2:text-[48px] md3:text-[52px] lg:text-[56px] xl:text-[64px]">
              <p className="w-full text-white leading-tight">
                <span className="bg-clip-text bg-gradient-to-r from-[#784FD8] to-[#FFFFFF] pr-2 text-transparent">Snoop Dogg is</span> Launching A Token This Week
              </p>
            </div>
            <div className="flex flex-col w-full text-[12px] text-white/70 xs:text-sm md2:text-sm sm:text-base md3:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.
            </div>
            <div className="flex flex-row justify-start items-center gap-1 2xs:gap-3 pt-4">
              <div onClick={() => proceedModal()} className="bg-[#784FD8] px-6 py-3 rounded-full font-semibold text-[12px] text-white 2xs:text-base cursor-pointer">
                Join Early Access
              </div>
              <div onClick={() => handleToRouter(`/trading/${lastToken[0]?.token}`)} className={`${lastToken.length > 0 ? "cursor-pointer bg-white text-black" : "bg-white/10 text-white/30 cursor-not-allowed"} px-6 py-3 rounded-full font-semibold text-[12px] 2xs:text-base`}>
                Buy Now
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:max-w-[300px] md2:max-w-[360px] lg:max-w-[400px] xl:max-w-[512px]">
            <div className="relative flex flex-col mx-auto rounded-xl w-full max-w-[512px] h-full min-h-40 object-cover overflow-hidden">
              {lastToken[0]?.url ?
                <Image src={lastToken[0]?.url} alt="TokenImg" width={512} height={512} className="top-0 left-0 relative flex flex-col rounded-xl w-full h-full" />
                :
                <ImageLoading />
              }
              <div className="bottom-2 xs:bottom-4 md:bottom-2 absolute flex flex-col px-1.5 w-full">
                <div className="flex flex-row justify-between items-center bg-[#0d0d0d]/80 mx-auto p-1.5 2xs:p-3 md:p-1.5 border-[2px] border-white/10 rounded-lg w-full md:max-w-[480px]">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <div className="bg-[#0d0d0d]/50 p-2.5 border-[1px] border-white/10 rounded-lg w-[52px] h-[52px]">
                      <Image src={lastToken[0]?.url} alt="TokenOwner" width={30} height={30} className="rounded-full w-[30px] h-[30px]" />
                    </div>
                    <div className="flex flex-col justify-start">
                      <p className="text-white text-sm md:text-sm 2xs:text-base 2md:2xs:text-base xs:text-lg lg:xs:text-lg">
                        {lastToken[0]?.name}
                      </p>
                      <p className="flex flex-row items-center gap-1 text-[10px] text-white/60 2xs:text-[12px] 2md:text-[12px] md:text-[10px] xs:text-sm lg:text-sm">
                        {lastToken[0]?.ticker} / SOL
                        <Image src={CheckIcon} alt="CheckIcon" className="w-4 h-4" />
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-[10px] text-white/60 2xs:text-[12px] 2md:text-[12px] md:text-[10px] xs:text-sm lg:text-sm">
                      Total Supply
                    </p>
                    <p className="font-medium text-[#784FD8] text-base md:text-base 2xs:text-lg 2md:text-lg xs:text-xl lg:text-xl">
                      {TOTAL_SUPPLY}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Countdown time={lastToken[0]?.date} />
          </div>
        </div>
      </div>
      {isLoading && <Spinner />}
    </div>
  )
}
