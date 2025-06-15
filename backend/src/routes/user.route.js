import Router from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/SignIn").post(register);
router.route("/").post(login);
router.route("/logout").post(authenticate, logout);
export default router;
