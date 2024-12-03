import { AddTask, CurrentTask, Info, Records } from "@/components";
import TaskGraph from "@/components/TaskGraph";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const ongoingTask = storedTasks.find((task) => task.status !== "completed");
    setCurrentTask(ongoingTask ? ongoingTask.taskName : null);
  }, [updateTask]);

  // Sync tasks with localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Function to update a task in the tasks array
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleDeleteTask = (taskToDelete) => {
    const filterTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(filterTasks);
  };

  return (
    <>
      <TaskGraph tasks={tasks} />
      <Info tasks={tasks} />
      {currentTask && (
        <CurrentTask currentTask={currentTask} setUpdateTask={setUpdateTask} />
      )}
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setUpdateTask={setUpdateTask}
      />
      <Records
        tasks={tasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    </>
  );
}
