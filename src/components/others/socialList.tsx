"use client"
import Link from 'next/link';
import { coinInfo } from "@/utils/types";
import { FC } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

interface TokenDataProps {
	data: coinInfo;
}

const SocialList: FC<TokenDataProps> = ({ data }) => {

	return (
		<div className="flex flex-row justify-center gap-4 px-2">
			{(data?.twitter && data?.twitter !== undefined) &&
				<Link href={data?.twitter} legacyBehavior passHref>
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="hover:bg-black/50 p-2 border-[1px] border-black rounded-full text-black text-2xl cursor-pointer"
					>
						<FaXTwitter />
					</a>
				</Link>
			}
			{(data?.telegram && data?.telegram !== undefined) &&
				<Link href={data?.telegram} legacyBehavior passHref>
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="hover:bg-black/50 p-2 border-[1px] border-black rounded-full text-black text-2xl cursor-pointer"
					>
						<FaTelegramPlane />
					</a>
				</Link>
			}
			{(data?.website && data?.website !== undefined) &&
				<Link href={data?.website} legacyBehavior passHref>
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="hover:bg-black/50 p-2 border-[1px] border-black rounded-full text-black text-2xl cursor-pointer"
					>
						<TbWorld />
					</a>
				</Link>
			}
		</div>
	);
};

export default SocialList;
