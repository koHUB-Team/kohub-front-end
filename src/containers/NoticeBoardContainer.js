import { connect } from "react-redux";
import { NoticeBoard } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onWriteBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.CREATE,
      });
    },
  };
}
export default connect(null, mapReduxDispatchToReactProps)(NoticeBoard);
