import { ApiResponse } from "../utils/apiResponse.util.js"

export const home = async(req,res)=>{
try {
    const data = req.user.role
    console.log(data)
    return res.status(200).json(ApiResponse(200,'user is login',true,data))
} catch (error) {
    return res.status(200).json(ApiResponse(404,'not login',false,null))
}
}