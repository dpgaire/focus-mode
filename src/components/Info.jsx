import React from "react";

const info = [
  "Silence phone notifications.",
  "Keep a glass of water nearby.",
  "Ensure your laptop is charged.",
  "Use headphones for focus.",
  "Play concentration-boosting music.",
  "Maintain a comfortable seating posture.",
  "Set your phone to Do Not Disturb mode.",
];

// Helper function to get all dates between two dates (inclusive)
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

const Info = ({ tasks }) => {
  const totalMinutes = tasks.length * 25;
  const totalHours = totalMinutes / 60;
  const uniqueDays = new Set();

  tasks.forEach((task) => {
    const startDate = new Date(task.timestamp).toISOString().split("T")[0];
    const endDate = task.completedAt
      ? new Date(task.completedAt).toISOString().split("T")[0]
      : startDate;
    getDatesBetween(startDate, endDate).forEach((date) => uniqueDays.add(date));
  });

  const totalDays = uniqueDays.size;

  return (
    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-white space-y-4">
      {/* Notes Section */}
      <div>
        <h2 className="text-lg font-bold mb-2">Focus Preparation Checklist</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {info.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Time Summary Section */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <span className="text-sm font-semibold">Days</span>
          <div className="text-lg font-bold">{totalDays}</div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <span className="text-sm font-semibold">Hours</span>
          <div className="text-lg font-bold">{totalHours.toFixed(2)}</div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <span className="text-sm font-semibold">Minutes</span>
          <div className="text-lg font-bold">{totalMinutes}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
