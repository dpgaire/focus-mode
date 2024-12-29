import { useState } from "react";
import { Button, HeaderTitle, TextInput } from "@/components/common";
import { generateUniqueId } from "@/utils";

const AddTask = ({ tasks, setTasks, setUpdateTask }) => {
  const [openForm, setOpenForm] = useState(false);
  const [task, setTask] = useState("");
  const [error, setError] = useState(""); // New state for error message
  const [suggestions, setSuggestions] = useState([]); // New state for suggestions

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

      // Update suggestions with the new task
      // setSuggestions((prevSuggestions) => [task, ...prevSuggestions.slice(0, 4)]); // Limit to 5 suggestions
      setTask(""); // Clear the task input
      setError(""); // Clear any error after successful submission
    }
  };

  // Handle input change
  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTask(inputValue);

    if (inputValue.trim()) {
      setError("");

      // Filter completed tasks, sort by timestamp (newest first), and slice top 2
      const recentTasks = tasks
        .filter((t) => t.status === "completed")
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

      // Update suggestions based on the top 2 recent tasks
      setSuggestions(recentTasks);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setTask(suggestion.taskName); // Autofill the input with the clicked suggestion
  };

  return (
    <div className="my-2 border rounded-lg p-2">
      <HeaderTitle headerText="Add New Task" />
      <Button
        variant="primary"
        innerText="Add Task"
        onClick={() => setOpenForm((prevState) => !prevState)}
      />
      {openForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-2 flex flex-col gap-2 p-2 border rounded-lg"
        >
          <TextInput
            name="task"
            value={task}
            onChange={handleInputChange}
            placeholder="Task name"
            error={error}
          />
          {suggestions?.length > 0 && (
            <ul className="mt-1 border border-gray-300 rounded-lg bg-white">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.taskName}
                </li>
              ))}
            </ul>
          )}
          <Button type="submit" variant="primary" innerText="Submit" />
        </form>
      )}
    </div>
  );
};

export default AddTask;
