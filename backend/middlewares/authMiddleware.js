import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyAccessToken = async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    return res.status(401).json({ message: "Access token missing" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = {
      ...req.user,
      username: user.username,
    };
    //console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
export default verifyAccessToken;
