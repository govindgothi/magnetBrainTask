import { ApiResponse } from "../utils/apiResponse.util.js";

import dotenv from "dotenv";
import { loginService, registerService } from "../services/user.service.js";
dotenv.config({
  path: "./.env",
});

export const register = async (req, res) => {
  try {
    console.log("object",req.body)
    const { username, email, password } = req.body;
    console.log(req.query)
    const { role } = req.query;
    console.log(role)
    const response = await registerService(username, email, password, role);
    console.log(response);
    const { code, message, success, data } = response;
    return res.status(code).json(ApiResponse(code, message, success, data));
  } catch (error) {
    return res
      .status(500)
      .json(ApiResponse(500, "error while registring", false, null));
  }
};

export const login = async (req, res) => {
  try {
    console.log("object", req.body);
    const { email, password } = req.body;
    const response = await loginService(email, password);
    const { code, data, message, success } = response;
    res.cookie("token", data.token, {
      httpOnly: true, // protects from JS access on client
      maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json(ApiResponse(code, message, success, data));
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json(ApiResponse(500, "error while user loging", false, null));
  }
};
export const logout = async (req, res) => {
  try {
    console.log("hee");
    res.clearCookie("token");
    res.status(204).end();
    return;
  } catch (error) {
    return res.json(ApiResponse(501, "error while logout", false, null));
  }
};
