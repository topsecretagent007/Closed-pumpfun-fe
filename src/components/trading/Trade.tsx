import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GrFormNextLink } from "react-icons/gr";
import { recordInfo } from "@/utils/types";

interface TradePropsInfo {
  trade: recordInfo;
  lastData: boolean;
}

export const Trade: React.FC<TradePropsInfo> = ({ trade, lastData }) => {
  const [timeAgo, setTimeAgo] = useState<string>("0d ago");
  const router = useRouter();

  const handleToRouter = (id: string) => {
    router.push(id);
  };

  const getTimeAgo = (coinDate: Date) => {
    const pastDate = new Date(coinDate);
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - pastDate.getTime();

    if (differenceInMs < 1000 * 60) {
      setTimeAgo("Just now");
    } else if (differenceInMs < 1000 * 60 * 60) {
      const minutesAgo = Math.floor(differenceInMs / (1000 * 60));
      setTimeAgo(`${minutesAgo}m ago`);
    } else if (differenceInMs < 1000 * 60 * 60 * 24) {
      const hoursAgo = Math.floor(differenceInMs / (1000 * 60 * 60));
      setTimeAgo(`${hoursAgo}h ago`);
    } else if (differenceInMs < 1000 * 60 * 60 * 24 * 30) {
      const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      setTimeAgo(`${daysAgo}d ago`);
    } else if (differenceInMs < 1000 * 60 * 60 * 24 * 365) {
      const monthsAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 30));
      setTimeAgo(`${monthsAgo}mo ago`);
    } else {
      const yearsAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 365));
      setTimeAgo(`${yearsAgo}y ago`);
    }
  };

  useEffect(() => {
    if (trade) {
      getTimeAgo(trade.time);
    }
  }, [trade]);

  return (
    <tr className={`${trade.amountIn === 0 && "hidden"} w-full text-white/70 bg-[#0E0E0E] ${lastData ? "" : "border-b-[1px] border-b-white/10"} text-[11px] 2xs:text-[13px] md:text-[15px]`}>
      <td className="py-2 text-center">{timeAgo}</td>
      <td className={`${trade.swapDirection == 0 ? "text-green-600" : "text-red-600"} text-center py-2 `}>{trade.swapDirection == 0 ? "Buy" : "Sell"}</td>
      <td className='py-2 text-center'>{trade.swapDirection == 0 ? `${(trade?.amountIn / 10 ** 9).toFixed(4)}` : `${(trade?.amountOut / 10 ** 9).toFixed(4)}`}</td>
      <td className='py-2 text-center'>{trade.swapDirection == 0 ? `${(trade?.amountOut / 10 ** 6).toFixed(4)}` : `${(trade?.amountIn / 10 ** 6).toFixed(4)}`}</td >
      <td className="flex flex-row justify-center items-center gap-2 py-2 text-center">
        <p
          onClick={() => handleToRouter(`https://solscan.io/tx/${trade.tx}?cluster=devnet`)}
          className="leading-10 hover:cursor-pointer"
        >
          {trade?.tx?.slice(0, 8)}
        </p>
        <GrFormNextLink />

      </td>
    </tr>
  );
};
