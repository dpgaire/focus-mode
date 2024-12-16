import { HeaderTitle } from "@/components/common";
import { useState } from "react";

import {
  MdAttachMoney,
  MdRemoveShoppingCart,
  MdMoneyOff,
} from "react-icons/md";

const WalletCard = ({ amount, gradientColors, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center flex-col border p-6 rounded-lg cursor-pointer ${gradientColors}`}
    >
      {children}
      <p className="font-bold text-xl">{amount}</p>
    </div>
  );
};

const ExpenseGraph = ({
  income,
  expenses,
  remaining,
  loans,
  lends,
  balance,
}) => {
  const [incomeVisible, setIncomeVisible] = useState(false);
  const [expensesVisible, setExpensesVisible] = useState(false);
  const [remainingVisible, setRemainingVisible] = useState(false);
  const [loansVisible, setLoansVisible] = useState(false);
  const [lendsVisible, setLendsVisible] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);

  return (
    <div className="mt-4 p-6 border rounded-lg">
      <HeaderTitle headerText="Budget Overview" />

      {/* Overview with Icons and Bold Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white gap-2  mb-4 text-xl md:text-4xl">
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

        {/* Loans Card */}
        <WalletCard
          type="Loans"
          amount={loansVisible ? `Rs. ${loans}` : "xxx.xx"}
          gradientColors="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
          onClick={() => setLoansVisible(!loansVisible)}
        >
          <MdAttachMoney className="text-white mr-2" />
          <p>Loans</p>
        </WalletCard>

        {/* Lends Card */}
        <WalletCard
          type="Lends"
          amount={lendsVisible ? `Rs. ${lends}` : "xxx.xx"}
          gradientColors="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"
          onClick={() => setLendsVisible(!lendsVisible)}
        >
          <MdMoneyOff className="text-white mr-2" />
          <p>Lends</p>
        </WalletCard>

        {/* Balance Card */}
        <WalletCard
          type="Balance"
          amount={balanceVisible ? `Rs. ${balance}` : "xxx.xx"}
          gradientColors="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
          onClick={() => setBalanceVisible(!balanceVisible)}
        >
          <MdMoneyOff className="text-white mr-2" />
          <p>Balance</p>
        </WalletCard>
      </div>
    </div>
  );
};

export default ExpenseGraph;
