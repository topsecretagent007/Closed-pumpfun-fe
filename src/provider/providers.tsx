"use client";
import React, { ReactNode, useState } from "react";
import { PageProvider } from "@/contexts/PageContext";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "@/contexts/ModalProvider";
import UserContext from "@/context/UserContext";
import { coinInfo, userInfo } from "@/utils/types";
import "dotenv/config.js";
import SocketProvider from "@/contexts/SocketContext";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userInfo>({} as userInfo);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('/*.png');
  const [coinId, setCoinId] = useState<string>('');
  const [solPrice, setSolPrice] = useState<number>(0);
  const [updateCoin, setUpdateCoin] = useState<boolean>(false);
  const [proceedModalState, setProceedModalState] = useState<boolean>(false);
  const [submitModalState, setSubmitModalState] = useState<boolean>(false);
  const [slipPageModalState, setSlipPageModalState] = useState<boolean>(false);
  const [launchAuthorityModalState, setLaunchAuthorityModalState] = useState<boolean>(false)
  const [slippageProm, setSlippageProm] = useState<number>(100)
  const [priorityFee, setPriorityFee] = useState<number>(0)
  const [tipAmount, setTipAmount] = useState<number>(0)
  const [lastToken, setLastToken] = useState<coinInfo[]>([])

  return (
    <SolanaWalletProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <PageProvider>
            <UserContext.Provider
              value={{
                solPrice,
                setSolPrice,
                coinId,
                setCoinId,
                imageUrl,
                setImageUrl,
                user,
                setUser,
                login,
                setLogin,
                isLoading,
                setIsLoading,
                updateCoin,
                setUpdateCoin,
                proceedModalState,
                setProceedModalState,
                submitModalState,
                setSubmitModalState,
                slipPageModalState,
                setSlipPageModalState,
                launchAuthorityModalState,
                setLaunchAuthorityModalState,
                slippageProm,
                setSlippageProm,
                priorityFee,
                setPriorityFee,
                tipAmount,
                setTipAmount,
                lastToken,
                setLastToken,
              }}
            >
              <SocketProvider>
                {children}
              </SocketProvider>
              <ToastContainer pauseOnFocusLoss={false} theme="colored" />
            </UserContext.Provider>
          </PageProvider>
        </ModalProvider>
      </QueryClientProvider>
    </SolanaWalletProvider>
  );
}
