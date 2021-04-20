const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const ExpressError = require("./util/ExpressError");

require("dotenv").config();

const mongodb_url = process.env.MONGODB_URL;

//MongoDB connection using url stored in .env
mongoose
  .connect(mongodb_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.error(error);
    }
  );

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

//Routes for progress, hobbies, and users
const hobbyRoutes = require("./routes/hobbies");
const progressRoutes = require("./routes/progression");
const userRoutes = require("./routes/users");
app.use("/hobbies/:id/progress", progressRoutes);
app.use("/hobbies", hobbyRoutes);
app.use("/user", userRoutes);

//Serve react frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  console.log(err);
  if (!err.message) err.message = "Something went wrong.";
  res.status(statusCode).send({ error: err });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`HobbyTracker backend API listening on port ${port}`);
});
