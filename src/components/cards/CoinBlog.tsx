import { coinInfo } from "@/utils/types";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import Countup from "../others/Countup";
import { findHolders, getCoinTrade, getTokenPriceAndChange } from "@/utils/util";
import ImageLoading from "../loadings/ImageLoading";

interface CoinBlogProps {
  coin: coinInfo;
}

export const CoinBlog: React.FC<CoinBlogProps> = ({ coin }) => {
  const { setIsLoading, solPrice } = useContext(UserContext);
  const router = useRouter()
  const [holderLength, setHolderLength] = useState<number>(0)
  const [txDataLength, setTxDataLength] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)

  const handleToRouter = (id: string) => {
    setIsLoading(true)
    router.push(id)
  }

  const getHolders = async (token: string) => {
    const data = await findHolders(token);
    setHolderLength(data.length)
  }

  const getTxs = async (id: string) => {
    const data = await getCoinTrade(id);
    setTxDataLength(data?.record?.length)
  }

  const currentTokenPrice = async (token: string) => {
    const _price = await getTokenPriceAndChange(token);
    if (_price) {
      if (typeof _price === 'object' && 'price' in _price) {
        setTokenPrice(_price.price);
      }
    }
  }

  useEffect(() => {
    if (!coin?.token || !coin?._id) return;

    const fetchData = async () => {
      await getHolders(coin.token);
      await getTxs(coin._id);
      await currentTokenPrice(coin.token);
    };

    fetchData();
  }, [coin?.token, coin?._id]);

  return (
    <div className="flex flex-col gap-2.5 2xs:gap-5">
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row justify-start items-center gap-2 w-full'>
          {coin?.url ?
            <Image
              src={coin?.url}
              alt="image"
              width={48}
              height={48}
              className="flex items-center rounded-lg w-9 2xs:w-12 h-9 2xs:h-12 object-cover"
            />
            :
            <div className="flex items-center rounded-lg w-9 2xs:w-12 h-9 2xs:h-12 object-cover">
              <ImageLoading />
            </div>
          }
          <div className='flex flex-col 2xs:justify-start items-start gap-2 text-white'>
            <p className='font-semibold 2xs:text-[18px] text-sm'>
              {coin?.name}
            </p>
            <p className='text-[9px] text-white/70 2xs:text-[12px]'>
              {coin?.ticker} / SOL
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-end'>
          <Countup time={coin?.date} />
        </div>
      </div>

      <div className='flex flex-row justify-between items-center text-[12px] 2xs:text-sm'>
        <div className='flex flex-col justify-center items-center gap-0.5 2xs:gap-1 border-r-[1px] border-r-white/10 w-full'>
          <p className='text-white'>Price</p>
          <p className='text-[#58D764]'>${tokenPrice}</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-0.5 2xs:gap-1 border-r-[1px] border-r-white/10 w-full'>
          <p className='text-white'>Bonding Curve</p>
          <p className='text-white/60'>{(coin?.bondingCurve === false ? (coin?.progressCurve * 100).toFixed(2) : "100")}%</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-0.5 2xs:gap-1 w-full'>
          <p className='text-white'>NFT badge</p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5449 10.8982C11.2293 10.8892 10.9758 10.6307 10.9758 10.3127V7.77383H10.6243C10.3009 7.77383 10.0384 7.51135 10.0384 7.18794C10.0384 6.86452 10.3009 6.60204 10.6243 6.60204H12.4991C12.8226 6.60204 13.085 6.86452 13.085 7.18794C13.085 7.51135 12.8226 7.77383 12.4991 7.77383H12.1476V10.3127C12.1476 10.4112 12.1234 10.5037 12.0804 10.585C12.2085 10.5264 12.3406 10.4772 12.4757 10.4377C12.955 10.2971 13.4256 10.1022 13.8741 9.85768C14.3139 9.61863 14.8107 9.49247 15.3115 9.49247C15.4029 9.49247 15.4943 9.49676 15.5849 9.50497V3.75067C15.5849 3.51827 15.4478 3.30812 15.2349 3.21438L8.04789 0.0505338C7.8979 -0.0154773 7.72721 -0.0154773 7.57683 0.0501432L0.350757 3.21399C0.137881 3.30734 0 3.51787 0 3.75067V13.789C0 14.0226 0.139053 14.2339 0.353491 14.3269L7.57956 17.4517C7.65377 17.4837 7.73267 17.4997 7.81197 17.4997C7.89165 17.4997 7.97094 17.4833 8.04554 17.4513L9.82042 16.6795C9.60481 16.258 9.49154 15.7873 9.49154 15.3124C9.49154 14.8112 9.6177 14.3144 9.85675 13.8754C10.1013 13.4266 10.2962 12.9559 10.4368 12.4762C10.5778 11.995 10.8403 11.5525 11.1961 11.197C11.3047 11.0881 11.4215 10.9885 11.5449 10.8982ZM5.58556 10.3127C5.58556 10.576 5.40979 10.8072 5.1559 10.8775C5.10434 10.8916 5.05161 10.8986 4.99966 10.8986C4.79772 10.8986 4.60515 10.7939 4.49735 10.6143L3.71068 9.30303V10.3127C3.71068 10.6361 3.4482 10.8986 3.12479 10.8986C2.80137 10.8986 2.53889 10.6361 2.53889 10.3127V7.18794C2.53889 6.92467 2.71466 6.69344 2.96855 6.62313C3.22205 6.55321 3.49156 6.66063 3.6271 6.88639L4.41376 8.19763V7.18794C4.41376 6.86452 4.67624 6.60204 4.99966 6.60204C5.32307 6.60204 5.58556 6.86452 5.58556 7.18794V10.3127ZM8.43692 8.47691C8.76034 8.47691 9.02282 8.73939 9.02282 9.06281C9.02282 9.38622 8.76034 9.64871 8.43692 9.64871H7.77291V10.3127C7.77291 10.6361 7.51042 10.8986 7.18701 10.8986C6.86359 10.8986 6.60111 10.6361 6.60111 10.3127V7.18794C6.60111 6.86452 6.86359 6.60204 7.18701 6.60204H8.43692C8.76034 6.60204 9.02282 6.86452 9.02282 7.18794C9.02282 7.51135 8.76034 7.77383 8.43692 7.77383H7.77291V8.47691H8.43692Z" fill="#ffffff70" />
            <path d="M19.7827 14.4669C19.0146 13.05 19.1472 12.5744 18.598 12.0252C18.0035 11.4307 17.6251 11.6688 16.1876 10.8866C15.6424 10.5897 14.9796 10.59 14.4342 10.8866C13.0356 11.6482 12.6096 11.4399 12.0242 12.0252C11.4299 12.6196 11.6673 12.9991 10.8856 14.4356C10.5889 14.9805 10.5889 15.6437 10.8856 16.1886C11.6489 17.5904 11.4379 18.0127 12.0242 18.599C12.575 19.1487 13.0414 19.0126 14.4659 19.7837C14.9966 20.0709 15.6256 20.0709 16.1564 19.7837C17.5823 19.0107 18.0457 19.1502 18.598 18.599C19.0293 18.1677 18.9942 17.8941 19.3909 16.9706C19.7262 16.1901 20.3223 15.4638 19.7827 14.4669ZM16.9753 15.1014C14.7542 17.3225 15.212 17.2915 13.6469 15.7264C13.0988 15.1783 13.9273 14.3497 14.4755 14.8978L14.9986 15.421L16.1468 14.2728C16.6949 13.7248 17.5235 14.5533 16.9753 15.1014Z" fill="#ffffff70" />
          </svg>
        </div>
      </div>

      <div className='flex flex-col justify-start items-start w-full'>
        <p className='text-[12px] text-white 2xs:text-sm'>Description</p>
        <p className='text-[10px] text-white/50 2xs:text-[12px]'>
          {coin?.description}
        </p>
      </div>

      <div className='flex flex-row justify-between items-center bg-black p-1.5 2xs:p-3 rounded-md 2xs:rounded-xl text-[12px] text-white/70 2xs:text-sm'>
        <div className='flex flex-col justify-center items-center gap-1 border-r-[1px] border-r-white/10 w-full'>
          <p className=''>
            Mcap
          </p>
          <p className='bg-[#1D1D1D] px-2 py-0.5 rounded-md 2xs:rounded-lg text-[#58D764]'>
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
        <div className='flex flex-col justify-center items-center gap-1 border-r-[1px] border-r-white/10 w-full'>
          <p className=''>
            Total Volume
          </p>
          <p className="bg-[#1D1D1D] px-2 py-0.5 rounded-md 2xs:rounded-lg">
            ${coin?.volume != null
              ? (() => {
                const _volume = (coin.volume / 10 ** 9) * solPrice;
                if (_volume >= 1_000_000_000) {
                  return (_volume / 1_000_000_000).toFixed(2) + 'B';
                } else if (_volume >= 1_000_000) {
                  return (_volume / 1_000_000).toFixed(2) + 'M';
                } else if (_volume >= 1_000) {
                  return (_volume / 1_000).toFixed(2) + 'K';
                } else {
                  return _volume.toFixed(2);
                }
              })()
              : 'N/A'}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1 w-full'>
          <p className=''>
            Transactions
          </p>
          <p className='bg-[#1D1D1D] px-2 py-0.5 rounded-md 2xs:rounded-lg'>
            {txDataLength}
          </p>
        </div>
      </div>

      <div className='flex 2xs:flex-row flex-col justify-start items-start 2xs:items-center gap-2.5 2xs:gap-5 pb-2.5 2xs:pb-5 text-[12px] 2xs:text-sm'>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-white/60'>Total Holders:</p>
          <p className='text-white'>{holderLength}</p>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <p className='text-white/60'>Launch date:</p>
          <p className="text-white">
            {coin?.date ? new Date(coin.date).toLocaleDateString('en-US') : "NaN"}
          </p>
        </div>
      </div>
      <div className='flex flex-row justify-start items-center gap-2.5 2xs:gap-5'>
        <div onClick={() => handleToRouter(`/trading/${coin?.token}`)} className='flex flex-col bg-[#784FD8] px-2.5 2xs:px-5 py-1 2xs:py-2 rounded-full text-[13px] text-white 2xs:text-base cursor-pointer'>
          <p>
            View Details
          </p>
        </div>
        <div onClick={() => handleToRouter(`/trading/${coin?.token}`)} className='flex flex-col bg-transparent px-2.5 2xs:px-5 py-1 2xs:py-2 border-[#784FD8] border-[1px] rounded-full text-[#784FD8] text-[13px] 2xs:text-base cursor-pointer'>
          Trade now
        </div>
      </div>
    </div>
  );
};
