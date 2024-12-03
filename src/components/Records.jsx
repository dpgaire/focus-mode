import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from ".";

const Records = ({ tasks, currentTask, updateTask, deleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter and sort tasks
  const filteredTasks = tasks.filter((task) => task.taskName !== currentTask);
  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

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
    try {
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete); // Pass the task to the parent component for deletion
      setTaskToDelete(null); // Close the confirmation modal
    }
  };

  return (
    <div className="my-2 p-2">
      <div className="flex justify-between items-center flex-wrap">
        <span className="lg:text-2xl text-xl font-bold">Records</span>
        <Button
          variant="primary"
          innerText={`Download Log (${tasks.length})`}
          onClick={handleDownload}
        />
      </div>
      <div className="max-h-96 overflow-auto">
        {sortedTasks.length === 0 ? (
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
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, index) => (
                <RecordRow
                  key={task.id || index}
                  task={task}
                  sn={index + 1}
                  formatCompletionDate={formatCompletionDate}
                  onEdit={() => setSelectedTask(task)}
                  onDelete={() => setTaskToDelete(task)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updatedTask) => {
            updateTask(updatedTask);
            setSelectedTask(null);
          }}
        />
      )}

      {taskToDelete && (
        <DeleteConfirmationModal
          taskName={taskToDelete.taskName}
          onConfirm={handleDeleteTask}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
};

const RecordRow = ({ task, sn, formatCompletionDate, onEdit, onDelete }) => {
  const { taskName, timestamp, status } = task;

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2">{sn}</td>
      <td className="px-4 py-2">{taskName}</td>
      <td className="px-4 py-2">{formatCompletionDate(timestamp)}</td>
      <td
        className={`px-4 py-2 ${
          status === "completed" ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
      </td>
      <td className="px-4 py-2 inline-flex gap-2">
        <FaEdit
          onClick={onEdit}
          className="text-xl text-blue-300 cursor-pointer hover:text-blue-500"
        />
        <FaTrash
          onClick={onDelete}
          className="text-xl text-red-300 cursor-pointer hover:text-red-500"
        />
      </td>
    </tr>
  );
};

const TaskEditModal = ({ task, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
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

const DeleteConfirmationModal = ({ taskName, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p className="mb-6">
        Are you sure you want to delete the task <strong>{taskName}</strong>?
      </p>
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" innerText="Cancel" onClick={onCancel} />
        <Button variant="danger" innerText="Delete" onClick={onConfirm} />
      </div>
    </div>
  </div>
);

export default Records;
