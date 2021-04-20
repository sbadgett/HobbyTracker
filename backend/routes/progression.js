const express = require("express");
const catchAsync = require("../util/catchAsync");
const router = express.Router({ mergeParams: true });
//
const {
  verifyToken,
  verifyProgressOwner,
  validateProgress,
} = require("../middleware");
const {
  createProgress,
  fetchProgress,
  deleteProgress,
  updateProgress,
} = require("../controllers/progression");

//Route to fetch a hobby
router.get("/:progressId", catchAsync(fetchProgress));

//Route to create a progress report
router.post("/", [validateProgress, verifyToken], catchAsync(createProgress));

//Route to update a progress report
router.put(
  "/:progressId",
  [validateProgress, verifyToken, catchAsync(verifyProgressOwner)],
  catchAsync(updateProgress)
);

//Route to delete a progress
router.delete(
  "/:progressId",
  [verifyToken, catchAsync(verifyProgressOwner)],
  catchAsync(deleteProgress)
);

module.exports = router;
