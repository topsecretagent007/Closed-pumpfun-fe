"use client";
import Image from "next/image";
import React from "react";
import ConvesationBg from "@/../public/assets/images/tools/conversation-bg.png";
import TwitterIcon from "@/../public/assets/images/tools/twitter-2.png";
import WebSiteIcon from "@/../public/assets/images/tools/website.png";
import InstagramIcon from "@/../public/assets/images/tools/instagram.png";

export default function Conversation() {
  return (
    <div className="relative flex-flex-col justify-center items-center bg-white/5 w-full h-[300px] 2xs:h-[400px]">
      <Image
        src={ConvesationBg}
        alt="ConvesationBg"
        className="z-10 absolute flex flex-col w-full h-full"
      />
      <div className="z-20 relative container">
        <div className="flex flex-col justify-center items-center gap-16 mx-auto py-10 2xs:py-20 w-full max-w-[560px]">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-row items-center gap-2 font-semibold 2xs:text-[34px] text-2xl">
              <p className="text-[#784FD8]">Join</p>
              <p className="text-white">The Conversation</p>
            </div>
            <p className="justify-center items-center text-[12px] text-white/70 2xs:text-base text-center">
              This keeps it short and inviting, encouraging users to engage with
              the brand. If you want other options or variations, let me know!
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-row items-center gap-2 bg-[#0D0D0D4D]/30 p-1 border-[2px] border-white/10 rounded-lg w-full 2xs:w-[170px] cursor-pointer">
              <div className="flex flex-col justify-center items-center bg-white/5 border-[1px] border-white/10 rounded-lg w-[38px] 2xs:w-[52px] h-[38px] 2xs:h-[52px]">
                <Image
                  src={TwitterIcon}
                  alt="WebSiteIcon"
                  className="w-5 2xs:w-7 h-5 2xs:h-7"
                />
              </div>
              <p className="hidden 2xs:flex text-white text-lg">Twitter</p>
            </div>
            <div className="flex flex-row items-center gap-2 bg-[#0D0D0D4D]/30 p-1 border-[2px] border-white/10 rounded-lg w-full 2xs:w-[170px] cursor-pointer">
              <div className="flex flex-col justify-center items-center bg-white/5 border-[1px] border-white/10 rounded-lg w-[38px] 2xs:w-[52px] h-[38px] 2xs:h-[52px]">
                <Image
                  src={InstagramIcon}
                  alt="InstagramIcon"
                  className="w-5 2xs:w-7 h-5 2xs:h-7"
                />
              </div>
              <p className="hidden 2xs:flex text-white text-lg">Instagram</p>
            </div>
            <div className="flex flex-row items-center gap-2 bg-[#0D0D0D4D]/30 p-1 border-[2px] border-white/10 rounded-lg w-full 2xs:w-[170px] cursor-pointer">
              <div className="flex flex-col justify-center items-center bg-white/5 border-[1px] border-white/10 rounded-lg w-[38px] 2xs:w-[52px] h-[38px] 2xs:h-[52px]">
                <Image
                  src={WebSiteIcon}
                  alt="WebSiteIcon"
                  className="w-5 2xs:w-7 h-5 2xs:h-7"
                />
              </div>
              <p className="hidden 2xs:flex text-white text-lg">Twitter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
