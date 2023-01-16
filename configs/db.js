const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

let connection = mongoose.connect(process.env.mongoURL);

module.exports = { connection };
