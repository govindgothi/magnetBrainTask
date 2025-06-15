import Router from "express";

import { addTask, deleteTaskById, getAllTask, getTaskById, updateTaskById } from "../controllers/task.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
const router = Router();

router.route('/').post(authenticate,isAdmin,addTask)
router.route("/").get(authenticate, getAllTask);
router.route("/:id").get(getTaskById);
router.route('/:id').patch(authenticate,isAdmin,updateTaskById)
router.route('/:id').delete(authenticate,isAdmin,deleteTaskById)

export default router;
