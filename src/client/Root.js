import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import { Provider } from "react-redux";
import store from "../store";

//최상위 Root 컴포넌트
class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default Root;

//Router를 여기서 설정한다. Redux도 여기서 설정해준다.
//HashRouter : App의 URL이 모두 Root를 거치지 않는다면.
