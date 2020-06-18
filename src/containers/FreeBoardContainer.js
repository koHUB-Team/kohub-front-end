import { connect } from "react-redux";
import { FreeBoard } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onWriteBtnClick: () => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        mode: MODE.CREATE,
      });
    },
    onDetailClick: (selectedDetailId) => {
      dispatch({
        selectedDetailId: selectedDetailId,
        type: ACTION.KOHUB.CLICK_DETAIL,
        mode: MODE.READ_DETAIL,
      });
    },
  };
}
export default connect(null, mapReduxDispatchToReactProps)(FreeBoard);
