const router = require("express").Router();
const Location = require("../models/location");
const verifyToken = require("./verifyToken");

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
router.post("/", async (req, res) => {
  const { name, description, address } = req.body;
  const newLocation = new Location({
    name,
    description,
    address,
  });
  try {
    const loc = await newLocation.save();
    res.status(201).json(loc);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
//update location
router.patch("/:id", verifyToken, getLocation, async (req, res) => {
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
});
//delete location
router.delete("/:id", verifyToken, getLocation, async (req, res) => {
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
});

async function getLocation(req, res, next) {
  let location = {};
  try {
    location = await Location.find({ _id: req.params.id });
    if (location == null) {
      return res.status(404).json({ message: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.location = location[0];
  next();
}
module.exports = router;
