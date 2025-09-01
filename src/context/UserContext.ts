"use client"
import { coinInfo, userInfo } from '@/utils/types';
import { createContext } from 'react';

const UserContext = createContext({
    user: {} as userInfo,
    setUser: (value: userInfo) => { },
    login: false,
    setLogin: (value: boolean) => { },
    isLoading: false,
    setIsLoading: (value: boolean) => { },
    imageUrl: '/*.png',
    setImageUrl: (value: string) => { },
    coinId: "",
    setCoinId: (value: string) => { },
    solPrice: 0,
    setSolPrice: (value: number) => { },
    updateCoin: false,
    setUpdateCoin: (value: boolean) => { },
    proceedModalState: false,
    setProceedModalState: (value: boolean) => { },
    submitModalState: false,
    setSubmitModalState: (value: boolean) => { },
    slipPageModalState: false,
    setSlipPageModalState: (value: boolean) => { },
    launchAuthorityModalState: false,
    setLaunchAuthorityModalState: (value: boolean) => { },
    slippageProm: 100,
    setSlippageProm: (value: number) => { },
    priorityFee: 0,
    setPriorityFee: (value: number) => { },
    tipAmount: 0,
    setTipAmount: (value: number) => { },
    lastToken: [] as coinInfo[],
    setLastToken: (value: coinInfo[]) => { },
})

export default UserContext;