import { ComputeBudgetProgram, Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { Pumpfun } from './pumpfun';
import idl from "./pumpfun.json"
import * as anchor from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { errorAlert } from '@/components/others/ToastGroup';
import { Program } from '@coral-xyz/anchor';
import { PoolKeys } from './getPoolkeys';
import { SEED_CONFIG } from './seed';
import { launchDataInfo } from '@/utils/types';
import axios from 'axios';
import { NATIVE_MINT } from '@solana/spl-token';
import { rayBuyTx, raySellTx } from './raydiumSwap';
import { BACKEND_URL, BACKEND_WALLET, SOLANA_RPC } from '@/config/TextData';

export const commitmentLevel = "processed";

export const endpoint = SOLANA_RPC || clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);
export const pumpProgramId = new PublicKey(idl.address);
export const pumpProgramInterface = JSON.parse(JSON.stringify(idl));

export const backendWallet = new PublicKey(BACKEND_WALLET!);


// Send Fee to the Fee destination
export const createToken = async (wallet: WalletContextState, coinData: launchDataInfo) => {

  const provider = new anchor.AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" })
  anchor.setProvider(provider);
  const program = new Program(
    pumpProgramInterface,
    provider
  ) as Program<Pumpfun>;

  // check the connection
  if (!wallet.publicKey || !connection) {
    errorAlert("Wallet Not Connected");
    console.log("Warning: Wallet not connected");
    return "WalletError";
  }

  try {
    const backendTokenAddress = await axios.get(`${BACKEND_URL!}/tokenAddress/`);
    if (!backendTokenAddress.data.address.address || !backendTokenAddress.data.address.key) {
      errorAlert("Token address not found");
      return;
    }
    const keyString = backendTokenAddress.data.address.key;
    const keyArray = keyString.split(',').map(Number);
    const mintKp = Keypair.fromSecretKey(Uint8Array.from(keyArray));
    const transaction = new Transaction()
    const updateCpIx = ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 });
    const updateCuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 });
    const [configPda, _] = PublicKey.findProgramAddressSync(
      [Buffer.from(SEED_CONFIG)],
      program.programId
    );

    const configAccount = await program.account.config.fetch(configPda);
    console.log("configAccount ===> ", configAccount);


    const createIx = await program.methods
      .launch(
        coinData.name,
        coinData.symbol,
        coinData.uri,
      )
      .accounts({
        creator: wallet.publicKey,
        token: mintKp.publicKey,
        teamWallet: configAccount.teamWallet,
        backendWallet: backendWallet
      })
      .instruction();

    transaction.add(updateCpIx, updateCuIx, createIx);


    transaction.feePayer = wallet.publicKey;
    const blockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;
    transaction.sign(mintKp);
    console.log("transaction ===> ", transaction);

    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(transaction);
      const bufTx = Buffer.from(signedTx.serialize({ requireAllSignatures: false })).toString('base64');
      console.log("bufTx ===> ", bufTx);

      try {
        const response = await axios.post(`${BACKEND_URL!}/launch/`, { owner: wallet.publicKey.toBase58(), tx: bufTx });
        return response.data;
      } catch (err) {
        console.log('Backend transaction confirming error ===> ', err);
      }
    }
  } catch (error) {
    errorAlert("Sorry, the token launch failed")
    return false;
  }
};

// Swap transaction
export const swapTx = async (mint: PublicKey, wallet: WalletContextState, amount: string, type: number, slippageAmount: number): Promise<any> => {
  // check the connection
  if (!wallet.publicKey || !connection) {
    console.log("Warning: Wallet not connected");
    return;
  }

  const provider = new anchor.AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" })
  anchor.setProvider(provider);
  const program = new Program(
    pumpProgramInterface,
    provider
  ) as Program<Pumpfun>;

  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from(SEED_CONFIG)],
    program.programId
  );


  const configAccount = await program.account.config.fetch(configPda);
  try {
    const transaction = new Transaction()
    const cpIx = ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 });
    const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 });


    let _decimal = type == 0 ? 9 : 6;
    const _slippageAmount = type == 0 ? (1 - slippageAmount / 100) * (parseFloat(amount) * Math.pow(10, _decimal)) : 0
    const swapIx = await program.methods.swap(
      new anchor.BN(parseFloat(amount) * Math.pow(10, _decimal)),
      type,
      new anchor.BN(_slippageAmount),
    )
      .accounts({
        user: wallet.publicKey,
        tokenMint: mint,
        teamWallet: configAccount?.teamWallet,
        backendWallet: backendWallet,
      })
      .instruction()

    transaction.add(swapIx)
    transaction.add(cpIx, cuIx)
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(transaction);

      const bufTx = Buffer.from(signedTx.serialize({ requireAllSignatures: false })).toString('base64');

      try {
        const response = await axios.post(`${BACKEND_URL!}/swap/`, { wallet: wallet.publicKey.toBase58(), tokenAddress: mint.toBase58(), tx: bufTx });
        return response.data;
      } catch (err) {
        console.log('Backend transaction confirming error ===> ', err);
      }
    }

  } catch (error) {
    errorAlert(`The operation was unsuccessful.`);
  }
};

//Raydium Swap transaction
export const raydiumSwapTx = async (
  mint: PublicKey,
  wallet: WalletContextState,
  amount: string,
  type: number,
  slippage: number) => {
  // check the connection
  if (!wallet.publicKey || !connection) {
    console.log("plz connect wallet")
    return;
  };
  try {
    const poolKeys = await PoolKeys.fetchPoolKeyInfo(connection, mint, NATIVE_MINT)
    const poolId = poolKeys.id
    let swapTx: any;
    if (type == 0) {
      swapTx = await rayBuyTx(connection, mint, parseFloat(amount), wallet, poolId, slippage)
    } else {
      swapTx = await raySellTx(connection, mint, amount, wallet, poolId, slippage)
    }
    if (swapTx == null) {
      console.log("SwapTx null");
      return null;
    }

    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(swapTx);
      const sTx = signedTx.serialize();
      const signature = await connection.sendRawTransaction(sTx, {
        preflightCommitment: "confirmed",
        skipPreflight: false,
      });

      const blockhash = await connection.getLatestBlockhash();
      const res = await connection.confirmTransaction(
        {
          signature,
          blockhash: blockhash.blockhash,
          lastValidBlockHeight: blockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

      return { res: res, tx: signature };
    }
  } catch (error) {
    console.log("Error in swap transaction", error);
    errorAlert(`The operation was unsuccessful.`);
  }
}

export const getTokenBalance = async (walletAddress: string, tokenMintAddress: string) => {
  const wallet = new PublicKey(walletAddress);
  const tokenMint = new PublicKey(tokenMintAddress);

  // Fetch the token account details
  const response = await connection.getTokenAccountsByOwner(wallet, {
    mint: tokenMint
  });

  if (response.value.length == 0) {
    console.log('No token account found for the specified mint address.');
    return;
  }

  // Get the balance  
  const tokenAccountInfo = await connection.getTokenAccountBalance(response.value[0].pubkey);

  // Convert the balance from integer to decimal format

  return tokenAccountInfo.value.uiAmount;
};
