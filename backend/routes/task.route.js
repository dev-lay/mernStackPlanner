import express from "express";
const router = express.Router(); //router is an app instace in order to tidy up stufff yes it is same as app.use
import verifyAccessToken from "../middlewares/authMiddleware.js";
import {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
  getTask,
  deleteAll,
  deleteAccount,
} from "../controllers/task.controller.js";
router.use(verifyAccessToken);
//Routes
router.delete("/delete", deleteAccount);
//Delete a task
router.delete("/:id", deleteTask);
//Update a task
router.patch("/:id", updateTask);
//Get a specfic task
router.get("/:id", getTask);
//Get all the Tasks home router
router.get("/", getAllTasks);
//create a new task
router.post("/", createNewTask);
router.delete("/", deleteAll);
export default router;
