const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.registerUser = async (req, res) => {
  //Create new user
  const user = new User({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 12),
    email: req.body.email,
  }).populate("hobbies");

  await user.save();

  //Create auth token
  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    message: "User registered successfully",
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken: token,
    hobbies: user.hobbies,
  });
};

module.exports.login = async (req, res) => {
  //Look up the user, populate hobbies and progression
  User.findOne({
    email: req.body.email,
  })
    .populate({
      path: "hobbies",
      populate: {
        path: "progression",
      },
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      //Check that the password matches
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      //Create auth token if password is valid
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      //Send data and auth token back if successsfully signed in
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
        hobbies: user.hobbies,
      });
    });
};
