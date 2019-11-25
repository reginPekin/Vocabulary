const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Folders = new Schema(
  {
    name: {
      type: String
    },
    id: {
      type: String
    },
    words: {
      type: Array
    },
    date: {
      type: Number
    },
    foreignLanguage: {
      type: String
    },
    nativeLanguage: {
      type: String
    },
    sortMethod: {
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("vocabulary", Folders);
