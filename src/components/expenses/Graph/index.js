import React from "react";
import { HeaderTitle } from "@/components/common";
import {
  MdAttachMoney,
  MdRemoveShoppingCart,
  MdMoneyOff,
} from "react-icons/md";

const ExpenseGraph = ({ income, expenses, remaining, categoryStat }) => {
  return (
    <div className="mt-4 p-6 border rounded-lg shadow-lg">
      <HeaderTitle headerText="Budget Overview" />

      {/* Overview with Icons and Bold Text */}
      <div className="flex justify-between mb-4 text-xl">
        <div className="flex items-center border text-green-500 shadow-lg p-6 rounded-lg">
          <MdAttachMoney className="text-green-500 mr-2" />
          <p className="font-bold">Income: Rs. {income}</p>
        </div>
        <div className="flex items-center border text-red-500 shadow-lg p-6 rounded-lg">
          <MdRemoveShoppingCart className="text-red-500 mr-2" />
          <p className="font-bold">Expenses: Rs. {expenses}</p>
        </div>
        <div className="flex items-center border text-yellow-500 shadow-lg p-6 rounded-lg">
          <MdMoneyOff className="text-yellow-500 mr-2" />
          <p className="font-bold">Remaining: Rs. {remaining}</p>
        </div>
      </div>
      {/* {categoryStat.length > 0 && (
        <>
          <HeaderTitle headerText="Category Overview" />
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Object.entries(categoryStat)?.map(([category, amount]) => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">
                  {category}
                </h3>
                <p className="text-lg font-bold text-red-600 mt-2">
                  Rs.{amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )} */}
    </div>
  );
};

export default ExpenseGraph;
