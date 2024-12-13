import React, { useEffect, useState } from "react";

import {
  AddExpense,
  ExpenseGraph,
  ExpenseRecords,
} from "@/components/expenses";
import { calculateStats } from "@/utils";
import CategoryStat from "@/components/tasks/Graph/CategoryStat";
import { categories } from "@/utils/data";

const Index = () => {
  const [budgetStats, setBudgetStats] = useState({
    income: 0,
    expenses: 0,
    remaining: 0,
    categories: {},
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
        categoryStat={budgetStats.expenseCategories}
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
