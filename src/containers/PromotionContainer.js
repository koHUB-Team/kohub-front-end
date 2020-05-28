import { connect } from "react-redux";
import { Promotion } from "../pages/Admin";

function mapReduxStateToReactProps(state) {
  let { admin } = state;

  return {
    mode: admin.mode,
  };
}

export default connect(mapReduxStateToReactProps)(Promotion);
