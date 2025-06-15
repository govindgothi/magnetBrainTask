import React, { useState } from "react";
import "./AddUser.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const res = await fetch(
      "http://localhost:3000/api/v1/user/SignIn?role=user",
      {
        method: "POST",
        body: JSON.stringify({
          username: formData.userName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
         headers: {
        "Content-Type": "application/json",
      },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success) {
      alert("user added");
    }
  };

  return (
    <div className="add-user-container">
      <form className="add-user-form" onSubmit={handleSubmit}>
        <h2>Add New User</h2>

        <label>User Name</label>
        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default AddUser;
