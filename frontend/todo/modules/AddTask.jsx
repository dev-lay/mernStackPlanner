import { FaRegCircle } from "react-icons/fa6";
import { useState } from "react";
import Task from "../modules/Task";
import axios from "axios";
import { toast } from "react-toastify";
export default function AddTask() {
  const API_URL = import.meta.env.VITE_API_URL;
  const col = [
    { name: "orange", bg: "bg-orange-500", text: "text-orange-500" },
    { name: "blue", bg: "bg-blue-500", text: "text-blue-500" },
    { name: "green", bg: "bg-green-500", text: "text-green-500" },
    { name: "yellow", bg: "bg-yellow-300", text: "text-yellow-300" },
    { name: "pink", bg: "bg-pink-400", text: "text-pink-400" },
    { name: "gray", bg: "bg-gray-400", text: "text-gray-400" },
  ];
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      const tasks = res.data;
      if (tasks) {
        setTasks(tasks);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [taskName, setTaskName] = useState("");
  const [clickedColor, setClickedColor] = useState({
    name: "gray",
    bg: "bg-gray-400",
    text: "text-gray-400",
  });
  const [tasks, setTasks] = useState([]);
  const handleAddTask = async () => {
    if (!taskName) {
      setClickedColor({
        name: "gray",
        bg: "bg-gray-400",
        text: "text-gray-400",
      });
      return toast.error("Task name is required", {
        className: "alert alert-error alert-soft",
      });
    }
    try {
      const response = await axios.post(
        API_URL,
        {
          task: taskName,
          taskDone: false,
          color: clickedColor,
        },
        {
          withCredentials: true,
        },
      );
      setTasks([...tasks, response.data]);
      setTaskName("");
      toast.success("Task is added successfully");
      setClickedColor({
        name: "gray",
        bg: "bg-gray-400",
        text: "text-gray-400",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to add task", {
        className: "alert alert-error alert-soft",
      });
    }
  };

  return (
    <>
      <div
        className={
          "flex content-between  rounded-md px-3 py-2 border-none items-center gap-3 mt-2 navbar bg-neutral text-neutral-content"
        }
      >
        <input
          type="text"
          placeholder="write your task here"
          className=" input input-neutral outline-none broder-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <ul className="flex">
          {col.map((color, index) => (
            <li key={index}>
              <FaRegCircle
                onClick={() => setClickedColor(color)}
                className={`${color.bg} ${color.text} cursor-pointer rounded-full m-1 ${
                  clickedColor === color
                    ? "border-2 border-white"
                    : "border-none"
                }`}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={handleAddTask}
          className=" cursor-pointer btn btn-ghost"
        >
          Submit
        </button>
      </div>
      <Task
        API_URL={API_URL}
        tasks={tasks}
        setTasks={setTasks}
        fetchTasks={fetchTasks}
      />
    </>
  );
}
