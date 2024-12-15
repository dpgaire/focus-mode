import React from "react";

import { RecordsTable } from "@/components/common";
import TaskEditModal from "./TaskEditModal";
import { tasksColumn } from "@/utils/data";

const Records = ({ tasks, setTasks, updateTask, deleteTask }) => {
  const sortedTasks = tasks.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const filteredTasks = sortedTasks.map((task) => {
    // Filter tasks based on the completedAt field
    if (task.completedAt) {
      const { completedAt, ...taskWithoutCompletedAt } = task; // Remove completedAt
      return taskWithoutCompletedAt;
    }
    return task;
  });

  return (
    <RecordsTable
      records={filteredTasks}
      setRecords={setTasks}
      columns={tasksColumn}
      recordType="task"
      onEditRecord={updateTask}
      onDeleteRecord={deleteTask}
      EditModal={TaskEditModal}
    />
  );
};

export default Records;
