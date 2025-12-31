import express from "express";
import bcrypt from "bcryptjs";
import { users } from "../data/users.js";

const router = express.Router();

router.post("/", async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: "Email and Password required"});
  }

  const userExist = users.find(u => u.email === email);
  if(userExist){
    return res.status(400).json({message: "User already exists"});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: users.length + 1,
    email,
    password: hashedPassword
  });

  res.status(201).json({message: "User created successfully"});

});

export default router;