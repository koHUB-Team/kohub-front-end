import { connect } from "react-redux";
import { NoticeUpdate } from "../pages/Kohub";
import { ACTION, MODE } from "../store";
function mapReduxStateToReactProps(state) {
  let { kohub } = state;

  return {
    selectedDetailId: kohub.selectedDetailId,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onUpdateBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.READ_DETAIL,
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
)(NoticeUpdate);
