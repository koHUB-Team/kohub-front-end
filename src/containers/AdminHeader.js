import AdminHeader from "../components/AdminHeader";
import { connect } from "react-redux";

//container component : recux의 store와 wrabed componet의 props와 연결해줌.

//state : redux의 state.
//리턴값 : react의 props로 전달됨. 해당 값에 대해서만 변경사항을 적용해 렌더링 함.
//두번째 인자로 상위 컴포넌트 props도 전달할 수 있음.
function mapReduxStateToReactProps(state) {
  let { admin } = state;

  return {
    selectedMenuId: admin.selectedMenuId,
  };
}

//conect의 두번째인자로 사용가능.
// function mapReduxDispatchToReactProps() {
//   return {};
// }

//connect인자로 함수를 전달. 리턴값이 함수. 그 함수에 인자로 wraped component를 전달해서 연결.
export default connect(mapReduxStateToReactProps)(AdminHeader);
