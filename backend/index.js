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
  Vocabulary.aggregate([
    {
      $group: {
        _id: "$_id",
        folderId: { $sum: "$folderId" },
        folderName: { $first: "$folderName" }
      }
    }
  ])
    .then(vocabulary => {
      res.json(vocabulary);
    })
    .catch(err => {
      res.send("Getting folders information failed");
    });
});

vocabularyRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Vocabulary.findById(id, (err, vocabulary) => {
    res.json(vocabulary.words);
  });
});

vocabularyRoutes.route("/newWord").post((req, res) => {
  if (req.body.foreignWord !== undefined) {
    Vocabulary.updateOne(
      { folderId: req.body.id },
      {
        $push: {
          words: {
            $each: [{ foreignWord: req.body.foreignWord }]
          }
        }
      }
    )
      .then(vocabulary => {
        res.status(200).json({ vocabulary: "word added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new word failed");
      });
  } else {
    Vocabulary.updateOne(
      { folderId: req.body.id },
      {
        $push: {
          words: {
            $each: [{ nativeWord: req.body.nativeWord }]
          }
        }
      }
    )
      .then(vocabulary => {
        res.status(200).json({ vocabulary: "word added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new word failed");
      });
  }
});

vocabularyRoutes.route("/newFold").post((req, res) => {
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

vocabularyRoutes.route("/secondWordInPair").post((req, res) => {
  if (req.body.wordLanguage === "foreign") {
    Vocabulary.updateOne(
      { folderId: req.body.id, "words.nativeWord": req.body.nativeWord },
      { $set: { "words.$.foreignWord": req.body.foreignWord } },
      { upsert: true }
    )
      .then(vocabulary => {
        res.status(200).json({ vocabulary: "secondWord added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new word failed");
      });
  } else {
    Vocabulary.updateOne(
      { folderId: req.body.id, "words.foreignWord": req.body.foreignWord },
      { $set: { "words.$.nativeWord": req.body.nativeWord } },
      { upsert: true }
    )
      .then(vocabulary => {
        res.status(200).json({ vocabulary: "seconsWord added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new word failed");
      });
  }
});

vocabularyRoutes.route("/delete/:id").get((req, res) => {
  Vocabulary.findByIdAndRemove(req.params.id, err => {
    if (err) return err;
    res.send("Deleted successfully!");
  });
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
