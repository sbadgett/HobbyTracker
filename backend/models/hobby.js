const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Progress = require("./progress");

const HobbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
  },
  imgurl: {
    type: String,
  },
  progression: [
    {
      type: Schema.Types.ObjectId,
      ref: "Progress",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

HobbySchema.post("findOneAndDelete", async function (hobby) {
  //Delete progression associated with this hobby after hobby itself is deleted
  if (hobby?.progression) {
    await Progress.deleteMany({
      _id: {
        $in: hobby.progression,
      },
    });
  }
});

module.exports = mongoose.model("Hobby", HobbySchema);
