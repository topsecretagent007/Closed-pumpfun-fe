"use client"
import { FC, useContext, useEffect, useRef, useState } from "react";
import UserContext from "@/context/UserContext";
import { coinInfo } from "@/utils/types";
import { getCoinsInfo, getSolPriceInUSD, test } from "@/utils/util";
import { CoinBlog } from "../cards/CoinBlog";
import { useSocket } from "@/contexts/SocketContext";

const HomePage: FC = () => {
  const { setIsLoading, setSolPrice } = useContext(UserContext);
  const { newToken } = useSocket();
  const [data, setData] = useState<coinInfo[]>([]);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);

  const getData = () => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const coins = await getCoinsInfo();
        const price = await getSolPriceInUSD();
        if (coins && coins !== null) {
          coins.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setData(coins);
          setSolPrice(price);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchData();
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    if (newToken) {
      if (newToken && typeof newToken === 'object') {
        setData((prev) => [newToken as unknown as coinInfo, ...prev]);
      }
    }
  }, [newToken])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        dropdownRef1.current && !dropdownRef1.current.contains(event.target)
      ) {
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, dropdownRef1]);

  return (
    <div className="z-30 relative flex flex-col gap-10 pt-14 pb-20 w-full h-full min-h-[calc(100vh-100px)]">
      <div className="z-10 flex flex-col justify-center items-center gap-4 px-4 w-full h-full text-center">
        <p className="bg-clip-text bg-gradient-to-r from-[#784FD8] to-[#FFFFFF] font-bold text-transparent md:text-[34px] text-xl 2xs:text-xl">
          Tokens That Made History
        </p>
        <p className="max-w-[630px] text-[12px] text-white 2xs:text-base md:text-lg">
          A look back at tokens before they migrated. Their final state is preserved here, marking a key moment in our platform's history
        </p>
      </div>

      {data && (
        <div className="z-30 flex flex-wrap items-center gap-x-3 gap-y-8 px-4 w-full h-full">
          {data.map((temp, index) => (
            <div key={index} className="bg-[#0E0E0E] shadow-[#784FD8]/50 shadow-lg mx-auto px-1.5 2xs:px-3 py-3 rounded-lg w-full max-w-[420px]">
              <CoinBlog coin={temp}></CoinBlog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default HomePage;
