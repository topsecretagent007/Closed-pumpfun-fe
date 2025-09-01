import React from 'react'
import TokenomicsChat from '../others/TokenomicsChat'
import Image from 'next/image'
import TokenOwner from "@/../public/assets/images/user/tokenadmin.png"

export default function Tokenomics() {
  return (
    <div className="flex flex-col justify-between items-center bg-black pt-20 pb-20 md2:pb-40 w-full">
      <div className="container">
        <div className="flex md2:flex-row flex-col justify-center items-center gap-10 md2:gap-12 lg2:gap-20 px-4">
          <div className="relative flex flex-col justify-center items-center bg-white/5 p-10 border-[1px] border-white/10 rounded-xl w-full max-w-[600px] h-[calc(100vw-32px)] md2:h-[calc(100vw-50vw)] max-h-[600px]">
            <div className="z-10 absolute flex flex-col justify-center items-center p-6 w-full">
              <TokenomicsChat />
            </div>
            <div className='z-30 absolute flex flex-col justify-center items-center p-[18%] w-full h-full'>
              <div className="z-20 flex flex-col p-[10%] border-[1px] border-white/30 border-dashed rounded-full w-full h-full">
                <div className="flex flex-col bg-white/10 p-[15%] border-[#0A060E] border-[2px] rounded-full w-full h-full">
                  <div className="flex flex-col justify-center items-center bg-white/10 rounded-full w-full h-full">
                    <div className="flex flex-col justify-center items-center gap-2 2xs:gap-3">
                      <Image src={TokenOwner} alt="TokenOwner" className="flex flex-row rounded-full w-[50%] h-[50%]" />
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-[8px] text-white/40 2xs:text-[13px]">TOTAL SUPPLY</p>
                        <p className="text-[12px] text-white 2xs:text-[20px]">500 M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-8 px-4 md2:px-0 w-full max-w-[620px]">
            <div className="flex flex-col">
              <p className="text-[#784FD8] text-[26px] 2xs:text-[34px]">
                Tokenomics
              </p>
              <p className="text-white text-sm 2xs:text-base">
                Unlock the Power Behind the Token
              </p>
            </div>
            <div className="flex flex-row justify-start items-center bg-gradient-to-b from-[#784FD8]/20 px-4 2xs:px-6 py-3 2xs:py-4 border-l-[#58D764] border-l-[3px] rounded-xl w-full">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[18px] text-white 2xs:text-[22px]">
                  Reserve
                </p>
                <p className="text-[#58D764] text-sm 2xs:text-lg">
                  (15%)
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center bg-gradient-to-b from-[#784FD8]/20 px-4 2xs:px-6 py-3 2xs:py-4 border-l-[#FF903E] border-l-[3px] rounded-xl w-full">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[18px] text-white 2xs:text-[22px]">
                  Liquidity
                </p>
                <p className="text-[#FF903E] text-sm 2xs:text-lg">
                  (20%)
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center bg-gradient-to-b from-[#784FD8]/20 px-4 2xs:px-6 py-3 2xs:py-4 border-l-[#FACC15] border-l-[3px] rounded-xl w-full">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[18px] text-white 2xs:text-[22px]">
                  Team
                </p>
                <p className="text-[#FACC15] text-sm 2xs:text-lg">
                  (25%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
