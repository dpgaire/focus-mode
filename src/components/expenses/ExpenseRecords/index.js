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

const columns = [
  "S/N",
  "Item Name",
  "Amount",
  "Category",
  "Date",
  "Type",
  "Actions",
];
