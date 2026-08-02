const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const routeTask = require("./routes/task.route");
const connectDB = require("./db/db");
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use(express.json());
app.use("/api/tasks", routeTask);
