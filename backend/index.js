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

vocabularyRoutes.route("/").get((req, res) => {
  // eslint-disable-next-line array-callback-return
  Vocabulary.find((err, vocabulary) => {
    if (err) {
      console.log(err);
    } else {
      res.json(vocabulary);
    }
  });
});

vocabularyRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Vocabulary.findById(id, (err, vocabulary) => {
    res.json(vocabulary.folderName);
  });
});

vocabularyRoutes.route("/update/:id").post((req, res) => {
  Vocabulary.findById(req.params.id, (err, vocabulary) => {
    if (!vocabulary) res.status(404).send("data is not found");
    else {
      vocabulary.folderName = req.body.folderName;
      vocabulary.folderId = req.body.folderId;
      vocabulary.words = req.bosy.words;
    }
    vocabulary
      .save()
      .then(vocabulary => {
        res.json("vocabulary updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

vocabularyRoutes.route("/delete/:id").get((req, res) => {
  Vocabulary.findByIdAndRemove(req.params.id, err => {
    if (err) return err;
    res.send("Deleted successfully!");
  });
});

vocabularyRoutes.route("/add").post((req, res) => {
  let vocabulary = new Vocabulary(req.body);
  vocabulary
    .save()
    .then(vocabulary => {
      res.status(200).json({ vocabulary: "vocabulary added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new vocabulary failed");
    });
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
