import React from "react";
import "./Task.css";

const Task = ({ task }) => {
  const { title, dueDate, priority, status } = task;
  return (
    <div className="task-row">
      <div className="task-cell">{title}</div>
      <div className="task-cell">{dueDate}</div>
      <div className={`task-cell priority ${priority.toLowerCase()}`}>{priority}</div>
      <div className={`task-cell status ${status.toLowerCase().replace(" ", "-")}`}>{status}</div>
    </div>
  );
};

export default Task;

