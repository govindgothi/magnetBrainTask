import React, { useEffect } from "react";
import { tabs } from "./tabdata";
import { useState } from "react";
import AddTask from "../../components/AddTask/AddTask";
import AddUser from "../../components/AddUser/AddUser";
import Task from "../../components/Task/Task";
import "./DashBoardOption.css";
import Header from "../../components/Header/Header";
import TaskList from "../../components/TaskList/TaskList";
import { isAuthenticated } from "../../router/isAuthenticated";

const DashBoardOption = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [role, setRole] = useState('admin');
  let componentMap = {
    TaskList,
    AddUser,
    AddTask,
  };

  const ActiveComponent = componentMap[tabs[activeTab].component];

  const checkAuth = async () => {
    const data = await isAuthenticated();
    console.log("isAuthenticated", data);
    setRole(data.data);
    // console.log(data.data)
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      <Header></Header>
      <div className="user-tab-page">
        <div className="tab-heading">
          {role == "admin" &&
            tabs.map((tab, i) => (
              <p
                className={
                  tab.tabName === tabs[activeTab].tabName ? "bg" : "tabs"
                }
                key={i}
                onClick={() => setActiveTab(i)}
              >
                {tab.tabName}
              </p>
            ))}
            {role=='user' && (<p className="bg">{tabs[0].tabName}</p>)}
        </div>
        <div className="line"></div>
        <div className="parent-active-component">
      
            <ActiveComponent task={"task"} role={role} />
          
        </div>
      </div>
    </div>
  );
};

export default DashBoardOption;
