const jwt = require("jsonwebtoken");
const Hobby = require("./models/hobby");
const Progress = require("./models/progress");
require("dotenv").config();

/*
  Checks that the request body has the expected data fields for a user
*/
module.exports.validateUser = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name is required.",
    });
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Password is required.",
    });
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "Email is required.",
    });
  }
  next();
};

/*
  Checks that the request body has the expected data fields for a hobby
*/
module.exports.validateHobby = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of hobby is required.",
    });
  }
  next();
};

/*
  Checks that the request body has the expected data fields for a progress
*/
module.exports.validateProgress = (req, res, next) => {
  if (!req.body.date) {
    res.status(400).send({
      message: "Date of progress is required.",
    });
  }
  if (!req.body.description) {
    res.status(400).send({
      message: "Description of progress is required.",
    });
  }
  next();
};

/*
Middleware function used in routes for hobbies and progression

verifyToken makes sure that the incoming request has an authorization token. If present,
it decodes it and extracts the userId, which it stores with req.
*/
module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
    }
    req.userId = decoded.id;
    next();
  });
};

/*
Middleware function used in routes for hobbies

verifyHobbyOwner is for use after a token is verified and the user id associated with the token
Has been put into req.userId. This can then be compared against the hobby's owner (id). Only the
user that created the hobby is authorized able to delete the hobby.
*/
module.exports.verifyHobbyOwner = async (req, res, next) => {
  const { id } = req.params;

  const hobby = await Hobby.findById(id);

  if (req.userId !== hobby.owner.toString()) {
    return res.status(401).send({ message: "User is not authorized." });
  }

  next();
};

/*
Middleware function used in routes for progression

verifyProgressOwner is for use after a token is verified and the user id associated with the token
Has been put into req.userId. This can then be compared against the hobby to which the progress is under.
Only the user that created the hobby and thus progress is authorized to update or delete the progress
*/
module.exports.verifyProgressOwner = async (req, res, next) => {
  const { progressId } = req.params;
  console.log(progressId);
  console.log(req.userId);

  const progress = await Progress.findById(progressId).populate("hobbyId");

  if (req.userId !== progress.hobbyId.owner.toString()) {
    return res.status(401).send({ message: "User is not authorized." });
  }

  next();
};
