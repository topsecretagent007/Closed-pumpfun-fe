"use client";
import { FC, useContext, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { successAlert, errorAlert } from "@/components/others/ToastGroup";
import base58 from "bs58";
import UserContext from "@/context/UserContext";
import { confirmWallet, getSolPriceInUSD, walletConnect } from "@/utils/util";
import { userInfo } from "@/utils/types";
import { RiExchangeDollarLine } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaWallet } from "react-icons/fa";
import UserAvatar from "@/../public/assets/images/user-avatar.png";

export const ConnectButton: FC = () => {
  const { user, setUser, login, setLogin, setIsLoading, isLoading, setSolPrice } = useContext(UserContext);
  const { publicKey, disconnect, signMessage } = useWallet();
  const { setVisible } = useWalletModal();
  // const tempUser = useMemo(() => user, [user]);

  useEffect(() => {
    const handleWalletConnect = async () => {
      // Check if publicKey exists and login is false
      if (publicKey && !login) {
        const updatedUser: userInfo = {
          name: publicKey.toBase58().slice(0, 6),
          wallet: publicKey.toBase58(),
          isLedger: false,
        };
        await sign(updatedUser);
      }
    };
    // Only call handleWalletConnect when publicKey or login changes
    if (publicKey) {
      handleWalletConnect();
    }
  }, [publicKey]);

  const sign = async (updatedUser: userInfo) => {
    try {
      // Check if walletConnect is already in progress or user is already logged in
      if (login) return;
      const connection = await walletConnect({ data: updatedUser });

      if (!connection) return;
      if (connection.nonce === undefined) {
        const newUser = {
          name: connection.name,
          wallet: connection.wallet,
          _id: connection._id,
          avatar: connection.avatar,
        };
        setUser(newUser as userInfo);
        setLogin(true);
        return;
      }

      const msg = new TextEncoder().encode(`agentland ${connection.nonce}`);
      const sig = await signMessage?.(msg);
      const res = base58.encode(sig as Uint8Array);
      const signedWallet = { ...connection, signature: res };
      const confirm = await confirmWallet({ data: signedWallet });

      if (confirm) {
        setUser(confirm);
        setLogin(true);
        setIsLoading(false);
      }
      successAlert("Message signed.");
    } catch (error) {
      errorAlert("Sign-in failed.");
    }
  };

  const logOut = async () => {
    if (typeof disconnect === "function") {
      await disconnect();
    }
    setUser({} as userInfo);
    setLogin(false);
    localStorage.clear();
  };

  const getSolPrice = async () => {
    const currentSolPrice = await getSolPriceInUSD();
    if (currentSolPrice) {
      setSolPrice(currentSolPrice);
    }
  }

  useEffect(() => {
    getSolPrice();
  }, [])

  return (
    <div>
      <button
        className={`${!isLoading ? "z-40 " : "z-40 "} group relative flex flex-row justify-end items-center gap-1 bg-[#784FD8] p-2 xs:px-4 xs:py-1 md:py-2 rounded-full text-white`}
      >
        {login && publicKey ? (
          <>
            <div className="flex justify-center items-center gap-1 xs:gap-2 xs:text-[16px] lg:text-md text-sm">
              <Image
                src={
                  user.avatar !==
                    "https://scarlet-extra-cat-880.mypinata.cloud/" &&
                    user.avatar !== "" &&
                    user.avatar !== undefined &&
                    user.avatar !== null &&
                    user.avatar
                    ? user.avatar
                    : UserAvatar
                }
                alt="Token IMG"
                className="border-[1px] border-whihte rounded-full w-[20px] xs:w-[35px] h-[20px] xs:h-[35px] object-cover overflow-hidden"
                width={35}
                height={35}
              />
              {user && user?.name ? (
                <div className="xs:w-[92px] object-cover overflow-hidden text-white truncate">
                  {user.name}
                </div>
              ) : (
                <div className="text-white">
                  {publicKey.toBase58().slice(0, 4)}....
                  {publicKey.toBase58().slice(-4)}
                </div>
              )}
            </div>
            <div className="hidden group-hover:block right-0 -bottom-[96px] absolute px-0 py-2 rounded-lg w-full">
              <ul className="bg-black bg-none border-[0.75px] border-white/30 rounded-lg object-cover overflow-hidden text-white">
                <li>
                  <div
                    className="flex flex-row items-center gap-1 hover:bg-[#784FD8]/10 mb-1 px-2 xs:px-4 py-2 text-[12px] text-primary-100 xs:text-[16px]"
                    onClick={() => setVisible(true)}
                  >
                    <RiExchangeDollarLine className="hidden xs:flex" />
                    Change Wallet
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center gap-1 hover:bg-[#784FD8]/10 px-2 xs:px-4 py-2 text-[12px] text-primary-100 xs:text-[16px]"
                    onClick={logOut}
                  >
                    <VscDebugDisconnect className="hidden xs:flex" />
                    Disconnect
                  </div>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div
            className="flex flex-row justify-center items-center gap-2 text-[#fff]"
            onClick={() => setVisible(true)}
          >
            <span className="xs:hidden flex">
              <FaWallet />
            </span>
            <span className="hidden xs:flex">Connect Wallet</span>
          </div>
        )}
      </button>
    </div>
  );
};
