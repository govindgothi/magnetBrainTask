import React from "react";
import "./Header.css";
import { BsBarChartFill } from "react-icons/bs";
import { Link } from "react-router";
import { useState } from "react";
import Login from "../Login/Login";
import { useEffect } from "react";
import { isAuthenticated } from '../../router/isAuthenticated.js'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [loginOption, setLoginOption] = useState(true);
  const navigate = useNavigate();
  const handleCloseLogin = () => {
    setIsLoginOpen(false), navigate("/");
  };

  const handleLogout = async () => {
    const data = await fetch("http://localhost:3000/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    });
    const res = await data.json();
    navigate('/')
    window.location.reload();
    console.log(res)
    if(res){
      
    }
  };

  const checkAuth = async () => {
    const data = await isAuthenticated();
    console.log(data)
    if (data) {
      setIsLoginOpen(false);
      setLoginOption(false);
      navigate("/DashBoard");
    } else {
      setIsLoginOpen(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <BsBarChartFill /> <span>DashBoard</span>
      </div>
      <div className="auth">
        {loginOption && (
          <ul onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</ul>
        )}
        {loginOption && (
          <ul ><Link to={'/SignIn'}>SignIn</Link></ul>
        )}
        {!loginOption && (
          <ul>
            <Link onClick={handleLogout}>Logout</Link>
          </ul>
        )}
      </div>
      {isLoginOpen && (
        <div className="overlay">
          <div className="modal">
            <Login />
            <button className="close-btn" onClick={handleCloseLogin}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
