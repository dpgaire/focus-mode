import { useState } from "react";

import { Button, HeaderTitle, TextInput } from "@/components/common";
import { generateUniqueId } from "@/utils";

const AddTask = ({ tasks, setTasks, setUpdateTask }) => {
  const [openForm, setOpenForm] = useState(false);
  const [task, setTask] = useState("");
  const [error, setError] = useState(""); // New state for error message

  // Handle task submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Task name cannot be empty"); // Show error if task is empty
    } else {
      const newTask = {
        id: generateUniqueId(),
        taskName: task,
        timestamp: new Date().toISOString(),
        status: "pending",
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      // Store the updated tasks array in localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setUpdateTask(true);
      setTask(""); // Clear the task input
      setError(""); // Clear any error after successful submission
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);

    // Clear the error message when user starts typing
    if (e.target.value.trim()) {
      setError("");
    }
  };

  return (
    <div className="my-2 border rounded-lg shadow-lg p-2">
      <HeaderTitle headerText="Add New Task" />
      <Button
        variant="primary"
        innerText="Add Task"
        onClick={() => setOpenForm((prevState) => !prevState)}
      />
      {openForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-2 flex flex-col gap-2 p-2 border rounded-lg shadow-lg"
        >
          <TextInput
            name="task"
            value={task}
            onChange={handleInputChange}
            placeholder="Task name"
            error={error}
          />
          <Button type="submit" variant="primary" innerText="Submit" />
        </form>
      )}
    </div>
  );
};

export default AddTask;
