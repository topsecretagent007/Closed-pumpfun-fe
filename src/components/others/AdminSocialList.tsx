"use client"
import React from 'react'
import { AdminSocialData } from '@/config/TextData'

export default function AdminSocialList() {
  return (
    <div className='flex flex-row gap-3 md:gap-6 items-center text-[#784FD8]'>
      {AdminSocialData.map((item: any, index: number) => {
        return (
          <a href={`${item.url}`} key={index} className='flex flex-col border-[1px] border-[#784FD8]/10 rounded-full text-base md:text-xl p-2 bg-[#784FD8]/10'>
            {item.icon}
          </a>
        )
      })}
    </div>
  )
}
