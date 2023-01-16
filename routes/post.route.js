const express = require("express");
const { authenticate } = require("../middlewares/authenticator.middleware");
const { PostsModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/", authenticate, async (req, res) => {
  let query = req.query;
  try {
    const data = await PostsModel.find(query);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

postRouter.post("/create", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const instance = new PostsModel(payload);
    await instance.save();
    res.send({ message: "Post Created", postdata: instance });
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
postRouter.delete("/delete/:id", authenticate, async (req, res) => {
  let postId = req.params.id;
  const userIDmakingreq = req.body.userID;
  try {
    const post = await PostsModel.findOne({ _id: postId });
    let useridinpost = post.userID;
    if (userIDmakingreq == useridinpost) {
      console.log(userIDmakingreq, useridinpost, "matched");
      await PostsModel.findByIdAndDelete({ _id: postId });
      res.send({ message: "Deleted Successfully", postdata: post });
    } else {
      res.json({ Err: "You are not authorised" });
    }
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
postRouter.patch("/update/:id", authenticate, async (req, res) => {
  let postId = req.params.id;
  const payload = req.body;
  const userIDmakingreq = req.body.userID;
  try {
    const post = await PostsModel.findOne({ _id: postId });
    let useridinpost = post.userID;
    if (userIDmakingreq == useridinpost) {
      // console.log(userIDmakingreq, useridinpost, "matched");
      let data = await PostsModel.findByIdAndUpdate({ _id: postId }, payload);
      res.send({ message: "Updated Successfully", postdata: data });
    } else {
      res.json({ Err: "You are not authorised" });
    }
  } catch (err) {
    console.log(err);
    res.send({ Error: "err " });
  }
});

module.exports = { postRouter };
