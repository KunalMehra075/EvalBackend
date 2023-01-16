const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const data = await UserModel.find();
    console.log("inside UserRouter");
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

userRouter.post("/register", async (req, res) => {
  let { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const instance = new UserModel({ name, email, gender, password: hash });
        await instance.save();
        res.send({ message: "User Created", user: instance });
      } else {
        res.send("Something went wrong");
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    let passinDB = user.password;
    bcrypt.compare(password, passinDB, async (err, hash) => {
      if (hash) {
        let token = jwt.sign(
          { userID: user._id },
          process.env.hashkey,
          (err, token) => {
            if (token) {
              res.send({ message: "Login Successful", token: token });
            } else {
              res.send({ Error: "Wrong Credentials" });
            }
          }
        );
      } else {
        res.send({ Err: "Something Went Wrong" });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
module.exports = { userRouter };
