import { DownloadUploadLog, Table } from "@/components/common";
import React, { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { tasksColumn } from "@/utils/data";

const Records = ({ tasks, setTasks, updateTask, deleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const sortedTasks = tasks.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

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
      <DownloadUploadLog
        records={sortedTasks}
        setRecords={setTasks}
        logName="task_logs_"
      />
      {/* <div className="mt-4"> */}
      <Table
        columns={tasksColumn}
        rowList={filteredTasks}
        onEdit={setSelectedTask}
        onDelete={setTaskToDelete}
      />
      {/* </div> */}
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
