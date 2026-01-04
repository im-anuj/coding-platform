import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  // const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);

    req.userId = decoded.userId;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}