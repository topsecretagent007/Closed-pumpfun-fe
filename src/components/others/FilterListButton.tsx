"use client"
import { coinInfo } from "@/utils/types";
import { FC } from "react";
import { CiFilter } from "react-icons/ci";

interface TokenDataProps {
  filterData: coinInfo[];
  setData: React.Dispatch<React.SetStateAction<coinInfo[]>>;
}

const FilterListButton: FC<TokenDataProps> = ({ filterData, setData }) => {
  const FilterText = [
    { id: "last reply", text: "Last Reply" },
    { id: "creation time", text: "Creation Time" },
    { id: "market cap", text: "Market Cap" },
  ];

  const handleSortSelection = (filterOption: string) => {
    let sortedData = [...filterData]; // Create a new array to prevent direct state mutation

    if (filterOption === "last reply") {
      sortedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filterOption === "market cap") {
      sortedData.sort((a, b) => b.progressMcap - a.progressMcap);
    } else if (filterOption === "creation time") {
      sortedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    setData(sortedData);
  };

  return (
    <div className="flex xs:flex-row flex-col justify-between items-center gap-3 w-full">
      {FilterText.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSortSelection(item.id)}
          className="flex flex-row justify-center items-center gap-2 hover:bg-black/30 py-2 border-[1px] border-black rounded-lg w-full font-semibold text-black text-lg cursor-pointer"
        >
          <p className="text-sm">{item.text}</p>
          <CiFilter />
        </div>
      ))}
    </div>
  );
};

export default FilterListButton;
