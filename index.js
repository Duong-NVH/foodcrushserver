const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const locationsRouter = require("./routes/locations");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
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
//private route
app.use("/api/location", locationsRouter);
app.use("/api/user", userRouter);
//auth route
app.use("/auth", authRouter);

app.listen(process.env.PORT || 5000, () => console.log("Server Started"));
