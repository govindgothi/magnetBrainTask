import { addTaskService, deleteTaskByIdService, getAllTaskService, getTaskByIdService, updateTaskByIdService } from "../services/task.service.js"
import { ApiResponse } from "../utils/apiResponse.util.js"

export const addTask = async (req,res)=>{
try {
    const {title,description,status,priority,email:userEmail,dueDate} = req.body
    console.log(title,description,status,priority,userEmail,dueDate)
    const adminId = req.user.id
    console.log(adminId)
    const response = await addTaskService(adminId,title,description,status,priority,userEmail,dueDate)
     console.log(response)
    const {data,code,message,success} = response
    return res.status(code).json(ApiResponse(code,message,success,data))
} catch (error) {
    return res.status(501).json(ApiResponse(501,"error while adding task",false,null))
}
}
export const getAllTask = async(req,res)=>{
try {
     const userData = req.user
     console.log("useradatta",userData)
     console.log( parseInt(req.query.page) , parseInt(req.query.limit) )
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // console.log(data,page,limit)
    const response = await getAllTaskService(userData, page, limit)
    const {data,code,message,success} = response
    return res.status(code).json(ApiResponse(code,message,success,data))
} catch (error) {
     return res.status(501).json(ApiResponse(501,"error while getting all task",false,null))
}
}
export const getTaskById = async (req,res)=>{
try {
    const {id} = req.params
    const response = await getTaskByIdService(id)
    const {data,code,message,success} = response
    return res.status(code).json(ApiResponse(code,message,success,data))
} catch (error) {
     return res.status(501).json(ApiResponse(501,"error while getTaskbyId task",false,null))
}
}
export const updateTaskById = async(req,res)=>{
try {
    console.log("object")
    const { id } = req.params;
    const updateField = req.body
    console.log(updateField,req)
    const response = await updateTaskByIdService(id,updateField)
    const {code,success,data,message} = response
    return res.status(code).json(ApiResponse(code,message,success,data))
} catch (error) {
     return res.status(501).json(ApiResponse(501,"error while updating task",false,null))
}
}
export const deleteTaskById = async(req,res)=>{
try {
    const {id} = req.params
    const response = await deleteTaskByIdService(id)
    const {data,code,message,success} = response
    return res.status(code).json(ApiResponse(code,message,success,data))
} catch (error) {
    return res.status(501).json(ApiResponse(501,"error while deleteing task",false,null))
}
}