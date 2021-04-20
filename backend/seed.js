require("dotenv").config();

const mongoose = require("mongoose");

const mongodb_url = process.env.MONGODB_URL;

const Hobby = require("./models/hobby");
const User = require("./models/user");
const Progress = require("./models/progress");
const bcrypt = require("bcrypt");

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

const seedDB = async () => {
  await User.deleteMany({});
  await Hobby.deleteMany({});
  await Progress.deleteMany({});

  const user = new User({
    name: "Scott",
    email: "sbadgett11@gmail.com",
    password: bcrypt.hashSync("123", 12),
  });

  const guitar = new Hobby({
    name: "Guitar",
    goal: "Learn Let it Go",
  });

  const reading = new Hobby({
    name: "Reading",
    goal: "Finish OathBringer",
  });

  user.hobbies.push(guitar);
  user.hobbies.push(reading);
  reading.owner = user._id;
  guitar.owner = user._id;

  await reading.save();
  await guitar.save();
  await user.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
