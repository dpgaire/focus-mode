import React, { useState, useEffect } from "react";
import {
  Button,
  HeaderTitle,
  SelectField,
  TextInput,
} from "@/components/common";
import { categories } from "@/utils/data";
import { generateUniqueId } from "@/utils";

const AddExpense = ({ records, setRecords }) => {
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState("expense");
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    category: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: generateUniqueId(),
      ...formData,
      timestamp: Date.now(),
      type: formType, // Dynamically set the type (either income or expense)
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setFormData({ item: "", price: "", category: "" });
    setOpenForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormTypeToggle = (type) => {
    setFormType(type); // Set type to either "income" or "expense"
    setOpenForm(true); // Open form when switching types

    // Automatically set category to "Income" if type is income
    setFormData((prev) => ({
      ...prev,
      category: type === "income" ? "Income" : "",
    }));
  };
 
  return (
    <div className="my-4 p-4 border rounded-lg">
      <HeaderTitle headerText="Budget Tracker" />
      <div className="flex justify-between items-center gap-2 mb-4">
        <Button
          variant="primary"
          innerText="Add Expense"
          onClick={() => handleFormTypeToggle("expense")}
        />
        <Button
          variant="primary"
          innerText="Add Income"
          onClick={() => handleFormTypeToggle("income")}
        />
      </div>

      {openForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-2 flex flex-col gap-2 p-2 border rounded-lg"
        >
          <TextInput
            name="item"
            value={formData.item}
            onChange={handleInputChange}
            placeholder={`${
              formType === "income" ? "Income Name" : "Item name"
            }`}
          />
          {formType === "expense" && (
            <SelectField
              value={formData.category}
              label="Category"
              name="category"
              onChange={handleInputChange}
              options={categories}
            />
          )}
          <TextInput
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Amount"
          />
          <Button type="submit" variant="primary" innerText="Submit" />
        </form>
      )}
    </div>
  );
};

export default AddExpense;
