const Hobby = require("../models/hobby");
const User = require("../models/user");

/*
  Creates a new hobby for the user authenticated by auth token
*/
module.exports.createHobby = async (req, res) => {
  const owner = req.userId;

  const hobby = new Hobby({
    name: req.body.name,
    goal: req.body.goal,
    imgurl: req.body.imgurl,
    owner,
  });

  const user = await User.findById(req.userId);
  user.hobbies.push(hobby._id);

  await user.save();
  await hobby.save();

  res.status(200).send({
    message: "New hobby created.",
    hobby,
  });
};

/*
  Updates the information of a hobby after authenication of user/owner
*/
module.exports.updateHobby = async (req, res) => {
  const { id } = req.params;

  //Look up hobby by id and update name and goal
  const hobby = await Hobby.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      goal: req.body.goal,
      imgurl: req.body.imgurl,
    },
    {
      new: true,
    }
  );

  res.status(200).send({
    message: "Hobby Updated",
    hobby,
  });
};

/*
  Delete a hobby after authentication of user/owner
*/
module.exports.deleteHobby = async (req, res) => {
  const { id } = req.params;

  //Look up the hobby so that its owner's id can be accessed
  const hobby = await Hobby.findById(id);

  //Look up the owner and remove this hobby from its array of hobbies
  const user = await User.findByIdAndUpdate(hobby.owner, {
    $pull: { hobbies: id },
  });

  //Delete the hobby
  await Hobby.findByIdAndDelete(id);

  res.status(200).send({
    message: "Hobby deleted.",
    hobby,
  });
};

module.exports.fetchHobby = async (req, res) => {
  const { id } = req.params;

  const hobby = await Hobby.findById(id);

  res.status(200).send({
    hobby,
  });
};
