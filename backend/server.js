import express from "express";
import "dotenv/config.js";
import cors from "cors";
import routeTask from "./routes/task.route.js";
import routeAuth from "./routes/user.route.js";
import connectDB from "./db/db.js";
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
app.use("/api/auth", routeAuth);
