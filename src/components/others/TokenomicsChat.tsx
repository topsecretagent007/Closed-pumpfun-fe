"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TokenomicsChat = () => {
  const data = {
    labels: ["Reserve", "Liquidity", "Team"],
    datasets: [
      {
        data: [15, 20, 25], // Percentage values
        backgroundColor: ["#58D764", "#FF903E", "#FACC15"],
        hoverBackgroundColor: ["#4CBF5D", "#E57F2E", "#E6B80C"], // Slightly darker for hover
        hoverOffset: 4,
        borderColor: "rgba(255, 255, 255, 0.0)",
        borderWidth: 4, // Adjust gap size
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "90%", // Controls the doughnut hole size
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Hides the tooltip
      },
    },
  };


  return (
    <div className="flex flex-col mx-auto w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TokenomicsChat;
