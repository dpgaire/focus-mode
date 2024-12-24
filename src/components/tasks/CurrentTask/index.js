import React, { useState, useEffect, useRef } from "react";
import { formatTime } from "@/utils";
import { HeaderTitle, Button } from "@/components/common";

const CurrentTask = ({ currentTask, setUpdateTask }) => {
  const totalTime = 60 * 25; 
  // const totalTime = 60 * 1; 

  const [time, setTime] = useState(totalTime); // For testing with 10 seconds
  const [alarm, setAlarm] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);
  const pausedTimeRef = useRef(time);
 

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

  const progressPercentage = ((totalTime - time) / totalTime) * 100;


  return (
    <div className="relative my-4 border rounded-lg p-4  overflow-hidden">
    <div
      className="absolute inset-0 z-0 rounded-lg pointer-events-none"
      style={{
        background: `conic-gradient(
          #3b82f6 ${progressPercentage * 3.6}deg,
          #FFFFFF ${progressPercentage * 3.6}deg
        )`,
        maskImage: "linear-gradient(white, white) padding-box, border-box",
        WebkitMaskImage: "linear-gradient(white, white) padding-box, border-box",
      }}
    ></div>

    <div className="relative z-10">
      <HeaderTitle headerText="Current Task" />
      <div className="flex justify-between items-center flex-wrap mb-4">
        <span className="text-lg font-semibold">{currentTask}</span>
        <span className="text-4xl font-bold">{formatTime(time)}</span>
        <Button
          variant={isRunning ? "danger" : "primary"}
          innerText={isRunning ? "Stop" : "Start"}
          onClick={toggleTimer}
        />
      </div>
    </div>
  </div>
 
  );
};

export default CurrentTask;
