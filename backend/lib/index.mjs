import Folders from "../vocabulary.model.mjs";
// client sortType to server
export const parseWordsSortType = sortType => {
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

export const getMongoWordsWithSort = (id, sortType, sortDirection) => {
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
