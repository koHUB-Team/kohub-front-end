import { connect } from "react-redux";
import AdminNav from "../components/AdminNav";
import { ActionType } from "../store";

//dispatch 함수를 인자로.
//두번째인자로 상위 컴포넌트의 props도 받기 가능.
//리턴값을 wraped component의 props에서 사용.
function mapReduxDispatchToReactProps(dispatch) {
  return {
    onClick: (clickedMenuId) => {
      dispatch({
        type: ActionType.ADMIN.CLICK_ADMIN_MENU,
        selectedMenuId: clickedMenuId,
      });
    },
  };
}

export default connect(null, mapReduxDispatchToReactProps)(AdminNav);
