import React from "react";
import './DashBoard.css'
import { BsBarChartFill } from "react-icons/bs";
import { Link } from "react-router";

const DashBoard = () => {
  return (
    <div className="header">
      <div className="logo">
        <BsBarChartFill />
      </div>
      <div className="auth">
        <ul>Login</ul>
        <ul><Link to={'/DashBoard/SignIn'}>SignIn</Link></ul>
        <Login></Login>
      </div>
    </div>
  );
};

export default DashBoard;
