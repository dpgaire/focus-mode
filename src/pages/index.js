import { AddTask, CurrentTask, Info, Records } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    if (storedTasks.length > 0) {
      // Set the most recently added task as the current task
      setCurrentTask(storedTasks[storedTasks.length - 1].taskName);
    }
  }, [updateTask]);

  return (
    <>
      <Info />
      <CurrentTask currentTask={currentTask} />
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setUpdateTask={setUpdateTask}
      />
      <Records tasks={tasks} currentTask={currentTask} />
    </>
  );
}
