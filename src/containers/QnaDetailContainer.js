import { connect } from "react-redux";
import { QnaDetail } from "../pages/Kohub";
import { ACTION, MODE } from "../store";

function mapReduxStateToReactProps(state) {
  let { kohub } = state;

  return {
    selectedDetailId: kohub.selectedDetailId,
  };
}

export default connect(mapReduxStateToReactProps, null)(QnaDetail);
