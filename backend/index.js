const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uid = require("uid");

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

// client sortType to server
const parseWordsSortType = sortType => {
  switch (sortType) {
    case "foreign":
      return "words.foreignWord";
    case "native":
      return "words.nativeWord";
    case "speech":
      return "words.speechPart";
    case "date":
      return "words.date";
    default:
      console.log("error");
      return "words.date";
  }
};

vocabularyRoutes.route("/folders/:id/words").get((req, res) => {
  const sortType = parseWordsSortType(req.query.sort);
  console.log(req.query.sort);
  getMongoWordsWithSort(req.params.id, sortType, 1).then(folders => {
    res.json(folders);
  });
});

const getMongoWordsWithSort = (id, sortType, sortDirection) => {
  return Folders.aggregate([
    { $match: { id } },
    {
      $project: {
        words: 1,
        id: 1
      }
    },
    {
      $unwind: "$words"
    },
    {
      $sort: {
        [sortType]: sortDirection
      }
    },
    {
      $group: {
        _id: "$_id",
        id: { $first: "$id" },
        words: {
          $push: {
            foreignWord: "$words.foreignWord",
            nativeWord: "$words.nativeWord",
            wordId: "$words.wordId",
            speechPart: "$words.speechPart",
            date: "$words.date"
          }
        }
      }
    }
  ]).then(data => {
    if (data.length > 0) {
      return data[0];
    }
  });
};

vocabularyRoutes.route("/folders/sort").post((req, res) => {
  const array = req.body.arr;

  array.forEach(element => {
    Folders.updateOne(
      { id: element.id },
      { $set: { words: element.words, sortMethod: req.body.sortMethod } }
    ).then(folders => {
      res.json(folders);
    });
  });
});

vocabularyRoutes.route("/folders/names").get((_, res) => {
  Folders.aggregate([
    {
      $group: {
        _id: "$_id",
        id: { $first: "$id" },
        name: { $first: "$name" },
        date: { $sum: "$date" },
        foreignLanguage: { $first: "$foreignLanguage" },
        nativeLanguage: { $first: "$nativeLanguage" },
        sortMethod: { $first: "$sortMethod" }
      }
    },
    {
      $sort: { date: -1 }
    }
  ]).then(folders => {
    res.json(folders);
    console.log("get folders");
  });
});

vocabularyRoutes.route("/folders").post((req, res) => {
  const id = uid(10);
  Folders.insertMany([
    {
      name: req.body.name,
      id,
      date: Date.now(),
      words: [],
      foreignLanguage: req.body.foreignLanguage,
      nativeLanguage: req.body.nativeLanguage,
      sortMethod: "nativeWords"
    }
  ])
    .then(folder => {
      res.json(folder);
    })
    .catch(err => {
      console.log("err" + err);
      res.status(400).send("adding new folder failed");
    });
});

vocabularyRoutes.route("/folders/:id").get((req, res) => {
  Folders.findOne({ id: req.params.id })
    .then(vocabulary => res.json(vocabulary))
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

vocabularyRoutes.route("/folders/:id/language").patch((req, res) => {
  if (req.body.language === "foreign") {
    Folders.updateOne(
      { id: req.params.id },
      {
        $set: { foreignLanguage: req.body.renamedLanguage }
      }
    )
      .then(resp => {
        console.log("patch language");
        res.status(200).json({ vocabulary: "word edited successfully" });
      })
      .catch(err => {
        res.status(400).send("editing word failed" + err);
      });
  } else if (req.body.language === "native") {
    Folders.updateOne(
      { id: req.params.id },
      {
        $set: { nativeLanguage: req.body.renamedLanguage }
      }
    )
      .then(resp => {
        console.log("patch language");
        res.status(200).json({ vocabulary: "word edited successfully" });
      })
      .catch(err => {
        res.status(400).send("editing word failed" + err);
      });
  }
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
  const newWord = {
    foreignWord: req.body.foreignWord,
    nativeWord: req.body.nativeWord,
    wordId: uid(10),
    speechPart: req.body.speechPart,
    date: Date.now()
  };

  Folders.updateOne(
    { id: req.params.id },
    {
      $push: {
        words: {
          $each: [newWord]
        }
      }
    }
  )
    .then(resp => {
      console.log("resp", resp);
      res.status(200).send(newWord);
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
        console.log("edit word");
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
      .then(() => {
        console.log("edit word");
        res.status(200).json({ vocabulary: "word edited successfully" });
      })
      .catch(err => {
        res.status(400).send("editing word failed" + err);
      });
  }
});

vocabularyRoutes
  .route("/folder/:id/words/:wordId/speechPart")
  .patch((req, res) => {
    Folders.updateOne(
      { id: req.body.id, "words.wordId": req.body.wordId },
      { $set: { "words.$.speechPart": req.body.newSpeechPart } }
    )
      .then(() => {
        res.status(200).json({ vocabulary: "speechPart edited successfully" });
      })
      .catch(err => {
        res.status(400).send("editing speechPart failed" + err);
      });
  });

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
