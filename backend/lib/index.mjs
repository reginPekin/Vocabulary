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
  console.log("id: ", id);

  return Folders.aggregate([
    { $match: { id } },
    {
      $project: {
        _id: 0,
        words: 1,
        id: 1,
        name: 1,
        date: 1,
        foreignLanguage: 1,
        nativeLanguage: 1
      }
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: "$words"
      }
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
        name: { $first: "$name" },
        date: { $sum: "$date" },
        foreignLanguage: { $first: "$foreignLanguage" },
        nativeLanguage: { $first: "$nativeLanguage" },
        words: {
          $push: {
            foreignWord: "$words.foreignWord",
            nativeWord: "$words.nativeWord",
            wordId: "$words.wordId",
            speechPart: "$words.speechPart",
            date: "$words.date",
            tags: "$words.tags"
          }
        }
      }
    }
  ])
    .then(data => {
      if (data.length > 0 && data[0].words[0] !== undefined) {
        if (
          typeof Object.keys(data[0].words[0]) === "object" &&
          Object.keys(data[0].words[0]).length === 0
        )
          data[0].words = [];
        return data[0];
      }
    })
    .catch(error => console.log("errrrrrrrrrrror", error));
};
