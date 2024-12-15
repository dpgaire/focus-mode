import React from "react";

import {  RecordsTable } from "@/components/common";
import UpdateRecords from "./UpdateRecords";
import { expenseColumns } from "@/utils/data";

const ExpenseRecords = ({ records, setRecords, onEdit, onDelete }) => {

  const sortedRecords = records.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <RecordsTable
      records={sortedRecords}
      setRecords={setRecords}
      columns={expenseColumns}
      recordType="expense"
      onEditRecord={onEdit}
      onDeleteRecord={onDelete}
      EditModal={UpdateRecords}
    />
  );
};

export default ExpenseRecords;
