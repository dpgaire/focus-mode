import React from "react";

const Records = ({ tasks, currentTask }) => {
  // Filter out the current task from the task list
  const filteredTasks = tasks.filter((task) => task.taskName !== currentTask);

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB - dateA; // Descending order (latest first)
  });

  return (
    <div className="my-2 p-2">
      <span className="text-2xl font-bold">Records</span>
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
                <RecordRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const RecordRow = ({ task }) => {
  const { taskName, timestamp } = task;
  const completionDate = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

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
