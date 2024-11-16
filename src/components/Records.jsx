import React from "react";

const Records = () => {
  return (
    <div className="my-2 flex flex-col gap-4  ">
      <span className="text-2xl font-bold">Records</span>
      <RecordList />
      <RecordList />
      <RecordList />
      <RecordList />
      <RecordList />
      <RecordList />
    </div>
  );
};

export default Records;

const RecordList = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 border rounded-lg shadow-lg">
      <span className="text-xl ">Project Configuration</span>
      <span className="text-xl font-bold">00:25:00</span>
      <span>Completed</span>
    </div>
  );
};
