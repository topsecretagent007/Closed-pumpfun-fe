import UserContext from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";

interface CoinBlogProps {
  text: string;
  data: number;
}

export const DataCard: React.FC<CoinBlogProps> = ({ text, data }) => {
  const [amount, setAmount] = useState<number>(0)
  const { solPrice } = useContext(UserContext)

  const getAmount = (e: number, sol: number) => {
    const _amount = e * sol;
    setAmount(_amount)
  }

  useEffect(() => {
    if (text === "MAP CAP") {
      getAmount(data, solPrice)
    }
  }, [data, text])

  return (
    <div className="flex flex-col justify-center items-center gap-2 py-3 border-[#000] border-[1px] rounded-lg w-full">
      <p className="font-medium">{text}</p>
      <p className="font-semibold">
        $ {Math.floor(amount * 1000) / 1000}
      </p>
    </div>
  );
};
