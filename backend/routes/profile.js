import express from "express";
import { users } from "../data/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, (req, res) => {

  const user = users.find(u => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  res.json({
    email: user.email,
    id: user.id
  });
});

export default router;