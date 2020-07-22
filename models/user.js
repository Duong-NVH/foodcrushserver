const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

module.exports = mongoose.model("User", userSchema);
