"use client";
import ArchivePage from "@/components/archive";

export default function Archive() {
  return (
    <div className="relative flex flex-col w-full h-full min-h-[calc(100vh-180px)] object-cover overflow-hidden">
      <div className="z-30 mx-auto w-full max-w-[1440px] h-full">
        <ArchivePage />
      </div>
    </div>
  );
}
