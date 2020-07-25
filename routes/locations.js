const router = require("express").Router();
const Location = require("../models/location");
const verifyToken = require("../containers/verifyToken");

//get all location
router.get("/", verifyToken, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//get location by id
router.get("/:id", verifyToken, getLocation, (req, res) => {
  res.json(res.location);
});
//create location
router.post("/", verifyToken, async (req, res) => {
  if (req.user.role > 0) {
    const { name, description, address, category } = req.body;
    const newLocation = new Location({
      name,
      description,
      address,
      category,
    });
    try {
      const loc = await newLocation.save();
      res.status(201).json(loc);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "You're not authorized as an admin",
    });
  }
});
//update location
router.patch("/:id", verifyToken, getLocation, async (req, res) => {
  if (req.user.role > 0) {
    const { name, description, address } = req.body;
    if (name != null) res.location.name = name;
    if (description != null) res.location.description = description;
    if (address != null) res.location.address = address;
    try {
      const updatedLocation = await res.location.save();
      res.json(updatedLocation);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "You're not authorized as an admin",
    });
  }
});
//delete location
router.delete("/:id", verifyToken, getLocation, async (req, res) => {
  if (req.user.role > 0) {
    try {
      await res.location.remove();
      res.json({
        message: `Location #${res.location._id} was deleted.`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "You're not authorized as an admin",
    });
  }
});

async function getLocation(req, res, next) {
  let location;
  try {
    location = await Location.findOne({ _id: req.params.id });
    if (location == null) {
      return res.status(404).json({ message: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.location = location;
  next();
}
module.exports = router;
