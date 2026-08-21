import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
//logout
const logout = async (req, res) => {
  try {
    //console.log(jwt);
    res.clearCookie("refreshToken", {
      httpOnly: true, //XSS script
      secure: true,
      maxAge: 0, // Forces immediate deletion
    });
    res.status(200).json({ message: "Cookies cleared successfully" });
  } catch (error) {
    res.status(400).json({ message: "failed to clear cookie" });
    console.log(error.message);
  }
};
//verify refresh token
const verifyRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token cookie is missing" });
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // new access token
    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );
    //console.log(payload.id);
    const tokenId = uuidv4();
    //new refresh token
    const newRefreshToken = jwt.sign(
      {
        id: payload.id,
        tokenId: tokenId,
        familyId: payload.familyId,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
    //response
    //the names dismatch then one overwrite the other
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true, //XSS script
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const username = user.username;
    res.json({ newAccessToken, username });
  } catch (error) {
    console.log(error.message);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
//login function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ message: `User with username ${username} is not found` });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      return res.status(400).json({ message: "Invalid credentials!" });
    //access token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );
    //refresh token
    const tokenId = uuidv4(); //unique keys generator
    const familyId = uuidv4();
    const refreshToken = jwt.sign(
      { id: user._id, tokenId: tokenId, familyId: familyId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
    //response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //XSS script
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//register function
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const oldUser = await User.findOne({ username });
    if (oldUser)
      return res
        .status(400)
        .json({ message: `Username ${username} already exists! login please` });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json({
      message: `Welcome, ${username}! Your registration is complete.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export { login, register, verifyRefreshToken, logout };
