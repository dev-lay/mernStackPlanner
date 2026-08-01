const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routeTask = require("./routes/task.route");
const connectDB = require("./db/db");
const PORT = process.env.PORT || 3000;
const app = express();
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(express.json());
app.use(cors());
app.use("/api/tasks", routeTask);
