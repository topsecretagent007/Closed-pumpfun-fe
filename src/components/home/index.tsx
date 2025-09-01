"use client"
import { FC, useContext, useEffect, useRef, useState } from "react";
import SnoopDoggToken from "./SnoopDoggToken";
import UserContext from "@/context/UserContext";
import { getCoinsInfo, getSolPriceInUSD, test } from "@/utils/util";
import { useSocket } from "@/contexts/SocketContext";
import Tokenomics from "./Tokenomics";
import Moment from "./Moment";
import EarlyAccess from "./EarlyAccess";
import Conversation from "./Conversation";
import CreateTokenBtn from "./CreateTokenBtn";
import ProceedModal from "../modals/ProceedModal";

const HomePage: FC = () => {
  const { setIsLoading, proceedModalState, setSolPrice, setLastToken } = useContext(UserContext);
  const { newToken } = useSocket();

  const getData = () => {
    const fetchData = async () => {
      try {
        const coins = await getCoinsInfo();
        const price = await getSolPriceInUSD();
        if (coins && coins !== null) {
          coins.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setLastToken([coins[0]])
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
    setIsLoading(true);
    getData()
  }, []);

  useEffect(() => {
    getData()
  }, [newToken])

  return (
    <div className="flex flex-col w-full h-full">
      <SnoopDoggToken />
      <Tokenomics />
      <Moment />
      <EarlyAccess />
      <Conversation />
      <CreateTokenBtn />
      {proceedModalState && <ProceedModal />}
    </div >

  );
};
export default HomePage;
