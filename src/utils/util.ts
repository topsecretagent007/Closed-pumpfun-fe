import axios, { AxiosRequestConfig } from 'axios';
import { coinInfo, holderInfo, userInfo } from './types';
import { BACKEND_URL, BIRDEYE_KEY, BIRDEYE_URL, COINGECKO_URL, DEPOSIT_AMOUNT, DEPOSIT_WALLET, PINATA_IMG_URL, PINATA_IPFS_URL } from '@/config/TextData';
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Transaction, SystemProgram } from "@solana/web3.js";
import { WalletContextState } from '@solana/wallet-adapter-react';
import { pumpProgramId, pumpProgramInterface } from '@/program/web3';
import { Program } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { Pumpfun } from '@/program/pumpfun';
import { SOLANA_RPC, NETWORK } from '@/config/TextData';


const headers: Record<string, string> = {
  'ngrok-skip-browser-warning': 'true'
};

const config: AxiosRequestConfig = {
  headers
};

const connection = NETWORK === 'devnet' ? new Connection(clusterApiUrl("devnet"), "confirmed") : new Connection("https://api.mainnet-beta.solana.com");

export const test = async () => {
  const res = await fetch(`${BACKEND_URL}`);
  const data = await res.json();
};

export const getUser = async ({ id }: { id: string }): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/${id}`, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const updateUser = async (id: string, data: userInfo): Promise<any> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/update/${id}`, data, config);

    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/register`, data);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/confirm`, data, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const launchAuthority = async (wallet: string): Promise<any> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/launch/getAuthority`, { wallet: wallet });
    return response.data.success;
  } catch (err) {
    return false;
  }
};

export const saveEarlyAccess = async (wallet: string): Promise<any> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/swap/saveAccess`, { wallet: wallet });
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request', err };
  }
}

export const getEarlyAccess = async (wallet: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/swap/getAccess/${wallet}`);
    return response.data.success;
  } catch (err) {
    return false;
  }
}

export const getCoinsInfo = async (): Promise<coinInfo[]> => {
  try {
    const res = await axios.get(`${BACKEND_URL}/coin`, config);
    return res.data;
  } catch (error) {
    console.error('Error fetching coin info:', error);
  }
};

export const getCoinsInfoBy = async (id: string): Promise<coinInfo[]> => {
  const res = await axios.get<coinInfo[]>(`${BACKEND_URL}/coin/user/${id}`, config);
  return res.data;
};

export const getCoinInfo = async (data: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/coin/${data}`);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const getUserInfo = async (data: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/${data}`, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const getCoinTrade = async (data: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cointrade/${data}`);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

// ================== Get Holders ===========================
export const findHolders = async (mint: string) => {
  let page = 1;
  let allOwners: holderInfo[] = [];

  while (true) {
    const response = await fetch(
      SOLANA_RPC!,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getTokenAccounts',
          id: 'helius-test',
          params: {
            page,
            limit: 1000,
            displayOptions: {},
            mint,
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.result || data.result.token_accounts.length === 0) break;

    // Add this logic to compute total amount
    const totalAmount = data.result.token_accounts.reduce(
      (acc, account) => acc + Number(account.amount),
      0
    );

    data.result.token_accounts.forEach((account) => {
      const amount = Number(account.amount);
      const percentage = ((amount / totalAmount) * 100).toFixed(2); // 2 decimal places

      allOwners.push({
        slice: account.owner.slice(0, 3) + `...` + account.owner.slice(-4),
        owner: account.owner,
        amount: Number(account.amount), // Ensure amount is a number
        account: account.account,
        percentage: Number(percentage), // Ensure percentage is a number
      });
    });

    page++;
  }

  return allOwners;
};

export const getCuverData = async (mint: string, wallet: WalletContextState) => {
  const mintPublicKey = new PublicKey(mint);
  const provider = new anchor.AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" })

  const [bondingCurvePda, _] = PublicKey.findProgramAddressSync(
    [Buffer.from("bonding_curve"), mintPublicKey.toBytes()],
    pumpProgramId
  );
  console.log("bonding curve PDA:", bondingCurvePda.toString());
  const program = new Program(
    pumpProgramInterface,
    provider
  ) as Program<Pumpfun>;

  const tokenAtaData = await getTokenAtaBeforeMigration(program.programId)
  return tokenAtaData;
}

export const getTokenAtaBeforeMigration = async (programId: PublicKey) => {

  const globalVault = PublicKey.findProgramAddressSync(
    [Buffer.from("global")],
    programId
  )[0]
  return globalVault
}

export const getTokenMarketData = async (mint: string) => {
  const res = await fetch(`${BIRDEYE_URL}/public/token/${mint}`, {
    headers: {
      "X-API-KEY": BIRDEYE_KEY! || "", // Use .env or paste API key here
    },
  });

  const data = await res.json();

  if (!data?.data) throw new Error("Invalid token or response");

  return {
    price: data.data.price, // USD
    liquidity: data.data.liquidity, // USD
    liquidityChange24h: data.data.liquidity_change_24h, // %
  };
};

export const getSolBalance = async (walletAddress: string): Promise<number> => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL; // Convert from lamports to SOL
  } catch (error) {
    console.error("Failed to fetch SOL balance:", error);
    return 0;
  }
}

