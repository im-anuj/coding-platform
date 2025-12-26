const express = require('express');
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000

app.use(express.json());

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = []

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({ message: "Email and Password required"});
  }

  const userExist = USERS.find(u => u.email === email);
  if(userExist){
    return res.status(400).json({ message: "User already exist"});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  USERS.push({
    id: USERS.length+1,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: "User created successfully"});
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = USERS.find(u => u.email === email);
  if(!user){
    return res.status(400).json({message: "Invalid Email or Password"});
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({ message: "Invalid Password"});
  }

  res.json({message: "Login successfull"});
});

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.get('/questions', (req, res) => {
  res.json({
    success: true,
    questions: QUESTIONS
  });
  //return the user all the questions in the QUESTIONS array
});

//fake logged in user for now
const CURRENT_USER_ID = 1;

app.get("/submissions/:questionId", (req, res) => {
  const questionId = Number(req.params.questionId);

  const userSubmissions = SUBMISSION.filter((s) => {
    return s.userId === CURRENT_USER_ID &&
           s.questionId === questionId;
  });

  res.json({
    success: true,
    SUBMISSION: userSubmissions
  });
   // return the users submissions for this problem
});


app.post("/submissions/:questionId", (req, res) => {
  const questionId = Number(req.params.questionId);
  const { code } = req.body;

  if(!code){
    return res.status(400).json({
      success: false,
      message: "Code is required"
    });
  }

  const status = Math.random() > 0.5 ? "ACCEPTED" : "REJECTED";

  const submission = {
    id: SUBMISSION.length + 1,
    userId: CURRENT_USER_ID,
    questionId,
    code,
    status,
    submittedAt: new Date()
  }

  SUBMISSION.push(submission);

  res.json({
    success: true,
    submission
  })
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(PORT, () => {
  console.log(`Port is running at http://localhost${PORT}`)
})