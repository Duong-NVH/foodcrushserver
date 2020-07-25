const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TKN_SRC);

    const uid = verified._id;
    let user = {};
    try {
      user = await User.findById(uid);
      if (user == null) {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
    req.user = user;
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  next();
};

module.exports = verifyToken;
