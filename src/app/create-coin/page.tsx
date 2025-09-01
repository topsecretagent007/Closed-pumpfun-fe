"use client";
import CreateToken from "@/components/creatToken";

export default function Page() {

  return (
    <div className="relative flex flex-col w-full h-full min-h-[calc(100vh-468px)] object-cover overflow-hidden">
      <div className="z-30 mx-auto w-full max-w-[1440px] h-full">
        <CreateToken />
      </div>
    </div>

  );
}
