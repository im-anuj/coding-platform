import express from "express";
import { questions } from "../data/questions.js";

const router = express.Router();

router.get("/", (req, res) => {
  const filteredQuestions = questions.map((q) => ({
    questionId: q.questionId,
    difficulty: q.difficulty,
    acceptance: q.acceptance,
    title: q.title,})
  );
  res.json({
    questions: filteredQuestions
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const question = questions.find(q => q.questionId === id);

   if (!question) {
    return res.status(411).json({});
  }

  res.json({
    question,
  });
})

export default router;