import { formatCompletionDate } from "@/utils";
import { FaEdit, FaTrash } from "react-icons/fa";

const RecordRow = ({ record, Id, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      {Object.keys(record).map((key, index) => {
        // Dynamically render each column based on the data
        if (key === "id") {
          return (
            <td key={index} className="px-4 py-2">
              {Id}
            </td>
          );
        }

        if (key === "status") {
          return (
            <td key={index} className="px-4 py-2">
              <span
                className={`${
                  record[key] === "completed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {record[key]
                  ? record[key].charAt(0).toUpperCase() + record[key].slice(1)
                  : "Pending"}
              </span>
            </td>
          );
        }

        if (key === "timestamp") {
          return (
            <td key={index} className="px-4 py-2">
              {formatCompletionDate(record[key])}
            </td>
          );
        }

        return (
          <td key={index} className="px-4 py-2">
            {record[key]}
          </td>
        );
      })}
      <td className="px-4 py-2 inline-flex gap-2">
        <FaEdit
          onClick={onEdit}
          className="text-xl text-blue-300 cursor-pointer hover:text-blue-500"
        />
        <FaTrash
          onClick={onDelete}
          className="text-xl text-red-300 cursor-pointer hover:text-red-500"
        />
      </td>
    </tr>
  );
};

export default RecordRow;
