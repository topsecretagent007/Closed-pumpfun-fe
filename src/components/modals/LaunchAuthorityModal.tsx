import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import EarlyBg from "@/../public/assets/images/tools/early-bg.png"
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserContext from '@/context/UserContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { errorAlert, successAlert } from '../others/ToastGroup';
import { launchAuthority } from '@/utils/util';

export default function LaunchAuthorityModal() {
  const { setLaunchAuthorityModalState, setIsLoading } = useContext(UserContext)
  const { publicKey } = useWallet();
  const menuDropdown = useRef<HTMLDivElement | null>(null);
  const [checkState, setCheckState] = useState<boolean>(false)

  const proceedModal = (e: boolean) => {
    setLaunchAuthorityModalState(e)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setLaunchAuthorityModalState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  const saveLaunchAuthority = async () => {
    if (!publicKey) {
      return errorAlert("Please connect wallet");
    }

    setIsLoading(true)
    try {
      const saveData = await launchAuthority(publicKey.toBase58());
      if (saveData.success) {
        successAlert("Launch authority saved successfully!");
        setLaunchAuthorityModalState(false)
      } else {
        errorAlert("Failed to save launch authority");
      }
    } catch (error) {
      errorAlert("Failed to save launch authority");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className='z-50 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full'>
      <div ref={menuDropdown} className="relative flex flex-col justify-center items-center bg-[#131313] py-[50px] border-[1px] border-white/10 rounded-md w-[90%] max-w-[600px] sm:max-w-xl">
        <Image src={EarlyBg} alt='EarlyBg' className='left-0 z-10 absolute flex flex-col w-full' />
        <div onClick={() => proceedModal(false)} className='top-4 right-4 z-20 absolute flex flex-col rounded-full w-[20px] 2xs:w-[25px] md:w-[30px] h-[20px] 2xs:h-[25px] md:h-[30px] cursor-pointer'>
          <IoIosCloseCircleOutline className='text-white/50 text-2xl 2xs:text-3xl md:text-4xl' />
        </div>
        <div className='z-20 relative flex flex-col gap-2 md:gap-3 w-full max-w-[500px]'>
          <h2 className="font-bold text-white md2:text-[34px] text-xl 2xs:text-2xl md:text-3xl text-center">Get Launch Authority For <strong className='text-[#784FD8]'>$10</strong></h2>
          <p className='w-full text-[9px] text-white/70 2xs:text-[11px] md:text-base text-center'>
            Get token launch authority now.
            <br />
            You will have advantage for new coin launch.
          </p>
          <div className="flex justify-around p-2 2xs:p-3 w-full">
            <div className="flex flex-row items-center gap-2 bg-white/20 px-3 2xs:px-6 py-1.5 2xs:py-3 border-[1px] border-white/10 rounded-lg text-[12px] text-white 2xs:text-base cursor-pointer">
              How It Works
              <FaRegQuestionCircle className='text-lg 2xs:text-xl md:text-2xl' />
            </div>
          </div>

          <div className='flex flex-row items-center gap-2 md:gap-3 mx-auto'>
            <input
              type='checkbox'
              checked={checkState}
              onChange={() => setCheckState(!checkState)}
              className='bg-[#784FD8] w-3 2xs:w-4 md:w-5 h-3 2xs:h-4 md:h-5'
            />
            <div className='flex flex-row items-center gap-2 text-[12px] text-white/50 2xs:text-sm md:text-base'>
              <p>I agree to the</p>
              <a href='/' className='border-b-[1px] border-b-white/50'>Terms and Conditions</a>
            </div>
          </div>

          <div className="flex justify-around p-1 2xs:p-2 md:p-3 w-full">
            <div onClick={() => saveLaunchAuthority()} className={`${checkState ? "bg-[#784FD8] text-white cursor-pointer" : "bg-[#784FD8]/70 text-white/70 cursor-not-allowed"} px-4 2xs:px-5 md:px-6 py-1 2xs:py-2 md:py-3 border-[1px] border-white/30 rounded-full text-[12px] 2xs:text-sm md:text-lg`}>Pay Now</div>
          </div>
        </div>
      </div>
    </div >
  )
}
