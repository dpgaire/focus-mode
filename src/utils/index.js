const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // Add date in YYYY-MM-DD format
    currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
  }

  return dates;
};

// Utility function to calculate unique days from tasks
const calculateUniqueDays = (tasks) => {
  const uniqueDays = new Set();
  tasks.forEach((task) => {
    const startDate = new Date(task.timestamp).toISOString().split("T")[0];
    const endDate = task.completedAt
      ? new Date(task.completedAt).toISOString().split("T")[0]
      : startDate;
    getDatesBetween(startDate, endDate).forEach((date) => uniqueDays.add(date));
  });
  return uniqueDays.size;
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const formatCompletionDate = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  } catch {
    return "Invalid Date";
  }
};

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const calculateStats = (data) => {
  const income = data
    .filter((record) => record.type === "income")
    .reduce((sum, record) => sum + (Number(record.price) || 0), 0);

  const expenses = data
    .filter((record) => record.type === "expense" && record.category !== "borrow" && record.category !== "lend")
    .reduce((sum, record) => sum + (Number(record.price) || 0), 0);

  // Calculate total loans (borrowed) and lends (lent)
  const loans = data
    .filter((record) => record.category === "borrow")
    .reduce((sum, record) => sum + (Number(record.price) || 0), 0);

  const lends = data
    .filter((record) => record.category === "lend")
    .reduce((sum, record) => sum + (Number(record.price) || 0), 0);

  // Operational Remaining Balance
  const remaining = income - expenses;

  // Comprehensive Balance Calculation (including loans/lends)
  const balance = remaining + loans - lends;

  return { income, expenses, remaining, loans, lends, balance };
};



export {
  getDatesBetween,
  calculateUniqueDays,
  formatTime,
  formatCompletionDate,
  generateUniqueId,
  calculateStats,
};
