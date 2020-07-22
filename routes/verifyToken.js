const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TKN_SRC);
    req.user = verified;
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  next();
};

module.exports = verifyToken;
