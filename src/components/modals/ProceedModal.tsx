import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import EarlyBg from "@/../public/assets/images/tools/early-bg.png"
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserContext from '@/context/UserContext';
import { errorAlert, successAlert } from '../others/ToastGroup';
import { depositSol, earlyTime } from '@/utils/util';
import { useWallet } from '@solana/wallet-adapter-react';

export default function ProceedModal() {
  const { setProceedModalState, setIsLoading } = useContext(UserContext)
  const menuDropdown = useRef<HTMLDivElement | null>(null);
  const [checkState, setCheckState] = useState<boolean>(false)
  const wallet = useWallet();

  const proceedModal = (e: boolean) => {
    setProceedModalState(e)
  }

  const saveEarlyAccessProceed = async () => {
    if (!checkState) {
      return errorAlert("Please agree to the terms and conditions")
    }

    if (!wallet.publicKey) {
      return errorAlert("Please connect wallet");
    }

    setIsLoading(true)
    try {
      const getEarlyTime = await earlyTime(wallet);
      console.log("getEarlyTime", getEarlyTime)
      if (!getEarlyTime.data.success) {
        console.log("getEarlyTime data false ==>", getEarlyTime.data)
        errorAlert(`${getEarlyTime.data.message}`);
        return;
      }

      const result = await depositSol(wallet);
      if (result && result.success === true) {
        successAlert("Early access granted successfully!");
        proceedModal(false)
        setProceedModalState(false);
      } else {
        errorAlert(`${result?.response.data.message}`);
        proceedModal(false)
      }
    } catch (error: any) {
      errorAlert(`${error?.response.data.message}`);
    } finally {
      setIsLoading(false)
    }
  };


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setProceedModalState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);


  return (
    <div className='z-40 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full'>
      <div ref={menuDropdown} className="relative flex flex-col justify-center items-center bg-[#131313] py-[50px] border-[1px] border-white/10 rounded-md w-[90%] max-w-[600px] sm:max-w-xl">
        <Image src={EarlyBg} alt='EarlyBg' className='left-0 z-10 absolute flex flex-col w-full' />
        <div onClick={() => proceedModal(false)} className='top-4 right-4 absolute flex flex-col rounded-full w-[20px] 2xs:w-[25px] md:w-[30px] h-[20px] 2xs:h-[25px] md:h-[30px] cursor-pointer'>
          <IoIosCloseCircleOutline className='text-white/50 text-2xl 2xs:text-3xl md:text-4xl' />
        </div>
        <div className='z-20 relative flex flex-col gap-2 md:gap-3 w-full max-w-[500px]'>
          <h2 className="font-bold text-white text-[22px] xs:text-[26px] sm:text-[30px] text-center">Get Early Access For <strong className='text-[#784FD8]'>0.01 SOL</strong></h2>
          <p className='w-full text-[9px] text-white/70 2xs:text-[11px] md:text-base text-center'>
            Unlock 15-minute early trading access before the public launch.
            <br />
            Secure your advantage now — limited spots available!
          </p>
          <div className="flex justify-around p-2 2xs:p-3 w-full">
            <div className="flex flex-row items-center gap-2 bg-white/20 px-3 2xs:px-6 py-1.5 2xs:py-3 border-[1px] border-white/10 rounded-lg text-[12px] text-white 2xs:text-base cursor-pointer">
              How It Works
              <FaRegQuestionCircle className='text-lg 2xs:text-xl md:text-2xl' />
            </div>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 2xs:gap-4 md:gap-6 bg-black/25 mx-auto my-3 2xs:my-6 md:my-8 px-[24px] 2xs:px-[38px] md:px-[58px] py-[12px] 2xs:py-[18px] md:py-[26px] border-[2px] border-white/10 rounded-lg w-full max-w-[280px] 2xs:max-w-[320px] md:max-w-[390px] h-full'>
            <div className='flex flex-row items-end font-semibold text-white gap-1'>
              <p className='md:text-[20px] text-base 2xs:text-lg'>0.01 SOL /</p>
              <p className='md:text-[20px] text-base 2xs:text-lg'>One Time Fee</p>
            </div>
            <div className='flex flex-col gap-2 2xs:gap-3 md:gap-4'>
              <div className='flex flex-row justify-start items-center gap-3'>
                <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                  <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                </div>
                <p className='text-[12px] text-white/80 2xs:text-[13px] dm:text-sm'>
                  15-minute early access
                </p>
              </div>
              <div className='flex flex-row justify-start items-center gap-3'>
                <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                  <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                </div>
                <p className='text-[12px] text-white/80 2xs:text-[13px] dm:text-sm'>
                  Exclusive trading window
                </p>
              </div>
              <div className='flex flex-row justify-start items-center gap-3'>
                <div className='flex justify-center items-center bg-[#00B400]/10 rounded-full w-[16px] 2xs:w-[19px] md:w-[22px] h-[16px] 2xs:h-[19px] md:h-[22px] text-[#00B400]'>
                  <FaCheck className='text-[8px] 2xs:text-[10px] md:text-[12px]' />
                </div>
                <p className='text-[12px] text-white/80 2xs:text-[13px] dm:text-sm'>
                  limited each token drop availability
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-row items-center gap-2 md:gap-3 mx-auto'>
            <input
              type='checkbox'
              checked={checkState}
              onChange={() => setCheckState(!checkState)}
              className='bg-[#784FD8] w-3 2xs:w-4 md:w-5 h-3 2xs:h-4 md:h-5'
            />
            <div className='flex flex-row items-center gap-2 text-[12px] text-white/50 2xs:text-sm md:text-lg'>
              <p>I agree to the</p>
              <a href='/' className='border-b-[1px] border-b-white/50'>Terms and Conditions</a>
            </div>
          </div>

          <div className="flex justify-around p-1 2xs:p-2 md:p-3 w-full">
            <div onClick={() => saveEarlyAccessProceed()} className={`${checkState ? "bg-[#784FD8] text-white cursor-pointer" : "bg-[#784FD8]/70 text-white/70 cursor-not-allowed"} px-4 2xs:px-5 md:px-6 py-1 2xs:py-2 md:py-3 border-[1px] border-black rounded-full text-[12px] 2xs:text-sm md:text-lg`}>Proceed to Payment</div>
          </div>
        </div>
      </div>
    </div >
  )
}
