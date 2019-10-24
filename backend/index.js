const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 4000;

const vocabularyRoutes = express.Router();

const Folders = require("./vocabulary.model");

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
  Folders.aggregate([
    {
      $group: {
        _id: "$_id",
        id: { $sum: "$id" },
        name: { $first: "$name" },
        date: { $sum: "$date" }
      }
    },
    {
      $sort: { date: -1 }
    }
  ]).then(folders => {
    res.json(folders);
    console.log(folders);
  });
});

vocabularyRoutes.route("/folders").post((req, res) => {
  Folders.insertMany([
    {
      name: req.body.name,
      id: req.body.id,
      date: req.body.date,
      words: req.body.words
    }
  ])
    .then(resp => {
      console.log("req.body: ", req.body);
      console.log("200: ", resp);
      res.status(200).json({ vocabulary: "folder added successfully" });
    })
    .catch(err => {
      console.log("err" + err);
      res.status(400).send("adding new folder failed");
    });
});

vocabularyRoutes.route("/folders/:id").get((req, res) => {
  Folders.findOne({ id: req.params.id })
    .then(vocabulary => res.json(vocabulary.words))
    .catch(err => {
      res.status(400).send("file didn't find");
    });
});

vocabularyRoutes.route("/folders/:id").delete((req, res) => {
  Folders.findOneAndDelete({ id: req.params.id })
    .then(() => {
      res.status(200).json({ vocabulary: "folder deleted successfully" });
    })
    .catch(err => {
      res.status(400).send("folder removing failed");
    });
});

vocabularyRoutes.route("/folders/:id").patch((req, res) => {
  Folders.updateOne(
    { id: req.params.id },
    {
      $set: { name: req.body.name }
    }
  )
    .then(() => {
      res.status(200).json({ vocabulary: "folder name edited successfully" });
    })
    .catch(err => {
      res.status(400).send("renaming folder failed");
    });
});

vocabularyRoutes.route("/folders/:id/words/:wordId").post((req, res) => {
  Folders.updateOne(
    { id: req.body.id },
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
  Folders.updateOne(
    { id: req.params.id },
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

vocabularyRoutes.route("/folders/:id/words/edit/:wordId").patch((req, res) => {
  if (req.body.word === "foreign") {
    Folders.updateOne(
      { id: req.body.id, "words.wordId": req.body.wordId },
      { $set: { "words.$.foreignWord": req.body.renamedWord } }
    )
      .then(resp => {
        console.log("200: ", resp);
        res.status(200).json({ vocabulary: "word edited successfully" });
      })
      .catch(err => {
        res.status(400).send("editing word failed" + err);
      });
  } else if (req.body.word === "native") {
    Folders.updateOne(
      { id: req.body.id, "words.wordId": req.body.wordId },
      { $set: { "words.$.nativeWord": req.body.renamedWord } }
    )
      .then(resp => {
        console.log("200: ", resp);
        res.status(200).json({ vocabulary: "word edited successfully" });
      })
      .catch(err => {
        res.status(400).send("editing word failed" + err);
      });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
