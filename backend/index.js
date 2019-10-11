const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 4000;

const vocabularyRoutes = express.Router();

const Vocabulary = require("./vocabulary.model");

app.use(cors());
app.use(bodyParser.json());
app.use("/vocabulary", vocabularyRoutes);

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/vocabulary",
  {
    useNewUrlParser: true
  },
  error => {
    if (!error) {
      console.log("MongoDB database connection established successfully");
    } else {
      console.log("has error: " + error.message);
    }
  }
);

vocabularyRoutes.route("/folders/names").get((_, res) => {
  Vocabulary.aggregate([
    {
      $group: {
        _id: "$_id",
        folderId: { $sum: "$folderId" },
        folderName: { $first: "$folderName" }
      }
    },
    {
      $sort: { folderName: 1 }
    }
  ]).then(vocabulary => res.json(vocabulary));
});

vocabularyRoutes.route("/folders/:id").get((req, res) => {
  Vocabulary.findOne({ folderId: req.params.id })
    .then(vocabulary => res.json(vocabulary.words))
    .catch(err => {
      res.status(400).send("file didn't find");
    });
});

vocabularyRoutes.route("/folders/:id").delete((req, res) => {
  Vocabulary.findOneAndDelete({ folderId: req.params.id })
    .then(() => {
      res.status(200).json({ vocabulary: "folder deleted successfully" });
    })
    .catch(err => {
      res.status(400).send("folder removing failed");
    });
});

vocabularyRoutes.route("/folders").post((req, res) => {
  let vocabulary = new Vocabulary(req.body);
  vocabulary
    .save()
    .then(() => {
      res.status(200).json({ vocabulary: "folder added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new folder failed");
    });
});

vocabularyRoutes.route("/folders/:folderId/words/:wordId").post((req, res) => {
  Vocabulary.updateOne(
    { folderId: req.body.folderId },
    {
      $pull: { words: { wordId: req.body.wordId } }
    }
  )
    .then(resp => {
      console.log("200: ", resp);
      res.status(200).json({ vocabulary: "wordPair deleted successfully" });
    })
    .catch(err => {
      res.status(400).send("rewoving wordPair failed. " + err);
    });
});

vocabularyRoutes.route("/folders/:id/words").post((req, res) => {
  Vocabulary.updateOne(
    { folderId: req.params.id },
    {
      $push: {
        words: {
          $each: [
            {
              foreignWord: req.body.foreignWord,
              nativeWord: req.body.nativeWord,
              wordId: req.body.wordId
            }
          ]
        }
      }
    }
  )
    .then(() => {
      res.status(200).json({ vocabulary: "wordPair added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new wordPair failed");
    });
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
