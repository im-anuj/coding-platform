import express from "express";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import profileRoute from "./routes/profile.js"
import questionsRoute from "./routes/questions.js";
import submissionsRoute from "./routes/submissions.js";

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({message: "Hello World"});
});
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/me", profileRoute);
app.use("/questions", questionsRoute);
app.use("/submissions", submissionsRoute);

app.listen(PORT, () => {
  console.log(`Port is running at http://localhost${PORT}`)
})