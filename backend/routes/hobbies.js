const express = require("express");
const catchAsync = require("../util/catchAsync");
const {
  verifyToken,
  verifyHobbyOwner,
  validateHobby,
} = require("../middleware");
const {
  createHobby,
  fetchHobby,
  deleteHobby,
  updateHobby,
} = require("../controllers/hobbies");

const router = express.Router({ mergeParams: true });

//Route to fetch a hobby
router.get("/:id", catchAsync(fetchHobby));

//Route to create a hobby
router.post("/", [validateHobby, verifyToken], catchAsync(createHobby));

//Route to update a hobby
router.put(
  "/:id",
  [verifyToken, catchAsync(verifyHobbyOwner)],
  catchAsync(updateHobby)
);

//Route to delete a hobby
router.delete(
  "/:id",
  [verifyToken, catchAsync(verifyHobbyOwner)],
  catchAsync(deleteHobby)
);

module.exports = router;
