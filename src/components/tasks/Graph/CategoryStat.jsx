import React, { useState, useEffect } from "react";

const CategoryStat = () => {
  const [records, setRecords] = useState([]);
  const [budgetStats, setBudgetStats] = useState({
    income: 0,
    expenses: 0,
    remaining: 0,
    expenseCategories: {},
  });

  const data = [
    {
      id: "m4iey7rdxdfngbe8mt",
      item: "Test update",
      price: "20003",
      category: "Utilities",
      timestamp: 1733832241609,
      type: "income",
    },
    {
      id: "m4igmzixskykkcbp0sl",
      item: "Book",
      price: "300",
      category: "Health",
      timestamp: 1733835076954,
      type: "expense",
    },
    {
      id: "m4iig55jteq7fdg9mxe",
      item: "new test",
      price: "3005",
      category: "Food",
      timestamp: 1733838116887,
      type: "expense",
    },
  ];

  useEffect(() => {
    setRecords(data);
    calculateStats(data);
  }, []);

  const calculateStats = (data) => {
    const income = data
      .filter((record) => record.type === "income")
      .reduce((sum, record) => sum + Number(record.price), 0);

    const expenses = data
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + Number(record.price), 0);

    const expenseCategories = data
      .filter((record) => record.type === "expense")
      .reduce((acc, record) => {
        acc[record.category] =
          (acc[record.category] || 0) + Number(record.price);
        return acc;
      }, {});

    setBudgetStats({
      income,
      expenses,
      remaining: income - expenses,
      expenseCategories,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Budget Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Budget Summary
        </h2>
        <div className="flex justify-between text-xl">
          <div>
            <div className="text-gray-500">Income</div>
            <div className="font-bold text-green-600">
              ${budgetStats.income.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Expenses</div>
            <div className="font-bold text-red-600">
              ${budgetStats.expenses.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Remaining</div>
            <div className="font-bold text-blue-600">
              ${budgetStats.remaining.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Categories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(budgetStats.expenseCategories).map(
          ([category, amount]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                {category}
              </h3>
              <p className="text-lg font-bold text-red-600 mt-2">
                ${amount.toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryStat;
