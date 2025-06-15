import React, { useState } from "react";
import "./ViewTask.css";
import { useEffect } from "react";

const ViewTask = ({ _id, setView, role }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    setEditMode(false);
  };

  const fetchTaskById = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/task/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      const databyId = await res.json();
      console.log(databyId.data);
      if (databyId) {
        setData(databyId.data);
        return databyId;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching task by ID:", error.message);
    }
  };

  const updateTaskById = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/task/${_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
        }),
      });
      const updatedData = await res.json();
      console.log(updatedData);
      if (updatedData.success == true) {
        alert("ok");
      }
      // if (databyId) {
      //   setData(databyId.data);
      //   return databyId;
      // } else {
      return null;
      // }
    } catch (error) {
      console.error("Error fetching task by ID:", error.message);
    }
  };

  useEffect(() => {
    if (_id && _id !== "") {
      fetchTaskById();
    }
  }, [_id]);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="edit-btn-box">
          {role === "admin" && (
            <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
              Edit
            </button>
          )}
        </div>
        <h2>Task Details</h2>
        {data && (
          <div>
            <div className="form-group">
              <label htmlFor="email">title</label>
              <input
                type="title"
                name="title"
                placeholder="Enter title"
                value={data.title}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">description</label>
              <textarea
                name="description"
                placeholder="Enter task description"
                value={data.description}
                onChange={handleChange}
                required
                disabled={!editMode}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Due Date</label>
              <input
                name="date"
                type="date"
                value={data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                type="text"
                name="priority"
                value={data.priority}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={data.status}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="pending">Pending</option>
                <option value="on-progress">On Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="edit-btn-box">
              {/* <button className="close-btn">close</button> */}
              {role === "admin" && (
                <button className="save-btn" onClick={updateTaskById}>
                  save
                </button>
              )}
              <button
                className="close"
                onClick={() => setView({ open: false, _id: "" })}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTask;

/*
<div className="modal-content">
          <label>Title:</label>
          {editMode ? (
            <input name="title" value={data.title} onChange={handleChange} />
          ) : (
            <p>{data.title}</p>
          )}

          <label>Description:</label>
          {editMode ? (
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          ) : (
            <p>{data.description}</p>
          )}

          <label>Status:</label>
          {editMode ? (
            <select name="status" value={data.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="on-progress">On Progress</option>
              <option value="complete">Complete</option>
            </select>
          ) : (
            <p>{data.status}</p>
          )}

          <label>Priority:</label>
          {editMode ? (
            <select
              name="priority"
              value={data.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          ) : (
            <p>{data.priority}</p>
          )}

          <label>Due Date:</label>
          {editMode ? (
            <input
              type="date"
              name="dueDate"
              value={data.dueDate.split("T")[0]}
              onChange={handleChange}
            />
          ) : (
            <p>{new Date(data.dueDate).toLocaleDateString()}</p>
          )}
        </div>

        <div className="modal-actions">
          {editMode ? (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
          <button className="close-btn" onClick={()=>{setView({open:false,_id:""})}}>
            Close
          </button>
        </div>

*/
