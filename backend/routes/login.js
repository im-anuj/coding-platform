import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";
import { JWT_SECRET } from "../config/jwt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: "Email and Password Required"});
  }
  const user = users.find(u => u.email === email);

  if(!user){
    return res.status(400).json({message: "User not found"});
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({message: "Incorrect Password"});
  }

  const token = jwt.sign(
    {
      userId: user.id
    },
    JWT_SECRET
  );

  res.status(201).json({
    message: "Login successfull",
    token
  });

});

export default router;