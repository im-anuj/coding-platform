import express from "express";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import questionsRoute from "./routes/questions.js";
import submissionsRoute from "./routes/submissions.js";

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/questions", questionsRoute);
app.use("/submissions", submissionsRoute);

app.listen(PORT, () => {
  console.log(`Port is running at http://localhost${PORT}`)
})