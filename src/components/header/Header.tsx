"use client";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import UserContext from "@/context/UserContext";
import Image from "next/image";
import Logo from "@/../public/assets/logo-light.png";
import { ConnectButton } from "../buttons/ConnectButton";
import { MenuList } from "@/config/TextData";
import TopBgImg from "@/../public/assets/images/tools/topbg.png"
import { useWallet } from "@solana/wallet-adapter-react";
import { warningAlert } from "../others/ToastGroup";
import { launchAuthority } from "@/utils/util";
import Spinner from "../loadings/Spinner";

const Header: FC = () => {
  const { isLoading, setIsLoading, lastToken } = useContext(UserContext);
  const { publicKey } = useWallet();
  const pathname = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<string>("home");
  const [menuState, setMenuState] = useState<boolean>(false);
  const menuDropdown = useRef<HTMLDivElement | null>(null);

  const goToPage = async (path: string) => {
    setIsLoading(true);

    const requiresAuth = path === "/create-coin";
    const isTrading = path === "/trading";

    if (requiresAuth) {
      if (!publicKey) {
        warningAlert("Connect your wallet!");
        return setIsLoading(false);
      }
      const hasAuthority = await launchAuthority(publicKey.toBase58());
      if (!hasAuthority) {
        warningAlert("You need to get launch authority before token launch.");
        return setIsLoading(false);
      }
    }

    setCurrentPage(path);
    setMenuState(false);

    if (isTrading) {
      const token = lastToken[0]?.token;
      router.push(`/trading/${token}`);
    } else {
      router.push(path);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuDropdown.current &&
        !menuDropdown.current.contains(event.target as Node)
      ) {
        setMenuState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuDropdown]);

  return (
    <div className={`z-40 flex flex-col justify-center items-center border-b-[#fff]/10 border-b-[1px] w-full h-[100px]`}>
      <Image
        src={TopBgImg}
        alt="TopBgImg"
        blurDataURL="/assets/images/tools/topbg.png"
        className="top-0 left-0 absolute flex flex-col gb-blur-image"
      />
      <div className="container">
        <div
          ref={menuDropdown}
          className="flex flex-row justify-between items-center px-5 w-full h-full"
        >
          <div className="flex flex-col items-center gap-8">
            <Image
              src={Logo}
              alt="Logo"
              onClick={() => goToPage("/")}
              className="z-10 flex flex-col justify-center items-center w-24 2xs:w-32 xs:w-40 cursor-pointer"
            />
          </div>

          <div className="hidden z-10 md:flex flex-row justify-between items-center gap-8 text-white text-base">
            {MenuList.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => goToPage(item.path)}
                  className={` ${item.path === currentPage ? " text-[#784FD8] cursor-pointer" : "text-white cursor-pointer hover:text-[#784fd8]"} py-1 cursor-pointer`}
                >
                  {item.text}
                </div>
              );
            })}
          </div>

          <div className="flex flex-row items-center gap-4">
            <div
              onClick={() => setMenuState(true)}
              className="md:hidden relative flex flex-col justify-center items-center p-2 border border-[#784FD8] rounded-full text-[#784FD8] cursor-pointer"
            >
              <IoMenu />
              <div
                className={`${menuState
                  ? "h-[165px] w-[180px] opacity-100"
                  : "h-[0px] w-0 opacity-0"
                  } flex flex-col border-[1px] border-white/30 rounded-lg absolute bg-black items-center object-cover overflow-hidden top-[35px] right-2.5 z-50 shadow-[#784FD8] shadow-[0px_8px_8px_0px_0.5] duration-500`}
              >
                {MenuList.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => goToPage(item.path)}
                      className={` ${item.path === currentPage ? "text-[#784FD8] cursor-pointer" : "text-white cursor-pointer hover:bg-[#784FD8]"} py-2 px-6 text-start w-full flex flex-row items-center justify-start gap-2`}
                    >
                      {item.icon}
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
            <ConnectButton></ConnectButton>
          </div>
        </div>
      </div>
      {isLoading && <Spinner />}

    </div>
  );
};
export default Header;
