const { Schema, model } = require("mongoose");

const audioSchema = new Schema({
  title: {
    type: String,
  },
  song: {
    type: String,
  },
});

const audio = model("audio", audioSchema);

module.exports = audio;
