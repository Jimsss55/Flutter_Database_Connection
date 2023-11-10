const express = require("express");
const bodyParser = require("body-parser");
// const pool = require("./database");
const userRouter = require("./api/users/user.router");
const cors = require("cors");

// // require("dotenv").config();

// Initialize the express
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Use body parser middleware
app.use(bodyParser.json());

// Define this router inside
// If any user comes then it will pass to userRouter
app.use("/api/users", userRouter);

// // Convert the json object to the javascript
app.use(express.json());

app.listen(8888, () => {
  console.log("Server up and running on PORT: ");
});
