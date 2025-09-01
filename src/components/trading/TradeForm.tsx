import Image from "next/image";
import UserContext from "@/context/UserContext";
import { errorAlert, successAlert, warningAlert } from "../others/ToastGroup";
import { useContext, useEffect, useState } from "react";
import { getTokenBalance, raydiumSwapTx, swapTx } from "@/program/web3";
import { coinInfo } from "@/utils/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useSocket } from "@/contexts/SocketContext";
import SolImg from "@/../public/assets/images/tools/sol.png"
import SnoopImg from "@/../public/assets/images/user/tokenadmin.png"
import { getEarlyAccess, getSolBalance, getTokenPriceAndChange } from "@/utils/util";
import LoadingButton from "../loadings/LoadingButton";

interface TradingFormProps {
  coin: coinInfo;
}

export const TradeForm: React.FC<TradingFormProps> = ({ coin }) => {
  const { counter, } = useSocket();
  const { setSlipPageModalState, user, slippageProm, setIsLoading } = useContext(UserContext)
  const [sol, setSol] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isBuy, setIsBuy] = useState<number>(0);
  const [tokenBal, setTokenBal] = useState<number>(0);
  const [solBal, setSolBal] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [userEarlyState, setUserEarlyState] = useState<boolean>(false)

  const wallet = useWallet();
  const SolList = [
    { id: "0.5", price: "0.5 SOL" },
    { id: "1", price: "1 SOL" },
    { id: "5", price: "5 SOL" },
    { id: "Max", price: "Max SOL" },
  ]

  const setModalState = (e: boolean) => {
    setSlipPageModalState(e)
  }

  const handleBuyInputChange = (val: string) => {
    let value = parseFloat(val);

    if (val === "Max") {
      value = isBuy === 0 ? solBal : tokenBal;
    }

    const k = coin?.lamportReserves * coin?.tokenReserves;

    if (!isNaN(value) && value > 0) {
      if (isBuy === 0) {
        setSol(value.toString());
        const _tokenAmount = k / (coin?.lamportReserves + (value * (10 ^ 9)));
        const changeTokenAmount = (coin?.tokenReserves - _tokenAmount) / (10 ^ 6);
        setToken(changeTokenAmount.toFixed(6).toString());
      } else {
        setToken(value.toString());
        const _solAmount = k / (coin?.tokenReserves + (value * (10 ^ 6)));
        const changeSolAmount = (coin?.lamportReserves - _solAmount) / (10 ^ 9);
        setSol(changeSolAmount.toFixed(4).toString());
      }
    } else {
      setSol('');
      setToken('');
    }
  };

  const getBalance = async () => {
    try {
      const balance = await getTokenBalance(user.wallet, coin.token);
      setTokenBal(balance ? balance : 0);

      const solBalance = await getSolBalance(user.wallet)
      setSolBal(solBalance ? solBalance : 0)
    } catch (error) {
      setTokenBal(0);
    }
  }

  const getPrices = async () => {
    try {
      const _tokenPrice = await getTokenPriceAndChange(coin.token);
      setTokenPrice(typeof _tokenPrice === 'object' && _tokenPrice !== null ? _tokenPrice.price : 0);
    } catch (error) {
      console.error("Error fetching token price:", error);
    }
  }

  const handleTrade = async () => {
    if (!wallet.publicKey) {
      warningAlert("Connect your wallet!");
      return;
    }

    if (isBuy === 0 && (parseFloat(sol) > solBal || parseFloat(sol) <= 0)) {
      warningAlert("Insufficient SOL balance!");
      return;
    }

    if (isBuy === 1 && (parseFloat(token) > tokenBal || parseFloat(token) <= 0)) {
      warningAlert("Insufficient Token balance!");
      return;
    }

    const mint = new PublicKey(coin?.token);
    setLoadingButton(true);

    try {
      const amount = isBuy === 0 ? sol : token;
      console.log("amount", amount)

      let result: any;
      if (coin.bondingCurve == false) {
        result = await swapTx(mint, wallet, amount, isBuy, slippageProm);
        console.log("result", result);

        if (result && (result.txid || result.signature)) {
          const txSignature = result.txid || result.signature;
          successAlert("Swap Successful!");
        } else {
          warningAlert("Swap Failed.");
        }
      } else {
        result = await raydiumSwapTx(mint, wallet, sol, isBuy, slippageProm);
        console.log("result", result);

        if (result && result.tx) {
          successAlert("Swap Successful!");
        } else {
          warningAlert("Swap Failed.");
        }
      }
      setSol('');
      setToken('');
      await getBalance();
    } catch (error) {
      console.error("Trade failed:", error);
      errorAlert("Trade failed: " + (error.message || "Unknown error"));
    } finally {
      setLoadingButton(false);
    }
  };

  const getUserEarlyAccess = async () => {
    const getCurrentDate = new Date().getTime();
    const tokenCreateDate = new Date(coin?.date).getTime();
    const timeDifference = getCurrentDate - tokenCreateDate;
    const remainingTime = 900000 - timeDifference; // time left until 15 min is passed
    console.log("timeDifference", timeDifference);

    if (timeDifference < 900000) {
      const userEarlyAccess = await getEarlyAccess(user.wallet);
      console.log("userEarlyAccess", userEarlyAccess);

      if (!userEarlyAccess) {
        setUserEarlyState(false);
        warningAlert("You missed the early access slot. Please try again after 15 minutes!");
        setLoadingButton(false);

        // Set userEarlyState to true automatically after the 15-minute window
        setTimeout(() => {
          setUserEarlyState(true);
          console.log("Early access window has passed. User can now try again.");
        }, remainingTime);

        return;
      }

      setUserEarlyState(true);
    } else {
      // Already past 15 minutes — allow access
      setUserEarlyState(true);
    }
  };

  useEffect(() => {
    if (!coin || !user?.wallet) return;
    getUserEarlyAccess()
    getBalance();
    getPrices();
    setIsLoading(false)
  }, [coin, user.wallet]);

  return (
    <>
      <div className="flex flex-col gap-3 bg-[#0E0E0E] px-3 py-3 rounded-lg font-semibold text-white">
        <div className="flex flex-row justify-between items-center mb-3 py-2 border-b-[1px] border-b-white/10">
          <button className={`rounded-full py-2 md:py-3 w-[100px] md:w-[136px] text-base ${isBuy === 0 ? 'bg-[#58D764] text-black/80' : 'bg-transparent hover:bg-[#58D764]/30 text-white/70 border-[1px] border-white/10'}`
          } onClick={() => setIsBuy(0)}> Buy</button >
          <button className={`rounded-full py-2 md:py-3 w-[100px] md:w-[136px] text-base ${isBuy === 1 ? 'bg-[#EF4444] text-white' : 'bg-transparent text-white/70 hover:bg-[#EF4444]/30 border-[1px] border-white/10'}`} onClick={() => setIsBuy(1)}>
            Sell
          </button>
        </div >
        <div className="relative flex flex-col gap-3 bg-[#1D1D1D] p-3 rounded-xl">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="flex flex-col text-white/40 text-sm">
              Quick Buy With
            </p>
            <div
              onClick={() => setModalState(true)}
              className="flex flex-col bg-black px-5 py-1 rounded-full text-[12px] text-white/40 cursor-pointer"
            >
              Slippage
            </div>
          </div>

          <div className="flex flex-row items-center bg-[#0E0E0E] border-[1px] border-white/10 rounded-lg w-full">
            <div className="flex flex-row justify-between items-center gap-2 p-3 text-white text-center">
              {isBuy === 0 ?
                <div className="flex flex-row justify-center items-center bg-black rounded-full w-6 h-6">
                  <Image src={SolImg} alt="SolImg" width={12} height={12} className="w-3 h-3" />
                </div>
                :
                <Image src={coin?.url ? coin?.url : SnoopImg} alt="SnoopImg" width={24} height={24} className="rounded-full w-6 h-6" />
              }
              <p className="text-white text-sm">
                {isBuy === 0 ? 'SOL' : `${coin?.ticker ? coin?.ticker : "Token"}`}
              </p>
            </div>
            <input
              type="number"
              id="setTrade"
              value={!isBuy ? sol : token}
              onChange={(e) => handleBuyInputChange(e.target.value)}
              pattern="\d*"
              className="bg-transparent p-2.5 rounded-l-md outline-none w-full text-white text-end capitalize"
              placeholder="0"
              required
              min={0}
            />
          </div>

          <div className="flex flex-row items-center bg-[#0E0E0E] border-[1px] border-white/10 rounded-lg w-full">
            <div className="flex flex-row justify-between items-center gap-2 p-3 text-white text-center">
              {isBuy === 1 ?
                <div className="flex flex-row justify-center items-center bg-black rounded-full w-6 h-6">
                  <Image src={SolImg} alt="SolImg" width={12} height={12} className="w-3 h-3" />
                </div>
                :
                <Image src={coin?.url ? coin?.url : SnoopImg} alt="SnoopImg" width={24} height={24} className="rounded-full w-6 h-6" />
              }
              <p className="text-white text-sm">
                {isBuy === 1 ? 'SOL' : `${coin?.ticker ? coin?.ticker : "Token"}`}
              </p>
            </div>
            <input
              type="number"
              id="setTrade"
              value={isBuy ? sol : token}
              disabled={true}
              pattern="\d*"
              className="bg-transparent p-2.5 rounded-l-md outline-none w-full text-white text-end capitalize"
              placeholder="0"
              required
            />
          </div>

          {
            isBuy === 0 ? (
              <div className="flex xs:flex-row flex-wrap gap-1 2xs:gap-2 mx-auto xs:mx-0 py-2 text-center">
                {SolList.map((item: any, index: any) => {
                  return (
                    <div key={index} className="hover:bg-white/30 px-2 py-1 border-[1px] border-white/10 hover:border-white/50 rounded-lg text-[12px] text-white/70 hover:text-white cursor-pointer" onClick={() => handleBuyInputChange(item.id)}>{item.price}</div>
                  )
                })}
              </div>
            ) : (
              <div className="flex xs:flex-row flex-wrap gap-1 2xs:gap-2 xs:mx-0 py-2 text-center">
                <button className="hover:bg-white/30 px-2 py-1 border-[1px] border-white/10 hover:border-white/50 rounded-lg max-w-[100px] text-[12px] text-white/70 hover:text-white cursor-pointer" onClick={() => handleBuyInputChange((tokenBal / 10).toFixed(4).toString())}>10%</button>
                <button className="hover:bg-white/30 px-2 py-1 border-[1px] border-white/10 hover:border-white/50 rounded-lg max-w-[100px] text-[12px] text-white/70 hover:text-white cursor-pointer" onClick={() => handleBuyInputChange((tokenBal / 4).toFixed(4).toString())}>25%</button>
                <button className="hover:bg-white/30 px-2 py-1 border-[1px] border-white/10 hover:border-white/50 rounded-lg max-w-[100px] text-[12px] text-white/70 hover:text-white cursor-pointer" onClick={() => handleBuyInputChange((tokenBal / 2).toFixed(4).toString())}>50%</button>
                <button className="hover:bg-white/30 px-2 py-1 border-[1px] border-white/10 hover:border-white/50 rounded-lg max-w-[100px] text-[12px] text-white/70 hover:text-white cursor-pointer" onClick={() => handleBuyInputChange((tokenBal).toFixed(4).toString())}>100%</button>
              </div>
            )}

        </div>

        {loadingButton ?
          <button
            className={`${(isBuy === 0 ? sol : token) === '0' || (isBuy === 0 ? !sol : !token) ? "bg-gray-500 cursor-not-allowed" : (isBuy === 0 ? "bg-[#58D764]" : "bg-[#EF4444]")} text-black/80 cursor-pointer w-full text-center rounded-full py-3`}
          >
            <LoadingButton />
          </button>
          :
          <button
            className={`${(isBuy === 0 ? sol : token) === '0' || (isBuy === 0 ? !sol : !token) || !userEarlyState ? "bg-gray-500 cursor-not-allowed" : (isBuy === 0 ? "bg-[#58D764]" : "bg-[#EF4444]")} text-black/80 cursor-pointer w-full text-center rounded-full py-3`}
            onClick={handleTrade}
            disabled={(isBuy === 0 ? sol : token) === '0' || (isBuy === 0 ? !sol : !token) || !userEarlyState}
          >
            Execute Trade
          </button>
        }

        <p className="text-[12px] text-white/60 text-center">
          Priority fee: 0.002 SOL
        </p>
      </div >
    </>

  );
};
