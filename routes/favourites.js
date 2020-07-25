const router = require("express").Router();
const Favourite = require("../models/favourite");
const Location = require("../models/location");
const verifyToken = require("../containers/verifyToken");
const { db } = require("../models/location");
const favourite = require("../models/favourite");

//get user's list
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const flist = await Favourite.findOne({ userID: req.body.userID });
    return res.json(flist);
  } catch (error) {
    return res.json({ message: error.message });
  }
});
//update user's list (self & admin) need user id, location id
router.post("/addtofav/:id", verifyToken, async (req, res) => {
  if (req.user.role > 0 || req.user._id === req.params._id) {
    try {
      const flist = await Favourite.findOne({ userID: req.body.userID });
      const location = await Location.findById(req.body.locationID);
      let updatedList = [...flist.list, location];
      res.favourite._id = flist._id;
      res.favourite.userID = flist.userID;
      res.favourite.list = updatedList;
      const list = await res.favourite.save();
      res.json(list);
    } catch (error) {
      return res.json({ message: error.message });
    }
  } else {
    return res.json({ message: "You're not authorized." });
  }
});
//remove from favlist
router.post("/rmfromfav/:id", verifyToken, async (req, res) => {
  if (req.user.role > 0 || req.user._id === req.params._id) {
    try {
      const flist = await Favourite.findOne({ userID: req.body.userID });
      const location = await Location.findById(req.body.locationID);
      let updatedList = flist.list.filter((each) => each._id !== location._id);
      res.favourite._id = flist._id;
      res.favourite.userID = flist.userID;
      res.favourite.list = updatedList;
      const list = await res.favourite.save();
      res.json(list);
    } catch (error) {
      return res.json({ message: error.message });
    }
  } else {
    return res.json({ message: "You're not authorized." });
  }
});
module.exports = router;
