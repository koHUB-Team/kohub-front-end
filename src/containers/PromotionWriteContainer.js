import { connect } from "react-redux";
import { PromotionWrite } from "../pages/Admin";
import { ACTION, MODE } from "../store";

//dispatch 함수를 인자로.
//두번째인자로 상위 컴포넌트의 props도 받기 가능.
//리턴값을 wraped component의 props에서 사용.
function mapReduxDispatchToReactProps(dispatch) {
  return {
    onCancelBtnClick: () => {
      dispatch({
        type: ACTION.ADMIN.CHANGE_MODE,
        mode: MODE.READ,
      });
    },
  };
}

export default connect(null, mapReduxDispatchToReactProps)(PromotionWrite);
