const router = require("express").Router();
const User = require("../models/user");
const verifyToken = require("../containers/verifyToken");

//get all users (admin)
router.get("/", verifyToken, async (req, res) => {
  if (req.user.role > 0) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      message: "You're not authorized as an admin",
    });
  }
});

//get user by id (self & admin)
router.get("/:id", verifyToken, async (req, res) => {
  if (req.user.role > 0 || req.params._id === req.user._id) {
    let user;
    try {
      user = await User.findById(req.params._id);
      if (user == null) {
        return res.json({
          message: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    return res.json(user);
  } else {
    return res.status(400).json({
      message: "You're not authorized.",
    });
  }
});
//update user info (self & admin)
//delete user (admin)

module.exports = router;
