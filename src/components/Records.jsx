import React from "react";

const Records = ({ tasks, currentTask }) => {
  // Filter out the current task from the task list

  const filteredTask = tasks.filter((item) => item.taskName !== currentTask);

  return (
    <div className="my-2 flex flex-col gap-4 border rounded-lg shadow-lg p-2">
      <span className="text-2xl font-bold">Records</span>
      {filteredTask?.length === 0 ? (
        <div>No completed tasks available.</div>
      ) : (
        filteredTask?.map((task, index) => (
          <RecordList key={index} task={task} />
        ))
      )}
    </div>
  );
};

export default Records;

const RecordList = ({ task }) => {
  const { taskName, timestamp } = task;
  const completionDate = new Date(timestamp).toLocaleDateString(); // Format the timestamp

  return (
    <div className="w-full flex justify-between items-center p-4 border rounded-lg shadow-lg">
      <span className="text-lg">{taskName}</span>
      <span className="text-lg">{completionDate}</span>
      <span className="text-green-500">Completed</span>
    </div>
  );
};
