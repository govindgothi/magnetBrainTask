import React, { useState } from "react";
import "./AddTask.css";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    email: "",
    dueDate: "",
    status: "pending",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task Created:", task);
    const data = await fetch("http://localhost:3000/api/v1/task/", {
      method: "POST",
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        email: task.email,
        dueDate: task.dueDate,
        status: "pending",
        priority: "medium",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include'
    });
    const res = await data.json();
    console.log(res)
    if (res.success === true) {
      alert("added");
    }
  };

  return (
    <div className="add-task-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <h2>Add New Task</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter user email"
          value={task.email}
          onChange={handleChange}
          required
        />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="on-progress">On Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AddTask;
