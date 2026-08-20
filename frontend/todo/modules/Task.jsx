import { FaTrashAlt, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Task({ API_URL, tasks, setTasks, fetchTasks }) {
  // Functions

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
    <div className="mt-6">
      {/* Task header */}
      {tasks.length > 0 && (
        <div className="flex justify-between items-center mb-3 px-1">
          <div>
            <h2 className="text-xl font-bold">Your Tasks</h2>

            <p className="text-sm text-base-content/50">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          <div className="badge badge-primary badge-lg">{tasks.length}</div>
        </div>
      )}

      {/* Tasks */}
      <ul className="space-y-3">
        {tasks
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((task) => (
            <li
              key={task._id}
              className="
                relative
                flex
                items-center
                justify-between
                gap-4
                bg-base-100
                rounded-xl
                px-5
                py-4
                shadow-sm
                hover:shadow-md
                transition-shadow
                overflow-hidden
              "
            >
              {/* Colored side indicator */}
              <span
                className={`
                  absolute
                  left-0
                  top-0
                  bottom-0
                  w-1.5
                  ${task.color.bg}
                `}
              />

              {/* Task information */}
              <div className="ml-2 min-w-0 flex-1">
                <h1
                  className={`
                    text-base
                    font-medium
                    
                    ${
                      task.taskDone
                        ? "line-through text-base-content/30"
                        : "text-base-content"
                    }
                  `}
                >
                  {task.task}
                </h1>

                <p className="text-xs text-base-content/50 mt-1">
                  Created{" "}
                  <span className={`${task.color.text} font-medium`}>
                    {new Date(task.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}

                    {" · "}

                    {new Date(task.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Delete */}
                <button
                  onClick={() => DeleteTask(task._id)}
                  className="
                    btn
                    btn-ghost
                    btn-sm
                    btn-square
                    text-error
                    hover:bg-error/10
                  "
                  title="Delete task"
                >
                  <FaTrashAlt className="text-base" />
                </button>

                {/* Complete */}
                <button
                  onClick={() => toggleCheck(task._id)}
                  className="
                    btn
                    btn-ghost
                    btn-sm
                    btn-square
                    hover:bg-primary/10
                  "
                  title={
                    task.taskDone ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  {task.taskDone ? (
                    <FaRegCheckCircle
                      className="
                        text-lg
                        text-primary
                      "
                    />
                  ) : (
                    <FaRegCircle
                      className="
                        text-lg
                        text-base-content/50
                      "
                    />
                  )}
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div
          className="
            card
            bg-base-100
            shadow-sm
            border
            border-base-300
          "
        >
          <div className="card-body items-center text-center py-12">
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
                mb-3
              "
            >
              <FaRegCircle className="text-2xl text-primary" />
            </div>

            <h2 className="font-bold text-lg">No tasks yet</h2>

            <p className="text-sm text-base-content/50">
              Add your first task above and start getting things done.
            </p>
          </div>
        </div>
      )}

      {/* Clear all */}
      {tasks.length > 0 && (
        <button
          onClick={() => deleteAll()}
          className="
            btn
            btn-outline
            btn-error
            w-full
            mt-5
          "
        >
          <FaTrashAlt />
          Clear All Tasks
        </button>
      )}
    </div>
  );
}
