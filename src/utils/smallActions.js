export const increaseWordCounter = wordCounter => {
  return {
    type: "INCREASE_WORD_COUNTER",
    wordCounter
  };
};

export const setSearchText = searchText => {
  return {
    type: "CHANGE_SEARCH_TEXT",
    searchText
  };
};
