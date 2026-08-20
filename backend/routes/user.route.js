const {
  register,
  login,
  verifyRefreshToken,
  logout,
} = require("../controllers/auth.controller");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
exports.router = router;
router.use(cookieParser());
router.post("/signup", register);
router.post("/login", login);
router.post("/refresh", verifyRefreshToken);
router.post("/logout", logout);
module.exports = router;
