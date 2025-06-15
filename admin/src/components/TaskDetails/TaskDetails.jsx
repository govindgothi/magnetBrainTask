import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TaskDetails.css";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(true);

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => setTask(data));
  }, [id]);

  if (!task) return <p className="loading">Loading...</p>;

  return (
    <div className="task-details-container">
      <h2>{'task.title'}</h2>
      <p><strong>Description:</strong> {'task.description'}</p>
      <p><strong>Status:</strong> {'task.status'}</p>
      <p><strong>Due Date:</strong> {'new Date(task.dueDate).toLocaleDateString()'}</p>
    </div>
  );
};

export default TaskDetails;
