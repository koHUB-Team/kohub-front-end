import { createStore } from "redux";
import { Map, List, Record } from "immutable";

//Ation Type 정의
//ADMIN : admin page 관련 action
const MODE = Record({
  READ: "READ",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
})();

const ACTION = Record({
  ADMIN: Record({
    CLICK_ADMIN_MENU: "CLICK_ADMIN_MENU",
    CHANGE_MODE: "CHANGE_MODE",
    CHANGE_PROMOTION_ID: "CHANGE_PROMOTION_ID",
  })(),

  KOHUB: Record({
    CLICK_CHANGE_MODE: "CLICK_CHANGE_MODE",
    CLICK_DETAIL: "CLICK_DATAIL",
  })(),
})();

//Redux state 정의
//Admin page 관련 state
const Admin = Record({
  selectedMenuId: 1,
  selectedPromotionId: 0,
  mode: MODE.READ,
});

const Kohub = Record({
  selectedDetailId: 1,
  mode: MODE.READ,
});

//Redux state 초기화
const State = Record({
  admin: Admin(),
  kohub: Kohub(),
});
const initialState = State();

function reducer(state = initialState, action) {
  let { admin, kohub } = state;
  let newAdmin, newState, newKohub;

  switch (action.type) {
    case ACTION.ADMIN.CLICK_ADMIN_MENU:
      newAdmin = admin.set("selectedMenuId", action.selectedMenuId);
      newState = state.set("admin", newAdmin);

      return newState;

    case ACTION.ADMIN.CHANGE_MODE:
      newAdmin = admin.set("mode", action.mode);
      newState = state.set("admin", newAdmin);

      return newState;

    case ACTION.ADMIN.CHANGE_PROMOTION_ID:
      newAdmin = admin.set("selectedPromotionId", action.selectedPromotionId);
      newState = state.set("admin", newAdmin);

      return newState;

    case ACTION.KOHUB.CLICK_CHANGE_MODE:
      newKohub = kohub.set("mode", action.mode);
      newState = state.set("kohub", newKohub);

      return newState;

    case ACTION.KOHUB.CLICK_DETAIL:
      newKohub = kohub.set("mode", action.mode);
      newKohub = newKohub.set("selectedDetailId", action.selectedDetailId);
      newState = state.set("kohub", newKohub);

      return newState;

    default:
      return state;
  }

  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store, ACTION, MODE };
