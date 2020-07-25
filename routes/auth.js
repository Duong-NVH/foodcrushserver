const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  resgisterValidation,
  loginValidation,
} = require("../containers/authValidation");
const sendRegisterEmail = require("../containers/sendRegisterEmail");
//register
router.post("/register", async (req, res) => {
  //validation
  const { error } = resgisterValidation(req.body);
  if (error) {
    return res.send({
      message: error.details[0].message,
    });
  }
  const { userName, email, password } = req.body;
  //check existing email
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res.status(400).send({ message: "Email already exist" });
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create new user
  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.json({ message: "ok", id: savedUser._id });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  await sendRegisterEmail(req.body);
});
//login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.send({
      message: error.details[0].message,
    });
  }
  const { userName, password } = req.body;
  //check existing email
  const user = await User.findOne({ userName: userName });
  if (!user) {
    return res.status(400).send({ message: "Username doesn't exist" });
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send({ message: "Wrong password" });
  //Create token
  const token = jwt.sign({ _id: user._id }, process.env.TKN_SRC);
  res.header("auth-token", token).send({ message: "login success", token });
});
//change password...
module.exports = router;
