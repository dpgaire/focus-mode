import React, { useState, useEffect, useRef } from "react";
import { Button } from ".";

const CurrentTask = ({ currentTask, setUpdateTask }) => {
  const [time, setTime] = useState(60 * 25); // For testing with 10 seconds
  // const [time, setTime] = useState(2); // For testing with 10 seconds
  const [alarm, setAlarm] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);
  const pausedTimeRef = useRef(time);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const playAlarm = () => {
    if (alarm) {
      alarm.play().catch((e) => {
        console.error("Audio play failed:", e);
      });
    }
  };

  useEffect(() => {
    const audio = new Audio("/audio/triumph-jingle.mp3");
    audio.load();
    setAlarm(audio);
  }, []);

  const updateTime = () => {
    const now = Date.now();
    const elapsedTime = Math.floor((now - startTimeRef.current) / 1000);
    const newTime = Math.max(0, pausedTimeRef.current - elapsedTime);

    if (newTime <= 0) {
      clearInterval(intervalIdRef.current);
      setIsRunning(false);
      playAlarm();

      // Update tasks when time reaches 0
      setTimeout(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = storedTasks.map((task) =>
          task.taskName === currentTask
            ? {
                ...task,
                status: "completed",
                completedAt: new Date().toISOString(),
              }
            : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setUpdateTask((prev) => !prev); // Trigger parent update
      }, 3000); // Wait for audio to play before updating
    }

    setTime(newTime);
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalIdRef.current);
      pausedTimeRef.current = time;
      setIsRunning(false);
    } else {
      startTimeRef.current = Date.now();
      intervalIdRef.current = setInterval(updateTime, 1000);
      setIsRunning(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div className="my-2 border rounded-lg shadow-lg p-2">
      <span className="lg:text-2xl text-xl font-bold">Current Task</span>
      <div className="p-4 my-2 flex justify-between flex-wrap items-center border rounded-lg shadow-lg">
        <span className="text-xl">{currentTask}</span>
        <span className="text-2xl md:text-6xl">{formatTime(time)}</span>
        <Button
          variant={isRunning ? "danger" : "primary"}
          innerText={isRunning ? "Stop" : "Start"}
          onClick={toggleTimer}
        />
      </div>
    </div>
  );
};

export default CurrentTask;
