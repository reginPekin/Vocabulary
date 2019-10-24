const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Folders = new Schema(
  {
    name: {
      type: String
    },
    id: {
      type: Number
    },
    words: {
      type: Array
    },
    date: {
      type: Number
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("vocabulary", Folders);
