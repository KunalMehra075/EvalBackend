const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middlewares/authenticator.middleware");

require("dotenv").config();

const app = express();

//? <!----------------------------------------------- < Middlewares> ----------------------------------------------->

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  try {
    res.send("Welcome to Social");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
// app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
  }
  console.log(`Server is Running on port ${process.env.port}`);
});
