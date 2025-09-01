import Image from 'next/image'
import React, { useState } from 'react'
import YouTube from "react-youtube";
import { PlayCircle } from "lucide-react";
import MomentRBg from "@/../public/assets/images/tools/moments-r.png"
import MomentBg from "@/../public/assets/images/tools/moments.png"
import MomentLBg from "@/../public/assets/images/tools/moments-l.png"

export default function Moment() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "EhPXdbjGLTc";

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  if (!videoId) {
    return <p className="text-red-500">Error: No video ID provided.</p>;
  }

  return (
    <div className="relative flex flex-col w-full h-full object-cover overflow-hidden">
      <div className='top-0 left-0 z-10 absolute flex flex-row justify-between w-full'>
        <Image src={MomentLBg} alt="MomentLBg" className="-top-14 absolute flex flex-col h-[800px] -rotate-12" />
        <Image src={MomentBg} alt="MomentBg" className="left-[15%] absolute flex flex-col w-[70%]" />
        <Image src={MomentRBg} alt="MomentRBg" className="-top-14 right-0 absolute flex flex-col h-[800px] rotate-12" />
      </div>
      <div className="z-20 relative container">
        <div className="flex flex-col justify-center items-center gap-[60px] px-3 py-20">
          <div className="flex flex-col justify-center items-center gap-3 mx-auto w-full max-w-[720px]">
            <div className="relative flex flex-row gap-2 px-4 py-1 border-[1px] border-white/5 rounded-full">
              <p className="relative bg-clip-text bg-gradient-to-r from-[#784FD8] to-[#FFFFFF] text-transparent text-base">
                Don't Miss a Moment!
              </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-2 font-semibold text-whte md2:text-[44px] text-lg">
              <p className="text-white">
                Catch the Hottest Moments
              </p>
              <p className="text-[#784FD8]">
                Live!
              </p>
            </div>
            <p className="max-w-[590px] text-[12px] text-white/70 md2:text-base text-center">
              Stay connected with your favorite celebrities! Watch live streams, exclusive interviews, and behind-the-scenes footage—all in one place.
            </p>
          </div>
          <div className="relative bg-black border-[2px] border-white/20 rounded-[32px] w-full max-w-[1320px] overflow-hidden">
            {!isPlaying && (
              <div
                className="absolute inset-0 flex justify-center items-center bg-black/60 cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <PlayCircle size={80} className="text-white hover:scale-110 transition-transform" />
              </div>
            )}
            {isPlaying ? (
              <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
            ) : (
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>)
}
