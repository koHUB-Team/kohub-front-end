import { connect } from "react-redux";
import { QnaWrite } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onRegisterBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.READ,
      });
    },
    onCancelBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.READ,
      });
    },
  };
}
export default connect(null, mapReduxDispatchToReactProps)(QnaWrite);
