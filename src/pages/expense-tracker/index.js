import React, { useEffect, useState } from "react";

import {
  AddExpense,
  ExpenseGraph,
  ExpenseRecords,
} from "@/components/expenses";

const Index = () => {
  const [budgetStats, setBudgetStats] = useState({
    income: 0,
    expenses: 0,
    remaining: 0,
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(savedRecords);
    calculateStats(savedRecords);
  }, []);

  const calculateStats = (data) => {
    const income = data
      .filter((record) => record.type === "income")
      .reduce((sum, record) => sum + Number(record.price), 0);
    const expenses = data
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + Number(record.price), 0);
    setBudgetStats({ income, expenses, remaining: income - expenses });
  };
  console.log("records", records);

  const handleEdit = (task) => {
    console.log("Editing", task);
  };

  const handleDelete = (task) => {
    console.log("Deleting", task);
  };

  //   const budgetStats = {
  //     income: "Rs.80000",
  //     expenses: "Rs.2000",
  //     remaining: "780000",
  //   };
  return (
    <div>
      <AddExpense />
      <ExpenseGraph
        income={budgetStats.income}
        expenses={budgetStats.expenses}
        remaining={budgetStats.remaining}
      />
      <ExpenseRecords
        records={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Index;
