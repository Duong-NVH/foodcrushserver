const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const app = express();
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to DB"));
app.use(express.json());

const locationsRouter = require("./routes/locations");
app.use("/location", locationsRouter);

app.listen(5000, () => console.log("Server Started"));
