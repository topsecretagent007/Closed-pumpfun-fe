"use client"

import Head from "next/head";
import { useEffect, useState } from "react";
import { coinInfo } from "@/utils/types";
import { Connection, PublicKey } from "@solana/web3.js";
import { commitmentLevel, endpoint } from "@/program/web3";
import { NATIVE_MINT } from "@solana/spl-token";
import { PoolKeys } from "@/program/getPoolkeys";
import { cluster } from "@/utils/constants";

interface TradingChartProps {
    param: coinInfo;
}

export const CoinGeckoChart: React.FC<TradingChartProps> = ({ param }) => {
    const [poolId, setPoolId] = useState<string>("");
    const connection = new Connection(endpoint, {
        commitment: commitmentLevel,
        wsEndpoint: process.env.NEXT_PUBLIC_SOLANA_WS,
    })
    
    useEffect(() => {
        getInfo()
    }, [param]);

    const getInfo = async () => {
        if (cluster == "devnet") setPoolId("APyQX9Q3FwHkxNvSa7vT8iB4AGm38iaMkiAcpSNbVyZY")
        else {
            try {
                const poolKeys = await PoolKeys.fetchPoolKeyInfo(connection, new PublicKey(param.token), NATIVE_MINT)
                setPoolId(poolKeys.id.toString())
            } catch (error) {
                setPoolId("APyQX9Q3FwHkxNvSa7vT8iB4AGm38iaMkiAcpSNbVyZY")
            }
        }
    }
    return (
        <>
            <Head>
                <title>Sample Demo TradingView with NextJS</title>
            </Head>
            <iframe
                height="500px"
                width="100%"
                id="geckoterminal-embed"
                title="GeckoTerminal Embed"
                src={`https://www.geckoterminal.com/solana/pools/${poolId}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`}
                frameBorder="0"
                allow="clipboard-write; fullscreen"
                allowFullScreen
                style={{ border: 'none' }}
            />
        </>
    );
};
