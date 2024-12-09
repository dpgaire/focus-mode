import React from "react";

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr className="bg-primary text-left text-white">
        {columns.map((item, index) => (
          <HeadList key={index} title={item} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

const HeadList = ({ title }) => {
  return <th className="px-4 text-sm font-medium py-2 border-b">{title}</th>;
};
