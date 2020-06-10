import { connect } from "react-redux";
import { QnaWrite } from "../pages/Kohub";
import { ACTION, MODE } from "../store";
function mapReduxStateToReactProps(state) {
  let { kohub } = state;

  return {
    mode: kohub.mode,
    selectedDetailId: kohub.selectedDetailId,
  };
}
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
export default connect(
  mapReduxStateToReactProps,
  mapReduxDispatchToReactProps
)(QnaWrite);
