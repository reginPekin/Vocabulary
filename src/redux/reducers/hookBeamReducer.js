const InitialState = {
  beam: 0
};

const hookBeamReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "SET_HOOK_BEAM":
      return { ...state, beam: state.beam + 1 };
    default:
      return state;
  }
};

export default hookBeamReducer;
