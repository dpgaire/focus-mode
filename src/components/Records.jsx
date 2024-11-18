import React from "react";

const Records = ({ tasks, currentTask }) => {
  // Filter out the current task from the task list
  const filteredTask = tasks.filter((item) => item.taskName !== currentTask);

  return (
    <div className="my-2 p-2 ">
      <span className="text-2xl font-bold">Records</span>
      <div className="max-h-96 overflow-auto">
        {filteredTask?.length === 0 ? (
          <div>No completed tasks available.</div>
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
              {filteredTask?.map((task, index) => (
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
  const completionDate = new Date(timestamp).toLocaleDateString(); // Format the timestamp

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2">{taskName}</td>
      <td className="px-4 py-2">{completionDate}</td>
      <td className="px-4 py-2 text-green-500">Completed</td>
    </tr>
  );
};

export default Records;
