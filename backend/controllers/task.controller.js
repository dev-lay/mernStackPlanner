const Task = require("../models/task.model");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};
const createNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ massage: "Task not found" });
    res.status(200).json({ message: "Task is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ massage: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAll = async (req, res) => {
  try {
    const task = await Task.deleteMany({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
  getTask,
  deleteAll,
};
