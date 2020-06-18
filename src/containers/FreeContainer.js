import { connect } from "react-redux";
import { Free } from "../pages/Kohub";
function mapReduxStateToReactProps(state) {
  let { kohub } = state;

  return {
    selectedDetailId: kohub.selectedDetailId,
    mode: kohub.mode,
  };
}

export default connect(mapReduxStateToReactProps, null)(Free);
