import { getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { Connection, PublicKey } from "@solana/web3.js"
import { getBuyTx, getSellTx } from "./swapOnlyAmm"

export const rayBuyTx = async (solanaConnection: Connection, baseMint: PublicKey, buyAmount: number, wallet: WalletContextState, poolId: PublicKey, slippage: number) => {
  let solBalance: number = 0

  try {
    solBalance = await solanaConnection.getBalance(wallet.publicKey)
  } catch (error) {
    throw new Error("error")
  }
  if (solBalance == 0) {
    throw new Error("error")
  }
  try {
    const tx = await getBuyTx(solanaConnection, wallet, baseMint, NATIVE_MINT, buyAmount, poolId.toBase58(), slippage)
    if (tx == null) {
      throw new Error("error")
    }
    return tx;
  } catch (error) {
    throw new Error("error")
  }
}

export const raySellTx = async (solanaConnection: Connection, baseMint: PublicKey, amount: string, wallet: WalletContextState, poolId: PublicKey, slippage: number) => {
  try {

    const tokenAta = await getAssociatedTokenAddress(baseMint, wallet.publicKey)

    const tokenBalInfo = await solanaConnection.getTokenAccountBalance(tokenAta)

    if (!tokenBalInfo) {
      throw new Error("error")
    }
    if (amount > tokenBalInfo.value.amount) {
      throw new Error("error")
    }
    try {
      const sellTx = await getSellTx(solanaConnection, wallet, baseMint, NATIVE_MINT, amount, poolId.toBase58(), slippage)
      if (sellTx == null) {
        throw new Error("error")
      }
      return sellTx;
    } catch (error) {
      throw new Error("error")
    }
  } catch (error) {
    // throw new Error("error")
    console.log("Error happened while selling")
  }
}

