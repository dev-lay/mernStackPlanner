import express from "express";
import cookieParser from "cookie-parser";
import {
  register,
  login,
  verifyRefreshToken,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.use(cookieParser());

router.post("/signup", register);
router.post("/login", login);
router.post("/refresh", verifyRefreshToken);
router.post("/logout", logout);

export default router;
