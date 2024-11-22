import React, { useState } from "react";
import { Button } from ".";

const Records = ({ tasks, currentTask, updateTask }) => {
  // State to track the task being edited
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter out the current task from the task list
  const filteredTasks = tasks.filter((task) => task.taskName !== currentTask);

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB - dateA; // Descending order (latest first)
  });

  const handleDownload = () => {
    const data = JSON.stringify(sortedTasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const currentDate = new Date().toISOString().split("T")[0];
    const link = document.createElement("a");
    link.href = url;
    link.download = `task_logs_${currentDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatCompletionDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleString();
  };

  // Handle row click (set selected task for editing)
  const handleRowClick = (task) => {
    setSelectedTask(task);
  };

  // Handle updating the task
  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask); // This will be passed as a prop to update the tasks in the parent component
    setSelectedTask(null); // Close the modal
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
                <th className="px-4 py-2 border-b">S/N</th>
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
                  sn={index + 1}
                  formatCompletionDate={formatCompletionDate}
                  onClick={() => handleRowClick(task)} // Set the selected task on click
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal to edit task */}
      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

const RecordRow = ({ task, sn, formatCompletionDate, onClick }) => {
  const { taskName, timestamp } = task;
  const completionDate = formatCompletionDate(timestamp);

  return (
    <tr className="border-b hover:bg-gray-100" onClick={onClick}>
      <td className="px-4 py-2">{sn}</td>
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

const TaskEditModal = ({ task, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({
    ...task, // Copy existing task data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask); // Update the task with the edited data
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Task Name</label>
            <input
              type="text"
              name="taskName"
              value={editedTask.taskName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Completion Date</label>
            <input
              type="datetime-local"
              name="timestamp"
              value={new Date(editedTask.timestamp).toISOString().slice(0, 16)}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={editedTask.status || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" innerText="Cancel" onClick={onClose} />
            <Button variant="primary" innerText="Save Changes" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Records;
