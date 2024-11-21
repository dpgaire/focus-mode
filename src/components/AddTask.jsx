import React, { useState, useEffect } from "react";
import { Button } from ".";

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
        taskName: task,
        timestamp: new Date().toLocaleString(), // Capture the timestamp
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
      <span className="text-2xl font-bold block mb-2">Add New Task</span>
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
          <input
            className={`py-2 px-4 w-full border rounded-lg ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Task name"
            name="task"
            value={task}
            onChange={handleInputChange}
          />
          {error && (
            <div className="text-red-500 text-sm mt-1">
              {error} {/* Display error message */}
            </div>
          )}
          <Button type="submit" variant="primary" innerText="Submit" />
        </form>
      )}
    </div>
  );
};

export default AddTask;
