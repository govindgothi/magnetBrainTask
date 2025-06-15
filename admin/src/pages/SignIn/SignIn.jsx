import React, { useState } from "react";
import "./SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    userPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.userPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Submitted:", formData);
    try {
        const res = await fetch('http://localhost:5500/api/v1/signIn?role=admin',{
            method:'POST',
            credentials:'include',
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.success === true){

        }
        return 
    } catch (error) {
        return error
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
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
          name="userPassword"
          placeholder="Enter password"
          value={formData.userPassword}
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

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignIn;
