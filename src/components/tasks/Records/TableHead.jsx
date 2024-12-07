import React from "react";

const TableHead = () => {
  return (
    <thead>
      <tr className="bg-primary text-left text-white">
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
  return <th className="px-4 text-sm font-medium  py-2 border-b">{title}</th>;
};
