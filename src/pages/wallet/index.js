import React, { useEffect, useState } from "react";

import {
  AddExpense,
  ExpenseGraph,
  ExpenseRecords,
} from "@/components/expenses";
import { calculateStats } from "@/utils";


const Index = () => {
  const [budgetStats, setBudgetStats] = useState({
    income: 0,
    expenses: 0,
    remaining: 0,
    loans: 0,
    lends:0,
    balance:0
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(savedRecords);
    const stats = calculateStats(savedRecords); // Call the imported function
    setBudgetStats(stats);
    calculateStats(savedRecords);
  }, []);

  const handleEdit = (updatedExpense) => {
    setRecords((prevExpense) =>
      prevExpense.map((expense) =>
        expense.id === updatedExpense.id
          ? { ...expense, ...updatedExpense }
          : expense
      )
    );
  };

  const handleDeleteExpense = (expenseToDelete) => {
    const filterRecords = records.filter(
      (record) => record.id !== expenseToDelete.id
    );
    setRecords(filterRecords);
  };

  // Sync tasks with localStorage whenever records state changes
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [records]);

  return (
    <>
      <ExpenseGraph
        income={budgetStats.income}
        expenses={budgetStats.expenses}
        remaining={budgetStats.remaining}
        loans={budgetStats.loans}
        lends={budgetStats.lends}
        balance={budgetStats.balance}
      />
      <AddExpense records={records} setRecords={setRecords} />
      <ExpenseRecords
        records={records}
        setRecords={setRecords}
        onEdit={handleEdit}
        onDelete={handleDeleteExpense}
      />
    </>
  );
};

export default Index;
