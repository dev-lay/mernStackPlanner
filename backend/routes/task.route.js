const express = require("express");
const router = express.Router(); //router is an app instace in order to tidy up stufff yes it is same as app.use
const verifyAccessToken = require("../middlewares/authMiddleware.js");
const {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
  getTask,
  deleteAll,
  deleteAccount,
} = require("../controllers/task.controller.js");
//const { router } = require("./user.route.js");
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
router.post("/", verifyAccessToken, createNewTask);
router.delete("/", deleteAll);
module.exports = router;
