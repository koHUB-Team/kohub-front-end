import { connect } from "react-redux";
import { Notice } from "../pages/Kohub";

function mapReduxStateToReactProps(state) {
  let { kohub } = state;

  return {
    selectedMenuId: kohub.selectedMenuId,
    mode: kohub.mode,
  };
}

export default connect(mapReduxStateToReactProps)(Notice);
