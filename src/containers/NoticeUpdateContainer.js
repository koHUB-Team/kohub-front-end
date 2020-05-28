import { connect } from "react-redux";
import { NoticeUpdate } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onUpdateBtnClick: () => {
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
export default connect(null, mapReduxDispatchToReactProps)(NoticeUpdate);
