import React from "react";
import { Button } from ".";

const CurrentTask = () => {
  return (
    <div className="my-2">
      <span className="text-2xl font-bold">Current Task</span>
      <div className="p-4 my-2 flex justify-between items-center border rounded-lg shadow-lg">
        <span className="text-xl ">Project Configuration</span>
        <span className="text-xl font-bold">00:11:11</span>
        <Button
          variant="primary"
          innerText="start"
          onClick={() => console.log("clicked")}
        />
      </div>
    </div>
  );
};

export default CurrentTask;
