const InitialState = {
  searchText: ""
};

const searchTextChanger = (state = InitialState, action) => {
  switch (action.type) {
    case "CHANGE_SEARCH_TEXT":
      return { ...state, searchText: action.searchText };
    default:
      return state;
  }
};

export default searchTextChanger;
