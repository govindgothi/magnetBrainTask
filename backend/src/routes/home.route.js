import Router from "express";
import { home } from "../controllers/home.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/").get(authenticate, home);

export default router;
