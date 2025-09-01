"use client";
import { Chatting } from "@/components/trading/Chatting";
import { TradeForm } from "@/components/trading/TradeForm";
import { TradingChart } from "@/components/TVChart/TradingChart";
import UserContext from "@/context/UserContext";
import { coinInfo } from "@/utils/types";
import { getCoinInfo, getTokenPriceAndChange } from "@/utils/util";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SocialList from "../others/socialList";
import { errorAlert, successAlert } from "../others/ToastGroup";
import Image from "next/image";
import QuasarImg from "@/../public/assets/images/tools/tradefrom-bg.png"
import StarImg from "@/../public/assets/images/tools/trade-star.png"
import { FaCaretUp } from "react-icons/fa";
import SlippageModal from "../modals/SlippageModal";
import ImageLoading from "../loadings/ImageLoading";
import { RiFlashlightLine } from "react-icons/ri";
import { useSocket } from "@/contexts/SocketContext";
import { CoinGeckoChart } from "../TVChart/CoinGeckoChart";

export default function TradingPage() {
  const { setCoinId, setIsLoading, updateCoin, slipPageModalState, solPrice } = useContext(UserContext);
  const { newTx } = useSocket();
  const pathname = usePathname();
  const [daysAgo, setDaysAgo] = useState<string>("0d ago")
  const [coin, setCoin] = useState<coinInfo>({} as coinInfo);
  const [tokenLiquidity, setTokenLiquidity] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [tokenDayLiquidity, setTokenDayLiquidity] = useState<number>(0);

  const getTimeAgo = (coinDate: Date) => {
    const pastDate = new Date(coinDate);
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - pastDate.getTime();

    if (differenceInMs < 1000 * 60 * 60 * 24) {
      if (differenceInMs < 1000 * 60) {
        setDaysAgo("Just now");
      } else {
        const _minutesAgo = Math.floor(differenceInMs / (1000 * 60));
        if (_minutesAgo < 60) {
          setDaysAgo(`${_minutesAgo}m ago`);
        } else {
          const minutesAgo = Math.floor(_minutesAgo / 60);
          setDaysAgo(`${minutesAgo}h ago`);
        }
      }
    } else {
      const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      setDaysAgo(`${daysAgo}d ago`);
    }
  };

  const getData = async (pathname: string) => {
    setIsLoading(true)
    try {
      const segments = pathname.split("/");
      const parameter = segments[segments.length - 1];
      setCoinId(parameter);
      const data = await getCoinInfo(parameter);
      const _tokenPrice = await getTokenPriceAndChange(data.token)
      if (typeof _tokenPrice === 'object' && _tokenPrice !== null) {
        setTokenPrice(_tokenPrice.price);
        setTokenDayLiquidity(_tokenPrice.changeIn24h)
        setTokenLiquidity(_tokenPrice.liquidity);
      }
      setCoin(data);
      getTimeAgo(data?.date)
    } catch (error) {
      errorAlert("Failed to fetch coin data")
    } finally {
      setIsLoading(false);
    }
  }

  const updateData = async (pathname: string) => {
    try {
      const segments = pathname.split("/");
      const parameter = segments[segments.length - 1];
      setCoinId(parameter);
      const data = await getCoinInfo(parameter);
      const _tokenPrice = await getTokenPriceAndChange(data.token)
      if (typeof _tokenPrice === 'object' && _tokenPrice !== null) {
        setTokenPrice(_tokenPrice.price);
        setTokenDayLiquidity(_tokenPrice.changeIn24h)
        setTokenLiquidity(_tokenPrice.liquidity);
      }
      setCoin(data);
      getTimeAgo(data?.date)
    } catch (error) {
      errorAlert("Failed to fetch coin data")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (pathname || updateCoin) {
      getData(pathname)
    }
  }, [pathname, updateCoin]);

  useEffect(() => {
    updateData(pathname)
  }, [newTx])

  return (
    <div className="relative flex flex-col gap-5 mx-auto px-3 pt-10 pb-28 w-full">
      <div className="flex md3:flex-row flex-col gap-4 w-full">
        <div className="px-2 w-full">
          <div className="flex md:flex-row flex-col justify-between items-center w-full">
            <div className="flex flex-row justify-start items-center gap-4 w-full">
              {coin?.url ?
                <Image src={(coin?.url)} alt="TokenIng" width={48} height={48} className="rounded-full w-12 h-12" />
                :
                <div className="rounded-full w-12 h-12">
                  <ImageLoading />
                </div>
              }
              <div className="flex 3xs:flex-row flex-col justify-between items-center w-full">
                <div className="flex flex-row 3xs:flex-col justify-between 3xs:justify-start items-start gap-1 md:pr-3 w-full">
                  <p className="text-[12px] text-white 2xs:text-sm md:text-base md3:text-lg">
                    {coin?.name}
                  </p>
                  <p className="text-[8px] text-white/60 2xs:text-[10px] md:text-[12px] md3:text-sm">
                    {coin?.ticker} / SOL
                  </p>
                </div>
                <div className="flex flex-row 3xs:flex-col justify-between 3xs:justify-start items-start gap-1 md:pr-3 w-full">
                  <p className="text-[8px] text-white/60 2xs:text-[10px] md:text-[12px] md3:text-sm">
                    Market cap
                  </p>
                  <p className="text-[12px] text-white 2xs:text-sm md:text-base md3:text-lg">
                    ${(coin?.progressMcap !== null || coin?.progressMcap !== undefined)
                      ? (() => {
                        const mcap = coin.progressMcap * solPrice;
                        if (mcap >= 1_000_000_000) {
                          // Billion
                          return (mcap / 1_000_000_000).toFixed(2) + 'B';
                        } else if (mcap >= 1_000_000) {
                          // Million
                          return (mcap / 1_000_000).toFixed(2) + 'M';
                        } else if (mcap >= 1_000) {
                          // Thousand
                          return (mcap / 1_000).toFixed(2) + 'K';
                        } else {
                          // Less than thousand
                          return mcap.toFixed(2);
                        }
                      })()
                      : 'N/A'}
                  </p>
                </div>
                <div className="flex flex-row 3xs:flex-col justify-between 3xs:justify-start items-start gap-1 md:pr-3 w-full">
                  <p className="text-[8px] text-white/60 2xs:text-[10px] md:text-[12px] md3:text-sm">
                    Virtual Liquidity
                  </p>
                  <p className="text-[12px] text-white 2xs:text-sm md:text-base md3:text-lg">
                    ${tokenLiquidity.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between md:justify-end items-end gap-2 pt-3 md:pt-0 w-full md3:w-1/3">
              <p className="font-medium text-white md3:text-[26px] text-sm 2xs:text-base md:text-lg md2:text-xl">
                ${tokenPrice}
              </p>
              <div className="flex flex-row items-center gap-1 text-[#58D764]">
                <FaCaretUp />
                <p className="font-medium text-[8px] 2xs:text-[10px] md:text-[12px] md2:text-sm">
                  {tokenDayLiquidity}% (1d)
                </p>
              </div>
            </div>
          </div>
          {
            coin?.bondingCurve ?
              <CoinGeckoChart param={coin}></CoinGeckoChart>
              :
              <TradingChart param={coin}></TradingChart>
          }
          <div className="hidden md3:flex flex-col">
            <Chatting coin={coin}></Chatting>
          </div>
        </div>

        <div className="flex flex-col gap-4 mx-auto w-full max-w-[315px] h-full">
          <div className="relative flex flex-row justify-center items-center bg-[#784FD8]/20 rounded-lg w-full h-[62px] object-cover overflow-hidden">
            <Image src={QuasarImg} alt="QuasarImg" fill className="rounded-lg w-full h-full" />
            <div className="z-10 absolute flex flex-row justify-between items-center p-3 w-full">
              <div className="flex flex-row justify-center items-center gap-2">
                <Image src={StarImg} alt="StarImg" width={38} height={38} className="h-[38px]" />
                <p className="font-semibold text-white text-lg">
                  Quasar
                </p>
              </div>
              <p className="flex flex-row text-white">
                $1M
              </p>
            </div>
          </div>
          <TradeForm coin={coin}></TradeForm>
          <div className="flex flex-col gap-3 bg-[#0E0E0E] p-3 rounded-lg">
            <div className="flex flex-col gap-2 px-3 py-2 w-full">
              <div className="flex flex-row justify-between items-center text-[12px] md:text-sm">
                <p className="text-white/40">
                  Bonding Curve Progress
                </p>
                <p className="text-white/60">
                  {daysAgo ? daysAgo : "5"} Days
                </p>
              </div>
              <div className="relative bg-white/10 rounded-full h-2 object-cover overflow-hidden">
                <div
                  className="bg-[#58D764] h-2"
                  style={{ width: `${coin.bondingCurve === false ? (coin.progressCurve * 100) : "100"}%` }}  // Fix: Corrected percentage calculation
                ></div>
              </div>
              <div className="flex flex-row justify-between items-center text-[12px] md:text-sm">
                <p className="text-white/40">
                  Remaining Time
                </p>
                <p className="text-white/60">
                  {daysAgo ? daysAgo : "3"} Days
                </p>
              </div>
            </div>
          </div>

          {coin?.bondingCurve &&
            <div className="w-full flex flex-row gap-2 bg-[#0E0E0E] p-3 rounded-lg">
              <RiFlashlightLine className="text-xl text-[#FFD700]" />
              This token is migrated.
            </div>
          }

          <SocialList data={coin} />
        </div>
        <div className="md3:hidden flex flex-col">
          <Chatting coin={coin}></Chatting>
        </div>
      </div>

      {slipPageModalState && <SlippageModal />}
    </div>
  );
}
