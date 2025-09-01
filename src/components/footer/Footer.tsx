"use client"
import React from 'react'
import Image from 'next/image'
import { FooterTextList, AuditedList } from '@/config/TextData'
import LogoImg from "@/../public/assets/logo-light.png"
import AdminSocialList from '../others/AdminSocialList'
import ArchiveFootImg from "@/../public/assets/images/tools/archive-footer.png"

export default function Footer() {
  return (
    <div className='absolute flex flex-col justify-center items-center w-full'>
      <div className='z-20 relative flex flex-col justify-center items-center bg-[#0D0D0D]/80 w-full h-full'>
        <div className='mx-auto container'>
          <div className='flex flex-col justify-center items-center h-0'>
            <Image src={ArchiveFootImg} alt="ArchiveFootImg" className="flex flex-col opacity-65 w-full" />
          </div>
          <div className='z-30 relative flex flex-col justify-center items-center gap-4 md:gap-8 py-7 md:py-14 w-full h-full'>
            <div className='flex flex-col justify-center items-center gap-3 mx-auto h-full'>
              <Image src={LogoImg} alt='LogoImg' className='flex flex-col w-[148px] md:w-[288px]' />
            </div>
            <AdminSocialList />
            <div className='hidden md:flex md:flex-row flex-col justify-center items-center'>
              <p className='font-semibold text-white/50 text-sm'>
                Audited by:
              </p>
              <div className='flex md:flex-row flex-col justify-center items-center gap-1 md:gap-0'>
                {AuditedList.map((item: any, index: number) => {
                  return (
                    <Image key={index} src={item.img} alt={item.id} className={`${(index !== AuditedList.length - 1) ? "md:border-r-white/20 md:border-r-[1px]" : ""} h-full w-full max-w-[200px] min-h-[20px] md:h-4 md:w-full flex flex-col px-3`} />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white/5 w-full'>
          <div className='mx-auto container'>
            <div className='flex md:flex-row flex-col justify-center md:justify-between items-center px-5 py-2 md:py-0 w-full h-full md:h-[60px] font-semibold text-white/50'>
              <p className='text-[12px] md:text-sm'>
                © 2025 Closed Digital. All rights reserved.
              </p>
              <div className='flex md:flex-row flex-wrap justify-center md:justify-end items-center pt-2 md:pt-0'>
                {FooterTextList.map((item: any, index: number) => {
                  return (
                    <a key={index} href={item.url} className={`${(index !== FooterTextList.length - 1) ? "md:border-r-[1.5px] md:border-r-white/30" : ""} cursor-pointer flex flex-col px-3 hover:text-white text-[12px] md:text-base`}>
                      {item.text}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
