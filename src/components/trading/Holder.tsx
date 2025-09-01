import { holderInfo } from "@/utils/types";
import React from "react";

interface TradePropsInfo {
  holder: holderInfo;
  index: number;
  lastData: boolean;
  curve: string;
}

export const Holders: React.FC<TradePropsInfo> = ({ holder, index, lastData, curve }) => {

  return (
    <tr className={`w-full text-white/70 rounded-b-xl bg-[#0E0E0E] ${lastData ? "" : "border-b-[1px] border-b-white/10"} text-[11px] 2xs:text-[13px] md:text-[15px]`}>
      <td className={`${(index + 1) === 1 ? "text-[#FFD700]" : (((index + 1) === 3) ? "text-[#CD7F32]" : "text-white/70")} text-center py-2`}>#{index + 1}</td>
      <td className="py-2 text-center">{curve === holder.owner ? "Bonding Curve" : holder?.slice}</td>
      <td className="py-2 text-center">{(holder.amount / 10 ** 6)}</td>
      <td className="py-2 text-center">{holder.percentage}%</td>
    </tr>
  );
};
