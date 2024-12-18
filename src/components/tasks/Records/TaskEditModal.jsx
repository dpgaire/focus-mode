import { useState } from "react";

import { Button, Modal, SelectField, TextInput } from "@/components/common";
import { statusOptions } from "@/utils/data";

const TaskEditModal = ({ record, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({ ...record });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
  };

  return (
    <Modal title="Edit Task">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            name="taskName"
            value={editedTask.taskName}
            onChange={handleInputChange}
            placeholder="Task Name"
          />
        </div>
        <div className="mb-4">
          <TextInput
            type="datetime-local"
            name="timestamp"
            value={new Date(editedTask.timestamp).toISOString().slice(0, 16)}
            onChange={handleInputChange}
            placeholder="Select date"
          />
        </div>
        <div className="mb-4">
          <SelectField
            value={editedTask.status || ""}
            label="Status"
            name="status"
            onChange={handleInputChange}
            options={statusOptions}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" innerText="Cancel" onClick={onClose} />
          <Button variant="primary" innerText="Save Changes" type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default TaskEditModal;
