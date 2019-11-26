//  node --experimental-modules index.mjs

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import * as api from "./api/folders.mjs";

const app = express();
const r = express.Router();

r.route("/folders/:id/words").get(api.getWords);
r.route("/folders/names").get(api.getFolderNames);
r.route("/folders").post(api.addFolder);
// ликвилировать и добавить в getWords остальные параметры папки
r.route("/folders/:id").get(api.getFolder);
r.route("/folders/:id").delete(api.deleteFolder);
r.route("/folders/:id").patch(api.editFolder);
// переместить в editFolder
r.route("/folders/:id/language").patch(api.editFolderLanguages);
r.route("/folders/:id/words/:wordId").post(api.deleteWordsPair);
r.route("/folders/:id/words").post(api.addWordsPair);
r.route("/folders/:id/words/edit/:wordId").patch(api.editWordsPair);
// add to editWord
r.route("/folder/:id/words/:wordId/speechPart").patch(api.editSpeechPart);

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/vocabulary", r);

mongoose.connect(
  "mongodb://127.0.0.1:27017/vocabulary",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (!error) {
      console.log("MongoDB database connection established successfully");
    } else {
      console.log("has error: " + error.message);
    }
  }
);

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
