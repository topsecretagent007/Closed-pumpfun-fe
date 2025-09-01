import { coinInfo, holderInfo, tradeInfo } from "@/utils/types";
import { useContext, useEffect, useMemo, useState } from "react";
import { Trade } from "./Trade";
import { findHolders, getCoinTrade, getCuverData } from "@/utils/util";
import UserContext from "@/context/UserContext";
import { Holders } from "./Holder";
import { useSocket } from "@/contexts/SocketContext";
import { useWallet } from "@solana/wallet-adapter-react";

interface ChattingProps {
  coin: coinInfo
}

export const Chatting: React.FC<ChattingProps> = ({ coin }) => {
  const { coinId } = useContext(UserContext);
  const { newTx } = useSocket();
  const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
  const [tradesData, setTradesData] = useState<any[]>([]);
  const wallet = useWallet();

  const [currentTable, setCurrentTable] = useState<string>("Trade");
  const [topHolders, setTopHolders] = useState<holderInfo[]>([])
  const [curceAddress, setCurveAddress] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      if (coin && Object.keys(coin).length !== 0) {
        if (currentTable === "Trade") {
          const data = await getCoinTrade(coin._id);
          setTrades(data);
        } else if (currentTable === "Holder") {
          const data = await findHolders(coin.token);
          const curveData = await getCuverData(coin.token, wallet);
          setCurveAddress(curveData.toString())
          const sortedData = data
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 10);

          setTopHolders(sortedData);
        }
      }
    };

    fetchData();
  }, [currentTable, coinId, coin]);



  useEffect(() => {
    let _trades = [];
    _trades = trades.record?.reverse();
    setTradesData(_trades)
  }, [trades])

  useEffect(() => {
    if (newTx) {
      setTradesData((prev) => (Array.isArray(prev) ? [newTx, ...prev] : [newTx])); // Ensure prev is an array
    }
  }, [newTx]);

  return (
    <div className="pt-2 2xs:pt-5 md:pt-8">
      <div className="relative flex flex-row justify-between items-center px-2 border-b-[2px] border-b-white/10 h-[35px] font-semibold text-white">
        <div className="absolute flex flex-row items-center">
          <div
            onClick={() => setCurrentTable("Trade")}
            className={` px-4 py-2 2xs:py-1.5 md:py-1 text-[12px] 2xs:text-sm md:text-base cursor-pointer ${currentTable === "Trade" ? "border-b-white text-white border-b-[3px]" : "text-[#887e7e] pb-[11px] 2xs:pb-[9px] md:pb-[7px]"
              }`}
          >
            Trade History
          </div>
          <div
            onClick={() => setCurrentTable("Holder")}
            className={` px-4 py-2 2xs:py-1.5 md:py-1 text-[12px] 2xs:text-sm md:text-base cursor-pointer ${currentTable === "Holder" ? "border-b-white text-white border-b-[3px]" : "text-[#887e7e] pb-[11px] 2xs:pb-[9px] md:pb-[7px]"
              }`}
          >
            Holder Distribution
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3 2xs:mt-5 md:mt-8 p-1 md:p-3 rounded-lg w-full min-h-[50px] max-h-[650px] object-cover overflow-hidden overflow-y-scroll">

        {currentTable === "Trade" &&
          <div className="py-4 w-full h-full">
            <table className="rounded-lg w-full h-full object-cover overflow-hidden">
              <thead className="bg-[#1D1D1D] w-full text-white">
                <tr className="text-[13px] 2xs:text-[15px] md:text-[17px] text-centers">
                  <th className="justify-center items-center py-2 w-[15%] text-white cursor-pointer">Date</th>
                  <th className="justify-center items-center py-2 w-[10%] text-white">Type</th>
                  <th className="justify-center items-center py-2 w-[25%] text-white">SOL</th>
                  <th className="justify-center items-center py-2 w-[25%] text-white">{coin?.ticker ? coin?.ticker : "Token"}</th>
                  <th className="justify-center items-center py-2 w-[25%] text-white">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {tradesData && tradesData.map((trade, index) => (
                  <Trade key={index} trade={trade} lastData={(tradesData.length - 2) === index ? true : false} ></Trade>
                ))}
              </tbody>
            </table>
          </div>
        }

        {currentTable === "Holder" &&
          <div className="py-4 w-full h-full">
            <table className="rounded-lg w-full h-full object-cover overflow-hidden">
              <thead className="bg-[#1D1D1D] w-full text-white">
                <tr className="text-lg text-start">
                  <th className="py-2 text-white">#</th>
                  <th className="py-2 text-white">Account</th>
                  <th className="py-2 text-white">Amount</th>
                  <th className="py-2 text-white">Percentage(%)</th>
                </tr>
              </thead>
              <tbody>
                {topHolders && topHolders.map((item, index) => (
                  <Holders key={index} holder={item} index={index} lastData={(topHolders.length - 1) === index ? true : false} curve={curceAddress} ></Holders>
                ))}
              </tbody>
            </table>
          </div>
        }

      </div>
    </div >
  );
};
