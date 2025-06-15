import { useState, useEffect } from "react";
import "./TaskList.css";
import Pagination from "../Pagination/Pagination";
import TaskRow from "../TaskRow/TaskRow";
import ViewTask from "../ViewTask/ViewTask";

const TaskList = ({role}) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const [view, setView] = useState({
    open: false,
    _id: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        `http://localhost:3000/api/v1/task?page=${currentPage}&limit=${limit}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setTasks(data.data.taskData);
        setTotalPages(Math.ceil(data.data.totalTasks / 5));
      }
    };

    fetchTasks();
  }, [currentPage]);
  console.log("tasks", tasks);
  return (
    <div>
      <h3>Task List</h3>
      {tasks && tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <TaskRow key={task._id} task={task} setView={setView} />
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {view.open === true && (
        <ViewTask _id={view._id} setView={setView} role={role}></ViewTask>
      )}
    </div>
  );
};

export default TaskList;
