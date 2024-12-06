import { FaEdit, FaTrash } from "react-icons/fa";

const RecordRow = ({ task, sn, formatCompletionDate, onEdit, onDelete }) => {
  const { taskName, timestamp, status } = task;

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2">{sn}</td>
      <td className="px-4 py-2">{taskName}</td>
      <td className="px-4 py-2">{formatCompletionDate(timestamp)}</td>
      <td
        className={`px-4 py-2 ${
          status === "completed" ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
      </td>
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
