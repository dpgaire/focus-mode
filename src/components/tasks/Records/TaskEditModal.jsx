import { useState } from "react";

import { Button } from "@/components/common";

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
      <div className="bg-white p-6 rounded-lg w-96 text-black">
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
            <Button variant="outline" innerText="Cancel" onClick={onClose} />
            <Button variant="primary" innerText="Save Changes" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditModal;
