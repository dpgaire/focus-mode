import React, { useState } from "react";

import { HeaderTitle, Table } from "@/components/common";
import UpdateRecords from "./UpdateRecords";
import DeleteRecord from "./DeleteRecord";

const ExpenseRecords = ({ records, onEdit, onDelete }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteExpense = () => {
    if (expenseToDelete) {
      onDelete(expenseToDelete); // Pass the task to the parent component for deletion
      setExpenseToDelete(null); // Close the confirmation modal
    }
  };

  return (
    <div className="mt-4">
      <HeaderTitle headerText="Records" />
      <Table
        columns={columns}
        rowList={records}
        onEdit={setSelectedExpense}
        onDelete={setExpenseToDelete}
      />
      {selectedExpense && (
        <UpdateRecords
          record={selectedExpense}
          onClose={() => setSelectedExpense(null)}
          onUpdate={(updatedExpense) => {
            onEdit(updatedExpense);
            setSelectedExpense(null);
          }}
        />
      )}
      {expenseToDelete && (
        <DeleteRecord
          expenseName={expenseToDelete.item}
          onConfirm={handleDeleteExpense}
          onCancel={() => setExpenseToDelete(null)}
        />
      )}
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
