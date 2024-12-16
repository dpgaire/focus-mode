const InfoData = [
  "Set your phone to Do Not Disturb mode.",
  "Silence phone notifications.",
  "Keep a glass of water nearby.",
  "Ensure your laptop is charged.",
  "Use headphones for focus.",
  "Play concentration-boosting music.",
  "Maintain a comfortable seating posture.",
];

const categories = [
  { value: "income", name: "Income" },
  { value: "housing", name: "Housing" },
  { value: "borrow", name: "Borrow" },
  { value: "lend", name: "Lend" },
  { value: "utilities", name: "Utilities" },
  { value: "food", name: "Food" },
  { value: "transport", name: "Transport" },
  { value: "petrol", name: "Petrol" },
  { value: "bike_service", name: "Bike Service" },
  { value: "health", name: "Health" },
  { value: "debt", name: "Debt" },
  { value: "bill_payment", name: "Bill Payment" },
  { value: "topup", name: "Topup" },
];

const expenseTypes = [
  { value: "expense", name: "Expense" },
  { value: "income", name: "Income" },
];

const statusOptions = [
  { value: "completed", name: "Completed" },
  { value: "pending", name: "Pending" },
];

const expenseColumn = [
  "S/N",
  "Item Name",
  "Amount",
  "Category",
  "Date",
  "Type",
  "Actions",
];

const tasksColumn = [
  "S/N",
  "Task Name",
  "Completion Date",
  "Status",
  "Actions",
];

const expenseColumns = [
  "S/N",
  "Item Name",
  "Amount",
  "Category",
  "Date",
  "Type",
  "Actions",
];

export {
  InfoData,
  categories,
  expenseTypes,
  statusOptions,
  expenseColumn,
  tasksColumn,
  expenseColumns,
};
