import React, { useState } from "react";
import { HeaderTitle } from "@/components/common";
import {
  MdAttachMoney,
  MdRemoveShoppingCart,
  MdMoneyOff,
} from "react-icons/md";

const WalletCard = ({ type, amount, gradientColors, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={`relative min-w-full md:min-w-96 flex items-center flex-col border shadow-lg p-6 rounded-lg cursor-pointer ${gradientColors}`}
    >
      {children}
      <p className="font-bold text-xl">{amount}</p>
    </div>
  );
};

const ExpenseGraph = ({ income, expenses, remaining, categoryStat }) => {
  const [incomeVisible, setIncomeVisible] = useState(false);
  const [expensesVisible, setExpensesVisible] = useState(false);
  const [remainingVisible, setRemainingVisible] = useState(false);

  return (
    <div className="mt-4 p-6 border rounded-lg shadow-lg">
      <HeaderTitle headerText="Budget Overview" />

      {/* Overview with Icons and Bold Text */}
      <div className="flex justify-between text-white gap-2  flex-wrap mb-4 text-xl md:text-4xl">
        {/* Income Card */}
        <WalletCard
          type="Income"
          amount={incomeVisible ? `Rs. ${income}` : "xxx.xx"}
          gradientColors=" bg-gradient-to-r from-green-400 via-green-500 to-green-600"
          onClick={() => setIncomeVisible(!incomeVisible)}
        >
          <MdAttachMoney className="text-white mr-2" />
          <p>Income</p>
        </WalletCard>

        {/* Expenses Card */}
        <WalletCard
          type="Expenses"
          amount={expensesVisible ? `Rs. ${expenses}` : "xxx.xx"}
          gradientColors="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
          onClick={() => setExpensesVisible(!expensesVisible)}
        >
          <MdRemoveShoppingCart className="text-white mr-2" />
          <p>Expenses</p>
        </WalletCard>

        {/* Remaining Card */}
        <WalletCard
          type="Remaining"
          amount={remainingVisible ? `Rs. ${remaining}` : "xxx.xx"}
          gradientColors="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
          onClick={() => setRemainingVisible(!remainingVisible)}
        >
          <MdMoneyOff className="text-white mr-2" />
          <p>Remaining</p>
        </WalletCard>
      </div>
    </div>
  );
};

export default ExpenseGraph;
