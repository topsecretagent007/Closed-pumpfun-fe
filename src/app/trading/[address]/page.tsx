"use client";
import TradingPage from "@/components/trading";

export default function Page() {

  return (
    <div className="relative flex flex-col w-full h-full min-h-[calc(100vh-100px)] object-cover overflow-hidden">
      <div className="z-30 mx-auto w-full max-w-[1440px] h-full">
        <TradingPage />
      </div>
    </div>
  );
}
