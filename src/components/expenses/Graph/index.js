import React from "react";

import { HeaderTitle } from "@/components/common";

const ExpenseGraph = ({ income, expenses, remaining }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-lg">
      <HeaderTitle headerText="Budget Overview" />
      <p>Income: Rs.{income}</p>
      <p>Expenses: Rs.${expenses}</p>
      <p>Remaining: Rs.${remaining}</p>
    </div>
  );
};

export default ExpenseGraph;
