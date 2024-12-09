import React, { useState, useEffect } from "react";
import {
  Button,
  HeaderTitle,
  SelectField,
  TextInput,
} from "@/components/common";
import { categories } from "@/utils/data";
import { generateUniqueId } from "@/utils";

const AddExpense = () => {
  const [openForm, setOpenForm] = useState(false);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    category: "",
  });
  const [budgetStats, setBudgetStats] = useState({
    income: 0,
    expenses: 0,
    remaining: 0,
  });

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(savedRecords);
    calculateStats(savedRecords);
  }, []);

  const calculateStats = (data) => {
    const income = data
      .filter((record) => record.type === "income")
      .reduce((sum, record) => sum + Number(record.price), 0);
    const expenses = data
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + Number(record.price), 0);
    setBudgetStats({ income, expenses, remaining: income - expenses });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: generateUniqueId(),
      ...formData,
      // date: Date.now(),
      // type: "expense",
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setFormData({ item: "", price: "", category: "" });
    setOpenForm(false);
    calculateStats(updatedRecords);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleDelete = (id) => {
  //   const updatedRecords = records.filter((record) => record.id !== id);
  //   setRecords(updatedRecords);
  //   localStorage.setItem("records", JSON.stringify(updatedRecords));
  //   calculateStats(updatedRecords);
  // };

  return (
    <div className="my-4 p-4 border rounded-lg shadow-lg">
      <HeaderTitle headerText="Budget Tracker" />
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="primary"
          innerText="Add Expense"
          onClick={() => setOpenForm((prevState) => !prevState)}
        />
      </div>

      {openForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-2 flex flex-col gap-2 p-2 border rounded-lg shadow-lg"
        >
          <TextInput
            name="item"
            value={formData.item}
            onChange={handleInputChange}
            placeholder="Item name"
          />
          <TextInput
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Amount"
          />
          <SelectField
            value={formData.category}
            label="Category"
            name="category"
            onChange={handleInputChange}
            options={categories}
          />
          <Button type="submit" variant="primary" innerText="Submit" />
        </form>
      )}
    </div>
  );
};

export default AddExpense;
