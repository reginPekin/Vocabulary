import mongoose from "mongoose";
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
    }
  },
  { versionKey: false }
);

export default mongoose.model("vocabulary", Folders);
