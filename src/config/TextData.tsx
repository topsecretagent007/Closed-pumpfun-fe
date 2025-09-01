import { url } from "inspector";
import { FaTelegramPlane, FaTwitter, FaDiscord, FaHome } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";

import HalbornImg from "@/../public/assets/images/audited/halborn.png"
import Sec3Img from "@/../public/assets/images/audited/sec3.png"
import OtterSecImg from "@/../public/assets/images/audited/ottersec.png"
import OffSiteImg from "@/../public/assets/images/audited/offsite.png"
import OakImg from "@/../public/assets/images/audited/oak.png"

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const TOTAL_SUPPLY = process.env.NEXT_PUBLIC_TOTAL_SUPPLY; // 1 Billion
export const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "";
export const BACKEND_WALLET = process.env.NEXT_PUBLIC_BACKEND_WALLET;
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
export const PROGRAMID = process.env.NEXT_PUBLIC_PROGRAM_ID;
export const BIRDEYE_KEY = process.env.NEXT_PUBLIC_BIRDEYE_KEY;
export const DEPOSIT_WALLET = process.env.NEXT_PUBLIC_DEPOSIT_WALLET;
export const DEPOSIT_AMOUNT = process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT; // 0.1 SOL
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK; // devnet or mainnet-beta
export const BIRDEYE_URL = process.env.NEXT_PUBLIC_BIRDEYE_URL;
export const COINGECKO_URL = process.env.NEXT_PUBLIC_COINGECKO_URL;
export const PINATA_IPFS_URL = process.env.NEXT_PUBLIC_PINATA_IPFS_URL;
export const PINATA_IMG_URL = process.env.NEXT_PUBLIC_PINATA_IMG_URL;

export const MenuList = [
    { id: "home", text: "Home", path: "/", icon: <FaHome /> },
    { id: "trading", text: "Trade", path: "/trading", icon: <FaArrowTrendUp /> },
    { id: "create-coin", text: "Launch Token", path: "/create-coin", icon: <BsDatabaseFillAdd /> },
    { id: "archive", text: "Archive", path: "/archive", icon: <GiArchiveRegister /> },
]

export const FooterTextList = [
    { text: "Terms & Conditions", url: "/" },
    { text: "Privacy Policy", url: "/" },
    { text: "Support", url: "/" },
]

export const ProfileMenuList = [
    // { id: 1, text: "Coins hold", },
    { id: 4, text: "Coins created", },
    // { id: 5, text: "Followers", },
    // { id: 6, text: "Following", },
]

export const StagesData = [
    { id: "one", text: "One" },
    { id: "tow", text: "Tow" },
    { id: "three", text: "Three" },
    { id: "four", text: "Four" },
]

export const StageDurationData = [
    { id: 1, text: "1 Days" },
    { id: 1, text: "2 Days" },
    { id: 3, text: "3 Days" },
    { id: 4, text: "4 Days" },
    { id: 5, text: "5 Days" },
    { id: 6, text: "6 Days" },
    { id: 7, text: "7 Days" },
]

export const SellTaxDecayData = [
    { id: 1, text: "Unitill halfqy throgh - 10%" },
    { id: 2, text: "Unitill halfqy throgh - 20%" },
    { id: 3, text: "Unitill halfqy throgh - 30%" },
    { id: 4, text: "Unitill halfqy throgh - 40%" },
    { id: 5, text: "Unitill halfqy throgh - 50%" },
    { id: 6, text: "Unitill halfqy throgh - 60%" },
    { id: 7, text: "Unitill halfqy throgh - 70%" },
    { id: 8, text: "Unitill halfqy throgh - 80%" },
    { id: 9, text: "Unitill halfqy throgh - 90%" },
    { id: 10, text: "Unitill halfqy throgh - 100%" },
]

export const FinalTokenPoolData = [
    { id: "newlp", text: "NEWLP / SOL" },
    { id: "meteora", text: "Meteora / SOL" },
    { id: "raydium", text: "Raydium / SOL" },
    { id: "uniswap", text: "Uniswap / ETH" },
]

export const AdminSocialData = [
    { id: "twitter", icon: <FaTwitter />, url: "/" },
    { id: "telegram", icon: <FaTelegramPlane />, url: "/" },
    { id: "discord", icon: <FaDiscord />, url: "/" },
]

export const AuditedList = [
    { id: "halborn", img: HalbornImg, },
    { id: "sec3", img: Sec3Img, },
    { id: "ottersec", img: OtterSecImg, },
    { id: "offsite", img: OffSiteImg, },
    { id: "oak", img: OakImg, },
]


export const FeeData = [
    {
        id: 1,
        value: 0
    },
    {
        id: 2,
        value: 0.002
    },
    {
        id: 3,
        value: 0.005
    },
    {
        id: 4,
        value: 0.01
    },
    {
        id: 5,
        value: 0.015
    },
    {
        id: 6,
        value: 0.02
    }
]

