import { Button, HeaderTitle } from "@/components/common";
import React, { useState } from "react";
import RecordRow from "./RecordRow";
import TableHead from "./TableHead";
import TaskEditModal from "./TaskEditModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { formatCompletionDate } from "@/utils";

const Records = ({ tasks, setTasks, updateTask, deleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const sortedTasks = tasks.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const handleDownload = () => {
    const data = JSON.stringify(sortedTasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const currentDate = new Date().toISOString().split("T")[0];
    const link = document.createElement("a");
    link.href = url;
    link.download = `task_logs_${currentDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportLogs = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const text = await file.text();
          const importedTasks = JSON.parse(text);
          if (Array.isArray(importedTasks)) {
            // Merge imported tasks with existing tasks
            const mergedTasks = [...tasks, ...importedTasks];
            // Remove duplicates (if tasks have a unique 'id')
            const uniqueTasks = Array.from(
              new Map(mergedTasks.map((task) => [task.id, task])).values()
            );
            setTasks(uniqueTasks); // Call the update function to apply changes
          } else {
            throw new Error("Invalid file format");
          }
        } catch (error) {
          console.error("Error importing tasks:", error);
          alert("Failed to import tasks. Please check the file format.");
        }
      }
    };
    fileInput.click();
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete); // Pass the task to the parent component for deletion
      setTaskToDelete(null); // Close the confirmation modal
    }
  };

  return (
    <div className="my-2 p-2">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <HeaderTitle headerText="Records" />
        <div className="flex items-center justify-end flex-grow gap-1">
          <Button
            variant="primary"
            innerText={`Import Logs`}
            onClick={handleImportLogs}
          />
          <Button
            variant="primary"
            innerText={`Download Logs (${tasks.length})`}
            onClick={handleDownload}
          />
        </div>
      </div>
      <div className="max-h-96 overflow-auto">
        {sortedTasks.length === 0 ? (
          <div className="text-gray-500 mt-4">
            No completed tasks available.
          </div>
        ) : (
          <table className="min-w-full table-auto border mt-4">
            <TableHead />
            <tbody>
              {sortedTasks.map((task, index) => (
                <RecordRow
                  key={task.id || index}
                  task={task}
                  sn={index + 1}
                  formatCompletionDate={formatCompletionDate}
                  onEdit={() => setSelectedTask(task)}
                  onDelete={() => setTaskToDelete(task)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updatedTask) => {
            updateTask(updatedTask);
            setSelectedTask(null);
          }}
        />
      )}

      {taskToDelete && (
        <DeleteConfirmationModal
          taskName={taskToDelete.taskName}
          onConfirm={handleDeleteTask}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
};

export default Records;