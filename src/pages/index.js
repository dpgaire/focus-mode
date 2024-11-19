import { AddTask, CurrentTask, Info, Records } from "@/components";
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

  return (
    <>
      <Info />
      {currentTask && (
        <CurrentTask currentTask={currentTask} setUpdateTask={setUpdateTask} />
      )}
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setUpdateTask={setUpdateTask}
      />
      <Records tasks={tasks} />
    </>
  );
}
