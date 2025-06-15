import mongoose from "mongoose";
import Task from "../models/task.model.js";
//------------------    Add Task-------------------------------------------------------------------------
export const addTaskService = async (
  adminId,
  title,
  description,
  status,
  priority,
  userEmail,
  dueDate
) => {
  try {
    console.log("object");
    if (!adminId) {
      return {
        code: 401,
        message: "adminId credential is not valid",
        success: false,
        data: null,
      };
    }
    console.log(adminId);
    if (!title || !description || !userEmail || !dueDate) {
      return {
        code: 401,
        message: "task information is required",
        success: false,
        data: null,
      };
    }

    const task = await Task.create({
      adminId,
      userEmail,
      title,
      description,
      status,
      priority,
      dueDate,
    });
    console.log(task);
    if (task && task._id) {
      console.log("object task");
      return {
        code: 201,
        message: "task added succeafully",
        success: true,
        data: task.title,
      };
    }
    return {
      code: 401,
      message: "task not added",
      success: false,
      data: null,
    };
  } catch (error) {
    return {
      code: 401,
      message: "error while adding task",
      success: false,
      data: null,
    };
  }
};

//------------------  Get All Add Task-------------------------------------------------------------------------

export const getAllTaskService = async (userData, page, limit) => {
  try {
    if (!userData) {
      return {
        code: 401,
        message: "user email is not found",
        success: false,
        data: null,
      };
    }
    const skip = (page - 1) * limit;
    let findBy, value;
    if (userData.role === "admin") {
      findBy = "adminId";
      value = userData.id;
    } else {
      findBy = "userEmail";
      value = userData.email;
    }
    console.log("hello", [findBy], value);
    const taskData = await Task.find({ [findBy]: value })
      .skip(skip)
      .limit(limit);
    console.log(taskData);
    const totalTasks = await Task.countDocuments({ [findBy]: value });
    console.log(totalTasks);

    return {
      success: true,
      code: 200,
      message: "data is fetched",
      data: { totalTasks, taskData },
    };
  } catch (error) {}
};

//------------------   Get Task  By Id-------------------------------------------------------------------------

export const getTaskByIdService = async (taskId) => {
  try {
    if (!taskId) {
      return {
        code: 401,
        message: "task id is not found",
        success: false,
        data: null,
      };
    }
    const task = await Task.findById(taskId);
    if (task && task._id) {
      return {
        code: 201,
        message: "task is successfully fetched",
        success: true,
        data: task,
      };
    }
    return {
      code: 401,
      message: "task is information is not matched",
      success: false,
      data: null,
    };
  } catch (error) {
    return {
      code: 401,
      message: "task is information is not matched",
      success: false,
      data: null,
    };
  }
};

//------------------   update Task -------------------------------------------------------------------------

export const updateTaskByIdService = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        code: 400,
        message: "Invalide Id",
        success: false,
        data: null,
      };
    }
    console.log("object", id);
    console.log(data);
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: data }
      // { new: true, runValidators: true }
    );
    console.log(updateTaskByIdService);
    return {
      success: true,
      data: updatedTask,
      message: "update successfully",
      code: 201,
    };
  } catch (error) {}
};

//------------------  Delete Task-------------------------------------------------------------------------

export const deleteTaskByIdService = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task._id) {
      return {
        code: 401,
        message: "error while fetching task by Id",
        success: false,
        data: null,
      };
    }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return {
      code: 201,
      message: "Task is deleted",
      success: true,
      data: task._id,
    };
  } catch (error) {
    return {
      code: 401,
      message: "Error while task delete",
      success: false,
      data: null,
    };
  }
};
