const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Vocabulary = new Schema({
  folderName: {
    type: String
  },
  folderId: {
    type: Number
  },
  words: {
    type: Array
  }
});

module.exports = mongoose.model("Vocabulary", Vocabulary);
