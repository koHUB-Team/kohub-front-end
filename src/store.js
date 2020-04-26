import { createStore } from "redux";

function reducer(state, action) {
  if (state === undefined) {
    return {
      number: 0,
    };
  }
  if (action.type === "INCREMENT") {
    return { ...state, number: state.number + action.size };
  }
  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
