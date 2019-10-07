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

vocabularyRoutes.route("/all").get((req, res) => {
  // eslint-disable-next-line array-callback-return
  Vocabulary.find((err, vocabulary) => {
    if (err) {
      console.log(err);
    } else {
      res.send(vocabulary);
    }
  });
});

vocabularyRoutes.route("/").get((req, res) => {
  Vocabulary.aggregate(
    [
      {
        $group: {
          _id: "$_id",
          folderId: { $sum: "$folderId" },
          folderName: { $first: "$folderName" }
        }
      }
    ],
    (err, vocabulary) => {
      if (err) {
        console.log(err);
      } else {
        res.send(vocabulary);
      }
    }
  );
});

vocabularyRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Vocabulary.findById(id, (err, vocabulary) => {
    res.json(vocabulary.words);
  });
});

vocabularyRoutes.route("/addWord").post((req, res) => {
  // if (req.body.foreignWord !== undefined) {
  Vocabulary.updateOne(
    { folderId: req.body.id },
    {
      $push: {
        words: {
          $each: [{ foreignWord: req.body.foreignWord }]
        }
      }
    },
    (err, vocabulary) => {
      if (err) {
        console.log(err);
      }
    }
  );
  // }
});

vocabularyRoutes.route("/addWordToPair").post((req, res) => {
  Vocabulary.updateOne(
    { folderId: req.body.id, "words.nativeWord": req.body.nativeWord },
    { $set: { "words.$.foreignWord": req.body.foreignWord } },
    { upsert: true },
    (err, vocabulary) => {
      if (err) {
        console.log(err);
      }
    }
  );
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
