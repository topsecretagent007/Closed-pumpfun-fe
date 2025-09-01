import Image from 'next/image'
import React, { useContext } from 'react'
import Countdown from '../others/Countdown'
import MaskImg from "@/../public/assets/images/tools/mask.png"
import UserContext from '@/context/UserContext'

export default function EarlyAccess() {
  const { setProceedModalState, lastToken } = useContext(UserContext)

  const proceedModal = () => {
    setProceedModalState(true)
  }

  return (
    <div className="py-20 w-full h-full">
      <div className="container">
        <div className="flex flex-col justify-center items-center gap-5 mx-auto max-w-[600px]">
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="relative flex flex-row gap-2 px-4 py-1 border-[1px] border-white/5 rounded-full">
              <p className="relative bg-clip-text bg-gradient-to-r from-[#784FD8] to-[#FFFFFF] text-[12px] text-transparent 2xs:text-base">
                Limited spots available for early access
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="flex items-center gap-2 font-semibold text-white 2xs:text-[34px] text-2xl flx-row">
                Be The <p className="text-[#784FD8]">First</p> To Get In
              </div>
              <div className="justify-center items-center w-full text-[12px] text-white/70 2xs:text-base text-center">
                Secure your spot now to get exclusive first access before the public-limited time, limited spots, and a premium advantage for early adopters
              </div>
            </div>
            <div onClick={() => proceedModal()} className="flex flex-col bg-[#784FD8] mt-4 mb-8 px-6 py-2 rounded-full text-white text-sm 2xs:text-lg cursor-pointer">
              Subscribe Now
            </div>
            <div className='flex flex-col px-2'>
              <Countdown time={lastToken[0]?.date} />
            </div>
            <div className="flex flex-col gap-3 mt-[30px] 2xs:mt-[60px] h-full">
              <div className="relative flex flex-row gap-2 bg-[#784FD8]/10 px-4 py-1 border-[1px] border-white/5 rounded-full">
                <p className="relative text-[#784FD8] text-[12px] 2xs:text-base">
                  5.2K+ Early Access People
                </p>
              </div>
            </div>

            <div className="relative flex flex-col items-center py-5 w-full max-w-[288px] h-full min-h-[100px] 2xs:min-h-[200px]">
              <div className="z-30 absolute flex flex-row items-center gap-2 bg-[#0D0D0D] p-1 border-[1px] border-white/10 rounded-lg w-full">
                <div className="flex flex-col justify-center items-center border-[1px] border-white/10 rounded-lg w-10 h-10">
                  <Image src={MaskImg} alt="MaskImg" className="w-[22px] h-[22px]" />
                </div>
                <p className="text-white text-sm">
                  8vCAUbxej...mXALg9u1bvFCAjtx7
                </p>
              </div>

              <div className="top-[60px] z-20 absolute flex flex-row items-center gap-2 bg-[#0D0D0D] p-1 border-[1px] border-white/10 rounded-lg w-[90%]">
                <div className="flex flex-col justify-center items-center border-[1px] border-white/10 rounded-lg w-9 h-9">
                  <Image src={MaskImg} alt="MaskImg" className="w-[20px] h-[20px]" />
                </div>
                <p className="text-[13px] text-white/80">
                  HAfcPACHQ...CbWYLNKyNLviJa4Rh
                </p>
              </div>

              <div className="top-24 z-10 absolute flex flex-row items-center gap-2 bg-[#0D0D0D] p-1 border-[1px] border-white/10 rounded-lg w-[80%]">
                <div className="flex flex-col justify-center items-center border-[1px] border-white/10 rounded-lg w-8 h-8">
                  <Image src={MaskImg} alt="MaskImg" className="w-[18px] h-[18px]" />
                </div>
                <p className="text-[11px] text-white/60">
                  9UQsmcW7a...6YfhcUfmRqyg6nSSS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
