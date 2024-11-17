import React, { useState, useEffect } from "react";
import { Button } from ".";

const CurrentTask = ({ currentTask }) => {
  // State to track the time, starting at 25 minutes (25 * 60 = 1500 seconds)
  const [time, setTime] = useState(25 * 60);
  // const [time, setTime] = useState(1 * 20);

  const [alarm, setAlarm] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to format the time in MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to play the alarm sound
  const playAlarm = () => {
    if (alarm) {
      alarm.play().catch((e) => {
        console.error("Audio play failed:", e);
      });
    }
  };

  useEffect(() => {
    const audio = new Audio("/audio/triumph-jingle.mp3");
    audio.load(); // Explicitly load the audio file
    setAlarm(audio);
  }, []);

  // Start/Stop timer logic
  const toggleTimer = () => {
    if (isRunning) {
      // If timer is running, stop it
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      // If timer is not running, start it
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            // Stop the timer when it reaches 0
            clearInterval(id);
            setIsRunning(false);
            playAlarm();
            return 0; // Ensure it doesn't go below zero
          }
          return prevTime - 1; // Decrement the time every second
        });
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  // Cleanup on component unmount (if the timer is running)
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="my-2 border rounded-lg shadow-lg p-2">
      <span className="text-2xl font-bold">Current Task</span>
      <div className="p-4 my-2 flex justify-between items-center border rounded-lg shadow-lg">
        <span className="text-xl">{currentTask}</span>
        <span className="text-6xl ">{formatTime(time)}</span>
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
