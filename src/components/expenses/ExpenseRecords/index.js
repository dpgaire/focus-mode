import React, { useState } from "react";

import { DownloadUploadLog, Table } from "@/components/common";
import UpdateRecords from "./UpdateRecords";
import DeleteRecord from "./DeleteRecord";
import { expenseColumns } from "@/utils/data";

const ExpenseRecords = ({ records, setRecords, onEdit, onDelete }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteExpense = () => {
    if (expenseToDelete) {
      onDelete(expenseToDelete); // Pass the task to the parent component for deletion
      setExpenseToDelete(null); // Close the confirmation modal
    }
  };

  return (
    <div className="record-table">
      <DownloadUploadLog
        records={records}
        setRecords={setRecords}
        logName="wallet_logs_"
      />
      <Table
        columns={expenseColumns}
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
