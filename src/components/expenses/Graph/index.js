import React from "react";
import { HeaderTitle } from "@/components/common";
import {
  MdAttachMoney,
  MdRemoveShoppingCart,
  MdMoneyOff,
} from "react-icons/md";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseGraph = ({ income, expenses, remaining, categories }) => {
  const data = {
    labels: ["Income", "Expenses", "Remaining"],
    datasets: [
      {
        label: "Budget Overview",
        data: [income, expenses, remaining],
        backgroundColor: ["#4CAF50", "#FF6347", "#FFD700"], // Colors for each bar
        borderColor: ["#388E3C", "#D32F2F", "#FFB300"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-4 p-6 border rounded-lg shadow-lg">
      <HeaderTitle headerText="Budget Overview" />

      {/* Overview with Icons and Bold Text */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center border shadow-lg p-6 rounded-lg">
          <MdAttachMoney className="text-green-500 mr-2" />
          <p className="font-bold">Income: Rs. {income}</p>
        </div>
        <div className="flex items-center border shadow-lg p-6 rounded-lg">
          <MdRemoveShoppingCart className="text-red-500 mr-2" />
          <p className="font-bold">Expenses: Rs. {expenses}</p>
        </div>
        <div className="flex items-center border shadow-lg p-6 rounded-lg">
          <MdMoneyOff className="text-yellow-500 mr-2" />
          <p className="font-bold">Remaining: Rs. {remaining}</p>
        </div>
      </div>

      {/* Bar Chart */}
      {/* <div className="mt-6">
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: { title: { display: true, text: "Budget Distribution" } },
          }}
        />
      </div> */}
    </div>
  );
};

export default ExpenseGraph;
