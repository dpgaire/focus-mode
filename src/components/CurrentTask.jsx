import React, { useState, useEffect, useRef } from "react";
import { Button } from ".";

const CurrentTask = ({ currentTask }) => {
  // State to track the remaining time, starting at 25 minutes (25 * 60 = 1500 seconds)
  const [time, setTime] = useState(25 * 60);
  // const [time, setTime] = useState(20); // For testing with 20 seconds

  const [alarm, setAlarm] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);
  const pausedTimeRef = useRef(time);

  // Function to format the time in HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Function to play the alarm sound
  const playAlarm = () => {
    if (alarm) {
      alarm.play().catch((e) => {
        console.error("Audio play failed:", e);
      });
    }
  };

  // Load the alarm audio on component mount
  useEffect(() => {
    const audio = new Audio("/audio/triumph-jingle.mp3");
    audio.load(); // Explicitly load the audio file
    setAlarm(audio);
  }, []);

  // Update the timer using the actual elapsed time
  const updateTime = () => {
    const now = Date.now();
    const elapsedTime = Math.floor((now - startTimeRef.current) / 1000);
    const newTime = Math.max(0, pausedTimeRef.current - elapsedTime);

    if (newTime <= 0) {
      clearInterval(intervalIdRef.current);
      setIsRunning(false);
      playAlarm();
    }

    setTime(newTime);
  };

  // Start/Stop timer logic
  const toggleTimer = () => {
    if (isRunning) {
      // Stop the timer
      clearInterval(intervalIdRef.current);
      pausedTimeRef.current = time; // Save the paused time
      setIsRunning(false);
    } else {
      // Start the timer
      startTimeRef.current = Date.now();
      intervalIdRef.current = setInterval(updateTime, 1000);
      setIsRunning(true);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div className="my-2 border rounded-lg shadow-lg p-2">
      <span className="text-2xl font-bold">Current Task</span>
      <div className="p-4 my-2 flex justify-between items-center border rounded-lg shadow-lg">
        <span className="text-xl">{currentTask}</span>
        <span className="md:text-6xl">{formatTime(time)}</span>
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
