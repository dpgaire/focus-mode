import React from "react";
import { Button } from ".";
import { useState } from "react";

const AddTask = () => {
  const [openForm, setOpenForm] = useState(false);
  const [task, setTask] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Task is added: ${task}`);
    setTask("");
  };
  return (
    <div className="my-2">
      <span className="text-2xl font-bold block mb-2">Add New Task</span>
      <Button
        type="submit"
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
