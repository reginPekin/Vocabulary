import uid from "uid";

import Folders from "../vocabulary.model.mjs";

import * as lib from "../lib";

export const getWords = (req, res) => {
  const sortType = lib.parseWordsSortType(req.query.sort);
  console.log(req.query.sort);
  lib.getMongoWordsWithSort(req.params.id, sortType, 1).then(folders => {
    res.json(folders);
  });
};

export const getFolderNames = (_, res) => {
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
};

export const addFolder = (req, res) => {
  const id = uid(10);
  Folders.insertMany([
    {
      name: req.body.name,
      id,
      date: Date.now(),
      words: [],
      foreignLanguage: req.body.foreignLanguage,
      nativeLanguage: req.body.nativeLanguage
    }
  ])
    .then(folder => {
      res.json(folder);
    })
    .catch(err => {
      console.log("err" + err);
      res.status(400).send("adding new folder failed");
    });
};

export const getFolder = (req, res) => {
  Folders.findOne({ id: req.params.id })
    .then(vocabulary => res.json(vocabulary))
    .catch(err => {
      res.status(400).send("file didn't find");
    });
};

export const deleteFolder = (req, res) => {
  Folders.findOneAndDelete({ id: req.params.id })
    .then(() => {
      res.status(200).json({ vocabulary: "folder deleted successfully" });
    })
    .catch(err => {
      res.status(400).send("folder removing failed");
    });
};

export const editFolder = (req, res) => {
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
};

export const editFolderLanguages = (req, res) => {
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
};

export const deleteWordsPair = (req, res) => {
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
};

export const addWordsPair = (req, res) => {
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
};

export const editWordsPair = (req, res) => {
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
};

export const editSpeechPart = (req, res) => {
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
};
