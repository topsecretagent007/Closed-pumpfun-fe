import UserContext from '@/context/UserContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import TokenImg from "@/../public/assets/images/user/tokenadmin.png"
import SolImg from "@/../public/assets/images/tools/sol.png"
import Image from 'next/image'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { FeeData } from '@/config/TextData'

export default function SlippageModal() {
  const { setSlipPageModalState, slippageProm, setSlippageProm, priorityFee, setPriorityFee, tipAmount, setTipAmount } = useContext(UserContext)
  const menuDropdown = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setSlipPageModalState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  const setModalState = (e: boolean) => {
    setSlipPageModalState(e)
  }

  const handleSlippageAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      return;
    } else {
      setSlippageProm(Number(e.target.value))
    }
  }

  const handlePriorityFeeAmountChange = (value: number) => {
    if (Number(value) < 0) {
      setPriorityFee(0)
      return;
    } else {
      setPriorityFee(value)
    }
  }

  const handleTipAmountChange = (value: number) => {
    if (Number(value) < 0) {
      setTipAmount(0)
      return;
    } else {
      setTipAmount(value)
    }
  }


  const increment = (e: string) => {
    if (e === "slippagePro") {
      setSlippageProm(slippageProm + 1)
    } else if (e === "priorityFee") {
      setPriorityFee(priorityFee + 1)
    } else if (e === "tipAmount") {
      setTipAmount(tipAmount + 1)
    }
  }

  const decrement = (e: string) => {
    if (e === "slippagePro") {
      if (slippageProm <= 1) {
        setSlippageProm(0)
      } else {
        setSlippageProm(slippageProm - 1)
      }
    } else if (e === "priorityFee") {
      if (priorityFee <= 1) {
        setPriorityFee(0)
      } else {
        setPriorityFee(priorityFee - 1)
      }
    } else if (e === "tipAmount") {
      if (tipAmount <= 1) {
        setTipAmount(0)
      } else {
        setTipAmount(tipAmount - 1)
      }
    }
  }


  return (
    <div className='z-50 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full'>
      <div ref={menuDropdown} className="flex flex-col justify-center items-center gap-4 2xs:gap-5 md:gap-6 bg-[#131313] p-2 2xs:p-3.5 md:p-5 border-[1px] border-white/10 rounded-xl w-[90%] max-w-[380px]">
        <div className='flex flex-row justify-between items-center pt-3 w-full'>
          <p className='font-bold text-white md:text-[20px] text-base 2xs:text-lg'>Slippage</p>
          <div onClick={() => setModalState(false)} className='top-4 right-4 flex flex-col rounded-full w-[20px] 2xs:w-[25px] md:w-[30px] h-[20px] 2xs:h-[25px] md:h-[30px] cursor-pointer'>
            <IoIosCloseCircleOutline className='text-white/50 text-2xl 2xs:text-3xl md:text-4xl' />
          </div>
        </div>
        <div className='flex flex-col justify-start items-center gap-4 w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <p className='text-white/40 text-sm'>Set max Slippage (%)</p>
            <div className='flex flex-row justify-between items-center bg-[#0d0d0d] border-[1px] border-white/10 rounded-lg w-full h-12 object-cover overflow-hidden'>
              <div className='flex flex-row items-center gap-2 w-full'>
                <div className='flex flex-row items-center w-full'>
                  <div className='flex flex-row justify-between items-center p-3 w-full text-white'>
                    <div className='flex flex-row justify-start items-center gap-2'>
                      <Image src={TokenImg} alt="TokenImg" className="w-6 h-6" />
                      <p className='text-white text-sm'>Token</p>
                    </div>
                    <input
                      type='number'
                      value={slippageProm}
                      onChange={handleSlippageAmountChange}
                      className='bg-[#0d0d0d] outline-none w-20 h-8 text-white text-sm text-end'
                      placeholder='0.0'
                    />
                  </div>
                  <div className='flex flex-col w-[54px] h-12'>
                    <div onClick={() => increment("slippageProm")} className='flex flex-col justify-center items-center bg-black hover:bg-black/50 w-full h-full text-white/70 hover:text-white text-xl cursor-pointer'>
                      <FaCaretUp />
                    </div>
                    <div onClick={() => decrement("slippageProm")} className='flex flex-col justify-center items-center bg-black hover:bg-black/50 w-full h-full text-white/70 hover:text-white text-xl cursor-pointer'>
                      <FaCaretDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <p className='text-white/40 text-sm'>Set Priority fee </p>
            <div className='flex flex-row justify-between items-center bg-[#0d0d0d] border-[1px] border-white/10 rounded-lg w-full h-12 object-cover overflow-hidden'>
              <div className='flex flex-row items-center gap-2 w-full'>
                <div className='flex flex-row items-center w-full'>
                  <div className='flex flex-row justify-between items-center p-3 w-full text-white'>
                    <div className='flex flex-row justify-start items-center gap-2'>
                      <Image src={SolImg} alt="SolImg" className="w-6 h-6" />
                      <p className='text-white text-sm'>SOL</p>
                    </div>
                    <input
                      type='number'
                      value={priorityFee}
                      onChange={(e) => handlePriorityFeeAmountChange(Number(e.target.value))}
                      className='bg-[#0d0d0d] outline-none w-20 h-8 text-white text-sm text-end'
                      placeholder='0.0'
                    />
                  </div>
                  <div className='flex flex-col w-[54px] h-12'>
                    <div onClick={() => increment("priorityFee")} className='flex flex-col justify-center items-center bg-black hover:bg-black/50 w-full h-full text-white/70 hover:text-white text-xl cursor-pointer'>
                      <FaCaretUp />
                    </div>
                    <div onClick={() => decrement("priorityFee")} className='flex flex-col justify-center items-center bg-black hover:bg-black/50 w-full h-full text-white/70 hover:text-white text-xl cursor-pointer'>
                      <FaCaretDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-start items-center gap-2 w-full text-[12px] text-white/70'>
              {FeeData.map((data: any, index: number) => (
                <div key={index} onClick={() => handlePriorityFeeAmountChange(data.value)} className='flex flex-col px-2 py-1 border-[1px] border-white/10 rounded-lg cursor-pointer'>
                  {data.value}
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <p className='text-white/40 text-sm'>Tip Amount</p>
            <div className='flex flex-row justify-between items-center bg-[#0d0d0d] border-[1px] border-white/10 rounded-lg w-full h-12 object-cover overflow-hidden'>
              <div className='flex flex-row items-center gap-2 w-full'>
                <div className='flex flex-row items-center w-full'>
                  <div className='flex flex-row justify-between items-center p-3 w-full text-white'>
                    <div className='flex flex-row justify-start items-center gap-2'>
                      <Image src={SolImg} alt="SolImg" className="w-6 h-6" />
                      <p className='text-white text-sm'>SOL</p>
                    </div>
                    <input
                      type='number'
                      value={tipAmount}
                      onChange={(e) => handleTipAmountChange(Number(e.target.value))}
                      className='bg-[#0d0d0d] outline-none w-20 h-8 text-white text-sm text-end'
                      placeholder='0.0'
                    />
                  </div>
                  <div className='flex flex-col w-[54px] h-12'>
                    <div onClick={() => increment("tipAmount")} className='flex flex-col justify-center items-center bg-black hover:bg-black/50 w-full h-full text-white/70 hover:text-white text-xl cursor-pointer'>
                      <FaCaretUp />
                    </div>
                    <div onClick={() => decrement("tipAmount")} className='flex flex-col justify-center items-center bg-black hover:bg-black/50 w-full h-full text-white/70 hover:text-white text-xl cursor-pointer'>
                      <FaCaretDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-start items-center gap-2 w-full text-[12px] text-white/70'>
              {FeeData.map((data: any, index: number) => (
                <div key={index} onClick={() => handleTipAmountChange(data.value)} className='flex flex-col px-2 py-1 border-[1px] border-white/10 rounded-lg cursor-pointer'>
                  {data.value}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div onClick={() => setModalState(false)} className='flex flex-row justify-center items-center bg-[#58D764] py-3 rounded-full w-full font-semibold text-black/80 text-base cursor-pointer'>
          Save
        </div>

      </div>
    </div >
  )
}