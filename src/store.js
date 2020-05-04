import { createStore } from "redux";
import { Map, List, Record } from "immutable";

//Ation Type 정의
//ADMIN : admin page 관련 action
const MODE = Record({
  CREATE: "CREATE",
  READ: "READ",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
})();

const ACTION = Record({
  ADMIN: Record({
    CLICK_ADMIN_MENU: "CLICK_ADMIN_MENU",
  })(),

  KOHUB: Record({})(),
})();

//Redux state 정의
//Admin page 관련 state
const Admin = Record({
  selectedMenuId: 1,
  mode: MODE.READ,
});

const Kohub = Record({
  selectedMenuId: 0,
  mode: MODE.READ,
});

//Redux state 초기화
const State = Record({
  admin: Admin(),
  kohub: Kohub(),
});
const initialState = State();

function reducer(state = initialState, action) {
  console.log(ACTION.ADMIN.CLICK_ADMIN_MENU);
  switch (action.type) {
    case ACTION.ADMIN.CLICK_ADMIN_MENU:
      let admin = state.admin;
      let newAdmin = admin.set("selectedMenuId", action.selectedMenuId);
      let newState = state.set("admin", newAdmin);

      return newState;
  }

  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store, ACTION, MODE };
