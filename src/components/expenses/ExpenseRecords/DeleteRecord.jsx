import React from "react";

import { Button, Modal } from "@/components/common";

const DeleteRecord = ({ expenseName, onConfirm, onCancel }) => {
  return (
    <Modal title="Confirm Delete">
      <p className="mb-6">
        Are you sure you want to delete the expense{" "}
        <strong>{expenseName}</strong>?
      </p>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" innerText="Cancel" onClick={onCancel} />
        <Button variant="danger" innerText="Delete" onClick={onConfirm} />
      </div>
    </Modal>
  );
};

export default DeleteRecord;
