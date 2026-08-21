import mongoose from "mongoose";
const TaskSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      ref: "Users",
      required: true,
    },
    task: {
      type: "String",
      required: true,
    },
    taskDone: {
      type: Boolean,
    },
    color: {
      type: Object,
      enum: [
        { name: "orange", bg: "bg-orange-500", text: "text-orange-500" },
        { name: "blue", bg: "bg-blue-500", text: "text-blue-500" },
        { name: "green", bg: "bg-green-500", text: "text-green-500" },
        { name: "yellow", bg: "bg-yellow-300", text: "text-yellow-300" },
        { name: "pink", bg: "bg-pink-400", text: "text-pink-400" },
        { name: "gray", bg: "bg-gray-400", text: "text-gray-400" },
      ],
      default: { name: "gray", bg: "bg-gray-400", text: "text-gray-400" },
    },
  },
  {
    timestamps: true,
  },
);
const Task = mongoose.model("Task", TaskSchema);

export default Task;
