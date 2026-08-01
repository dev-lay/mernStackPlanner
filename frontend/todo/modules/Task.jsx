import { FaTrashAlt, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function Task({ API_URL, tasks, setTasks, fetchTasks }) {
  const updateDone = async (id, done) => {
    try {
      await axios.patch(`${API_URL}/${id}`, {
        taskDone: done,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const toggleCheck = (id) => {
    const task = tasks.find((task) => task._id == id);
    if (!task) return;
    const nextDone = !task.taskDone;
    updateDone(id, nextDone);
    setTasks(
      tasks.map((todo) =>
        todo._id === id ? { ...todo, taskDone: nextDone } : todo,
      ),
    );
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const DeleteAll = async () => {
    try {
      await axios.delete(API_URL);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all tasks?",
    );
    if (!confirmed) return;

    try {
      DeleteAll();
      setTasks([]);
      toast.success("All tasks cleared successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete all tasks");
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteTask = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };
  return (
    <ul>
      {tasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((task) => (
          <li
            key={task._id}
            className="flex relative justify-between items-center mt-2 px-2 py-1 rounded-md navbar bg-base-100 shadow-sm"
          >
            <span
              className={`absolute rounded-l-md left-0 ${task.color.bg} w-1.5 h-full`}
            ></span>
            <span className="ml-5">
              <h1
                className={
                  task.taskDone ? "line-through text-gray-300" : "text-white"
                }
              >
                {task.task}
              </h1>
              <h2 className="text-[rgba(240,240,240,0.89)]">
                Created On{" "}
                <span className={`${task.color.text}`}>
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  <span className={"pl-1"}>
                    {new Date(task.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              </h2>
            </span>
            <span className="flex gap-2">
              <button onClick={() => DeleteTask(task._id)}>
                <FaTrashAlt className="text-red-700 cursor-pointer" />
              </button>
              <button onClick={() => toggleCheck(task._id)}>
                {task.taskDone ? (
                  <FaRegCheckCircle className="cursor-pointer  text-[rgba(240,240,240,0.89)]" />
                ) : (
                  <FaRegCircle className="cursor-pointer text-[rgba(240,240,240,0.89)]" />
                )}
              </button>
            </span>
          </li>
        ))}
      {tasks.length > 0 && (
        <button onClick={() => deleteAll()} className={"w-full mt-3 btn "}>
          Clear All
        </button>
      )}
    </ul>
  );
}
