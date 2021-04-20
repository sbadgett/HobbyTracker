const express = require("express");
const { validateUser } = require("../middleware");
const catchAsync = require("../util/catchAsync");
const router = express.Router();
const { registerUser, login } = require("../controllers/users");

router.post("/register", validateUser, catchAsync(registerUser));

router.post("/login", catchAsync(login));

module.exports = router;
