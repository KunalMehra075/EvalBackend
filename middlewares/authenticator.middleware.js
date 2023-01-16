const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.hashkey, function (err, decoded) {
      if (decoded) {
        let userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.json({ message: "Wrong Credentials" });
      }
    });
  } else {
    res.json("Please Login First");
  }
};
module.exports = { authenticate };
