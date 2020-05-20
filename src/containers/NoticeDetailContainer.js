import { connect } from "react-redux";
import { NoticeDetail } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onUpdateBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.UPDATE,
      });
    },
    onDeleteBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.DELETE,
      });
    },
  };
}
export default connect(null, mapReduxDispatchToReactProps)(NoticeDetail);
