import { Button, Modal, SelectField, TextInput } from "@/components/common";
import { categories, expenseTypes } from "@/utils/data";
import React, { useState } from "react";

const UpdateRecords = ({ record, onClose, onUpdate }) => {
  const [editedExpense, setEditedExpense] = useState({ ...record });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedExpense);
  };

  return (
    <Modal title="Edit Expense">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            name="item"
            value={editedExpense.item}
            onChange={handleInputChange}
            placeholder="Item Name"
          />
        </div>
        <div className="mb-4">
          <TextInput
            type="text"
            name="price"
            value={editedExpense.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
        </div>
        <div className="mb-4">
          <SelectField
            value={editedExpense.category || ""}
            label="Category"
            name="category"
            onChange={handleInputChange}
            options={categories}
          />
        </div>
        <div className="mb-4">
          <SelectField
            value={editedExpense.type || ""}
            label="Type"
            name="type"
            onChange={handleInputChange}
            options={expenseTypes}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" innerText="Cancel" onClick={onClose} />
          <Button variant="primary" innerText="Save Changes" type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default UpdateRecords;
