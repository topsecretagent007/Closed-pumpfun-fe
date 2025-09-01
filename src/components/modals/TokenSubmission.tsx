import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import EarlyBg from "@/../public/assets/images/tools/early-bg.png"
import { FaCheck, FaXTwitter } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserContext from '@/context/UserContext';
import CheckIconBG from "@/../public/assets/images/tools/check-icon-bg.png"
import CheckIconLight from "@/../public/assets/images/tools/check-light.png"
import { RiInstagramFill } from "react-icons/ri";

export default function TokenSubmission() {
  const { setSubmitModalState } = useContext(UserContext)
  const menuDropdown = useRef<HTMLDivElement | null>(null);

  const proceedModal = (e: boolean) => {
    setSubmitModalState(e)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setSubmitModalState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  return (
    <div className='z-40 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full'>
      <div ref={menuDropdown} className="relative flex flex-col justify-center items-center bg-[#131313] px-3 py-[50px] border-[1px] border-white/10 rounded-md w-[90%] max-w-[768px]">
        <Image src={EarlyBg} alt='EarlyBg' className='left-0 z-10 absolute flex flex-col w-full' />
        <div onClick={() => proceedModal(false)} className='top-4 right-4 absolute flex flex-col rounded-full w-[20px] 2xs:w-[25px] md:w-[30px] h-[20px] 2xs:h-[25px] md:h-[30px] cursor-pointer'>
          <IoIosCloseCircleOutline className='text-white/50 text-2xl 2xs:text-3xl md:text-4xl' />
        </div>
        <div className='z-20 flex flex-col gap-3 w-full max-w-[668px]'>
          <div className='relative flex flex-col justify-center items-center mx-auto w-6 2xs:w-10 md:w-16 md2:w-20 h-6 2xs:h-10 md:h-16 md2:h-20'>
            <Image src={CheckIconBG} alt='CheckIconBG' className='absolute w-6 2xs:w-10 md:w-16 md2:w-20 h-6 2xs:h-10 md:h-16 md2:h-20' />
            <Image src={CheckIconLight} alt='CheckIconLight' className='absolute w-3 2xs:w-4 md:w-5 md2:w-7 h-2 2xs:h-3 md:h-4 md2:h-5' />
          </div>
          <h2 className="text-white md2:text-[34px] text-base 2xs:text-xl md:text-2xl text-center">Thank You for Your <strong className='text-[#784FD8]'>Submission!</strong></h2>
          <p className='mx-auto max-w-[578px] text-[10px] text-white/70 2xs:text-[12px] md:text-sm md2:text-base text-center'>
            Your token creation request has been received! To speed up verification and gain visibility, share your application on social media.
          </p>
          <div className='flex md:flex-row flex-col justify-between items-center'>
            <div className='flex flex-col justify-start items-start gap-3 2xs:gap-4 md:gap-5 md2:gap-6 bg-black/25 mx-auto my-3 2xs:my-4 md:my-6 md2:my-8 p-2 2xs:p-3 md2:p-[16px] border-[2px] border-white/10 rounded-lg w-full max-w-[324px] h-[140px] 2xs:h-[160px] md:h-[180px] md2:h-[200px]'>
              <div className='flex flex-row items-end mx-auto font-semibold text-white'>
                <p className='text-[12px] 2xs:text-[13px] md::text-sm'>How to Post</p>
              </div>
              <div className='flex flex-col gap-2 2xs:gap-3 md:gap-4'>
                <div className='flex flex-row justify-start items-center gap-3'>
                  <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                    <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                  </div>
                  <p className='max-w-[240px] text-[8px] text-white/80 2xs:text-[10px] md:text-[12px] dm2:text-sm'>
                    Include Your Request ID: (CLxxxxxxxxxx/CUxxxxxxxxxx)
                  </p>
                </div>
                <div className='flex flex-row justify-start items-center gap-3'>
                  <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                    <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                  </div>
                  <p className='max-w-[240px] text-[8px] text-white/80 2xs:text-[10px] md:text-[12px] dm2:text-sm'>
                    Tag @ClosedDigital & Use Hashtags
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-start items-start gap-3 2xs:gap-4 md:gap-5 md2:gap-6 bg-black/25 mx-auto my-3 2xs:my-4 md:my-6 md2:my-8 p-2 2xs:p-3 md2:p-[16px] border-[2px] border-white/10 rounded-lg w-full max-w-[324px] h-[140px] 2xs:h-[160px] md:h-[180px] md2:h-[200px]'>
              <div className='flex flex-row items-end mx-auto font-semibold text-white'>
                <p className='text-sm'>Example Post</p>
              </div>
              <div className='flex flex-col gap-2 2xs:gap-3 md:gap-4'>
                <div className='flex flex-row justify-start items-center gap-3'>
                  <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                    <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                  </div>
                  <p className='max-w-[240px] text-[8px] text-white/80 2xs:text-[10px] md:text-[12px] dm2:text-sm'>
                    Just applied to launch my token <code className='text-[#784FD8]'>@Snoop Dogg</code> on Closed Digital!
                  </p>
                </div>
                <div className='flex flex-row justify-start items-center gap-3'>
                  <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                    <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                  </div>
                  <p className='max-w-[240px] text-[8px] text-white/80 2xs:text-[10px] md:text-[12px] dm2:text-sm'>
                    Request ID: CLxxxxxxxxxx
                  </p>
                </div>
                <div className='flex flex-row justify-start items-center gap-3'>
                  <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                    <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                  </div>
                  <p className='max-w-[240px] text-[8px] text-white/80 2xs:text-[10px] md:text-[12px] dm2:text-sm'>
                    Can't wait to trade on launch day!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-center items-center gap-4'>
            <div className="flex flex-row items-center gap-2 bg-[#784FD8] px-3 2xs:px-4 md:px-5 md2:px-6 py-1 2xs:py-1.5 md:py-2 md2:py-3 border-[1px] border-black rounded-full text-white cursor-pointer">
              <FaXTwitter onClick={() => proceedModal(false)} className='md2:text-[28px] text-sm 2xs:text-base md:text-lg' />
              <div className="text-[12px] 2xs:text-sm md:text-base md2:text-lg">Twitter</div>
            </div>
            <div className="flex flex-row items-center gap-2 bg-[#784FD8] px-3 2xs:px-4 md:px-5 md2:px-6 py-1 2xs:py-1.5 md:py-2 md2:py-3 border-[1px] border-black rounded-full text-white cursor-pointer">
              <RiInstagramFill onClick={() => proceedModal(false)} className='md2:text-[28px] text-sm 2xs:text-base md:text-lg' />
              <div className="text-[12px] 2xs:text-sm md:text-base md2:text-lg">Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