export const getSolPriceInUSD = async () => {
  try {
    // Fetch the price data from CoinGecko
    const response = await axios.get(`${COINGECKO_URL}`);
    const solPriceInUSD = response.data.solana.usd;
    return solPriceInUSD;
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    throw error;
  }
};

export const getTokenPriceAndChange = async (address) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-API-KEY': BIRDEYE_KEY!
      }
    };
    await sleep(70)
    // Fetch the token price
    const response = await fetch(`${BIRDEYE_URL}/defi/price?address=${address}`, options);
    // Check if the response is ok
    if (!response.ok) {
      console.error("Error fetching token price: ", response.statusText);
      return 0; // Return 0 if the fetch fails
    }
    const data = await response.json();
    console.log("birdeye data ===> ", data.data)
    // Check for the expected structure and return the price
    if (data && data.data && typeof data.data.value === 'number') {
      return { price: data.data.value, changeIn24h: data.data.priceChange24h, liquidity: data.data.liquidity }; // Return the price as a number
    } else {
      console.error("Unexpected response structure:", data);
      return { price: 1, changeIn24h: 0, liquidity: 10000 }; // Return 0 if the structure is not as expected
    }
  } catch (error) {
    console.error("Error fetching token price:", error);
    return { price: 1, changeIn24h: 0, liquidity: 10000 }; // Return 0 on any other error
  }
}

export const uploadImage = async (url: string) => {
  const res = await fetch(url);
  console.log(res.blob);
  const blob = await res.blob();

  const imageFile = new File([blob], "image.png", { type: "image/png" });
  const resData = await pinFileToIPFS(imageFile);
  if (resData) {
    return `${PINATA_IMG_URL}/ipfs/${resData.IpfsHash}`;
  } else {
    return false;
  }
};

const JWT = process.env.NEXT_PUBLIC_PINATA_PRIVATE_KEY;

export const pinFileToIPFS = async (blob: File) => {
  try {
    const data = new FormData();
    data.append("file", blob);
    const res = await fetch(`${PINATA_IPFS_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
  }
};

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const treasuryWallet: PublicKey = new PublicKey(DEPOSIT_WALLET);
const depositAmount = DEPOSIT_AMOUNT ? Number(DEPOSIT_AMOUNT) : 0.01;

export const depositSol = async (wallet: WalletContextState) => {
  try {
    const depositAmountInLamports = depositAmount * Math.pow(10, 9);
    const tx = new Transaction();

    tx.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey, // Source wallet
        toPubkey: treasuryWallet,     // Treasury wallet (destination)
        lamports: depositAmountInLamports, // Amount in lamports (1 SOL = 1e9 lamports)
      })
    );

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = wallet.publicKey;

    if (!wallet || !wallet.publicKey || !wallet.signTransaction) return null;

    // Sign the transaction
    const signedTx = await wallet.signTransaction(tx);
    // Send the transaction
    const signature = await connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
    });
    const getAccess = await performTx(wallet.publicKey.toString(), signature)
    return getAccess;
  } catch (error) {
    console.error("Error during deposit:", error);
    return error;
  }
}

export const performTx = async (wallet: string, signature: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/swap/purchase`, { wallet: wallet, tx: signature });
    return response.data;
  } catch (error) {
    console.error("Error performTx:", error);
    return error;
  }
}

export const earlyTime = async (wallet: WalletContextState) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/swap/purchasable`, { wallet: wallet.publicKey.toString() });
    console.log("earlyTime response ==>", response)
    return response;
  } catch (error: any) {
    console.error("Error earlyTime:", error.response.data);
    return error.response;
  }
}
