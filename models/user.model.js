const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  gender: String,
  password: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
