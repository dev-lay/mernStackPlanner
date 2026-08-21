import Task from "../models/task.model.js";
import User from "../models/user.model.js";
//deleteAccount
const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    await Task.deleteMany({ userid: id });

    const user = await User.findByIdAndDelete(id);
    //console.log(user.username);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.clearCookie("refreshToken", {
      httpOnly: true, //XSS script
      secure: true,
      sameSite: "strict", //CSRF protection
      maxAge: 0,
    });
    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userid: req.user.id });
    /*const username = await Task.find({ userid: req.user.id }).populate(
      "userid",
    );*/
    //console.log(`username: ${username} :end`);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createNewTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userid: req.user.id,
      username: req.user.username,
    };
    //console.log(taskData);
    const task = await Task.create(taskData);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      userid: req.user.id,
    });
    if (!task) return res.status(404).json({ massage: "Task not found" });
    res.status(200).json({ message: "Task is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userid: req.user.id },
      req.body,
      {
        returnDocument: "after",
      },
    );
    if (!task) return res.status(404).json({ massage: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTask = async (req, res) => {
  try {
    const task = await Task.findById({
      _id: req.params.id,
      userid: req.user.id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAll = async (req, res) => {
  try {
    const task = await Task.deleteMany({ userid: req.user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
  getTask,
  deleteAll,
  deleteAccount,
};
