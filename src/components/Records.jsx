import React from "react";
import { Button } from ".";

const Records = ({ tasks, currentTask }) => {
  // Filter out the current task from the task list
  const filteredTasks = tasks.filter((task) => task.taskName !== currentTask);

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB - dateA; // Descending order (latest first)
  });

  const handleDownload = () => {
    // Convert the task data to a JSON string
    const data = JSON.stringify(sortedTasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Get current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split("T")[0];

    // Create a temporary anchor element for downloading the file
    const link = document.createElement("a");
    link.href = url;
    link.download = `task_logs_${currentDate}.json`; // Filename with current date
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };

  const formatCompletionDate = (timestamp) => {
    const date = new Date(timestamp);

    // Check if the date is invalid (i.e., not a valid date)
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Fallback message
    }

    // If the date is valid, format it into a readable string
    return date.toLocaleString(); // Default locale date format
  };

  return (
    <div className="my-2 p-2">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Records</span>
        <Button
          variant="primary"
          innerText="Download Log"
          onClick={handleDownload}
        />
      </div>
      <div className="max-h-96 overflow-auto">
        {sortedTasks?.length === 0 ? (
          <div className="text-gray-500 mt-4">
            No completed tasks available.
          </div>
        ) : (
          <table className="min-w-full table-auto border mt-4">
            <thead>
              <tr className="bg-blue-500 text-left text-white">
                <th className="px-4 py-2 border-b">Task Name</th>
                <th className="px-4 py-2 border-b">Completion Date</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks?.map((task, index) => (
                <RecordRow
                  key={index}
                  task={task}
                  formatCompletionDate={formatCompletionDate}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const RecordRow = ({ task, formatCompletionDate }) => {
  const { taskName, timestamp } = task;

  const completionDate = formatCompletionDate(timestamp);

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2">{taskName}</td>
      <td className="px-4 py-2">{completionDate}</td>
      <td
        className={`px-4 py-2 ${
          task?.status === "completed" ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {!task?.status
          ? "Pending"
          : task?.status?.charAt(0).toUpperCase() + task?.status?.slice(1)}
      </td>
    </tr>
  );
};

export default Records;
