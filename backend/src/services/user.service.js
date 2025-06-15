import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.util.js";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config({
  path: "./.env",
});

export const registerService = async (username, email, password, role) => {
  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return {
        code: 400,
        message: "this email is already register",
        success: false,
        data: null,
      };
    }

    const newUser = await User.create({ username, email, password, role });

    const token = generateToken(newUser);

    return {
      code: 201,
      message: "User registered successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        role,
      },
      success: true,
    };
  } catch (error) {
    return {
      code: 501,
      message: "Error while user registring",
      data: null,
      success: false,
    };
  }
};

export const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        code: 400,
        success: false,
        data: null,
        message: "Invalid credentials.",
      };
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return {
        code: 400,
        success: false,
        data: null,
        message: "Invalid credentials.",
      };
    }
    const token = generateToken(user);
    if (!token) {
      return {
        code: 400,
        success: false,
        data: {
          token,
        },
        message: "Invalid credentials.",
      };
    }
    return {
        code: 200,
        success: true,
        data: {
          token,
        },
        message: "user login successfully",
      };
  } catch (error) {
    return {
      code: 501,
      message: "Error while user login",
      data: null,
      success: false,
    };
  }
};
