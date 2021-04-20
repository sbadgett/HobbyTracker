const Hobby = require("../models/hobby");
const Progress = require("../models/progress");

/*
  Creates a new progress object and update progression array of the hobby it
  belongs to after authentication of user.
*/
module.exports.createProgress = async (req, res) => {
  const date = Date.parse(req.body.date);
  const description = req.body.description;
  const hobbyId = req.params.id;

  const progress = new Progress({
    date,
    description,
    hobbyId,
  });

  const hobby = await Hobby.findById(hobbyId);

  hobby.progression.push(progress);

  await hobby.save();
  await progress.save();

  res.status(200).send({
    message: "New progress created",
    progress,
  });
};

/*
  Update progress after authentication of user
*/
module.exports.updateProgress = async (req, res) => {
  const { progressId } = req.params;

  const progress = await Progress.findByIdAndUpdate(
    progressId,
    {
      date: Date.parse(req.body.date),
      description: req.body.description,
    },
    {
      new: true,
    }
  );

  //Look up the hobby so that its owner's id can be accessed
  res.status(200).send({
    message: "Progress updated",
    progress,
  });
};

/*
  Delete progress
*/
module.exports.deleteProgress = async (req, res) => {
  const { id, progressId } = req.params;

  //Look up the hobby so that its owner's id can be accessed
  const progress = await Progress.findById(progressId);

  //Look up the owner and remove this hobby from its array of hobbies
  await Hobby.findByIdAndUpdate(id, {
    $pull: { progression: progressId },
  });

  //Delete the hobby
  await Progress.findByIdAndDelete(progressId);

  res.status(200).send({
    message: "Progress deleted",
    progress,
  });
};

module.exports.fetchProgress = async (req, res) => {
  const { progressId } = req.params;
  //Look up the hobby
  const progress = await Progress.findById(progressId);

  res.json(progress);
};
