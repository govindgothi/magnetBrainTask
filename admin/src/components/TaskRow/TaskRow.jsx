// TaskRow.jsx
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import "./TaskRow.css";

const TaskRow = ({ task, setView }) => {
  const [showOptions, setShowOptions] = useState(false);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "medium":
        return "status-medium";
      case "low":
        return "status-low";
      case "high":
        return "status-high";
      default:
        return "status-default";
    }
  };

  return (
    <div
      className="task-row"
      onContextMenu={() => {
        setView({ open: true, _id: task._id });
      }}
    >
      <div className="task-title">{task.title}</div>

      <div className={`task-status-btn ${getPriorityClass(task.priority)}`}>
        {task.status}
      </div>

      <div className="task-right">
        <div className="task-date">
          {/* {new Date(task.dueDate).toLocaleDateString()} */}
        </div>
      </div>
    </div>
  );
};

export default TaskRow;
