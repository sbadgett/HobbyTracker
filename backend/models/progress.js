const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hobbyId: {
    type: Schema.Types.ObjectId,
    ref: "Hobby",
  },
});

module.exports = mongoose.model("Progress", ProgressSchema);
