import express from "express";
import { auth } from "../middleware/auth.js";
import { submissions } from "../data/submissions.js";

const router = express.Router();

const CURRENT_USER_ID = 1;

router.get("/:questionId", auth, (req, res) => {
  const questionId = req.params.questionId;

  const userSubmissions = submissions.filter((s) => { 
    return s.userId === req.userId &&  
    s.questionId === questionId
  });

  res.json({
    submissions: userSubmissions
  });
});

router.post("/", auth, (req, res) => {
  const questionId = req.body.questionId;
  const code =  req.body.code;

  if(!code){
    return res.status(400).json({ message: "Code required"});
  }

  const status = Math.random() > 0.5 ? "ACCEPTED" : "REJECTED";

  const submission = {
    submissionId: submissions.length + 1,
    userId: req.userId,
    questionId,
    code,
    status,
    submittedAt: new Date()
  }

  submissions.push(submission);

  res.json({
    success: true,
    submission
  })
});

export default router;