import React, { useState } from "react";
import { Button } from ".";
import { useEffect } from "react";

const AddTask = ({ tasks, setTasks, setUpdateTask }) => {
  const [openForm, setOpenForm] = useState(false);
  const [task, setTask] = useState("");

  // Handle task submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (task.trim()) {
      const newTask = {
        taskName: task,
        timestamp: new Date().toLocaleString(), // Capture the timestamp
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      // Store the updated tasks array in localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setUpdateTask(true);
      alert(`Task is added: ${task}`);
      setTask(""); // Clear the task input
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
            className="py-2 px-4 w-full border rounded-lg"
            placeholder="Task name"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button type="submit" variant="primary" innerText="Add" />
        </form>
      )}
    </div>
  );
};

export default AddTask;
