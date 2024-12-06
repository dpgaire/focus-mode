import React from "react";

const TableHead = () => {
  return (
    <thead>
      <tr className="bg-blue-500 text-left text-white">
        {["S/N", "Task Name", "Completion Date", "Status", "Actions"].map(
          (item) => (
            <HeadList title={item} />
          )
        )}
      </tr>
    </thead>
  );
};

export default TableHead;

const HeadList = ({ title }) => {
  console.log("title", title); // Should now log correctly
  return <th className="px-4 py-2 border-b">{title}</th>;
};
