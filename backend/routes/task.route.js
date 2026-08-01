const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
  getTask,
  deleteAll,
} = require("../controllers/task.controller.js");
//Routes
//Delete a task
router.delete("/:id", deleteTask);
//Update a task
router.patch("/:id", updateTask);
//Get a specfic task
router.get("/:id", getTask);
//Get all the Tasks
router.get("/", getAllTasks);
//create a new task
router.post("/", createNewTask);
router.delete("/", deleteAll);
module.exports = router;
