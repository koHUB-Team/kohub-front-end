import { connect } from "react-redux";
import { QnaDetail } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxStateToReactProps(state) {
  let { kohub } = state;

  return {
    selectedDetailId: kohub.selectedDetailId,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    onUpdateBtnClick: (id) => {
      dispatch({
        type: ACTION.KOHUB.CLICK_CHANGE_MODE,
        selectedDetailId: id,
        mode: MODE.UPDATE,
      });
    },
  };
}
export default connect(
  mapReduxStateToReactProps,
  mapReduxDispatchToReactProps
)(QnaDetail);
