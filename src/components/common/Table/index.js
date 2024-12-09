import React from "react";
import TableHead from "./TableHead";
import RecordRow from "./TableRow";

const Table = ({ columns, rowList, onEdit, onDelete }) => {
  return (
    <div className="max-h-96 overflow-auto">
      {rowList.length === 0 ? (
        <div className="text-gray-500 mt-4">No records available.</div>
      ) : (
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {rowList.map((item, index) => (
              <RecordRow
                key={index}
                Id={index + 1}
                record={item}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
