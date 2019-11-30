const TypeInitialState = {
  sortType: "date"
};

const DirectionInitialState = {
  sortDirection: 1
};

export const sortTypeReducer = (state = TypeInitialState, action) => {
  switch (action.type) {
    case "SET_SORT_TYPE":
      return { ...state, sortType: action.sortType };
    default:
      return state;
  }
};

export const sortDirectionReducer = (state = DirectionInitialState, action) => {
  switch (action.type) {
    case "SET_SORT_DIRECTION":
      return { ...state, sortDirection: state.sortDirection * -1 };
    default:
      return state;
  }
};
