import React from "react";

import { HeaderTitle, Table } from "@/components/common";

const ExpenseRecords = ({ records, handleEdit, handleDelete }) => {
  return (
    <div className="mt-4">
      <HeaderTitle headerText="Records" />
      <Table
        columns={columns}
        rowList={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ExpenseRecords;

// const columns = ["S/N", "Item Name", "Date", "Category", "Amount", "Actions"];
const columns = ["S/N", "Item Name", , "Amount", "Category", "Actions"];

const rowList = [
  {
    SN: 1,
    item: "Buy groceries",
    timestamp: "2024-12-10T12:00:00Z",
    category: "Food",
    amount: "Rs.1000",
  },
  {
    SN: 2,
    item: "Buy groceries",
    timestamp: "2024-12-10T12:00:00Z",
    category: "Food",
    amount: "Rs.1000",
  },
  {
    SN: 3,
    item: "Buy groceries",
    timestamp: "2024-12-10T12:00:00Z",
    category: "Food",
    amount: "Rs.1000",
  },
  {
    SN: 4,
    item: "Buy groceries",
    timestamp: "2024-12-10T12:00:00Z",
    category: "Food",
    amount: "Rs.1000",
  },
  // Add more tasks here...
];
