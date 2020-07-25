const mongoose = require("mongoose");
const Location = require("./location");
const favouriteSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  list: {
    type: [Location],
    default: [],
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
