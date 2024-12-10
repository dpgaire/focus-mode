import { Button, HeaderTitle, Table } from "@/components/common";
import React, { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const columns = ["S/N", "Task Name", "Completion Date", "Status", "Actions"];

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

  const filteredTasks = tasks.map((task) => {
    // Filter tasks based on the completedAt field
    if (task.completedAt) {
      const { completedAt, ...taskWithoutCompletedAt } = task; // Remove completedAt
      return taskWithoutCompletedAt;
    }
    return task;
  });

  return (
    <div className="my-2 p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-2">
        <HeaderTitle headerText="Records" />
        <div className="flex-col lg:flex-row w-full lg:w-auto flex items-center justify-end flex-grow gap-1">
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
      <div className="mt-4">
        <Table
          columns={columns}
          rowList={filteredTasks}
          onEdit={setSelectedTask}
          onDelete={setTaskToDelete}
        />
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
