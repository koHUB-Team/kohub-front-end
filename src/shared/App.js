import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "../pages/Main";
// import { Notice } from "../pages/Kohub";
import { NoticeContainer } from "../containers";
import { NotFound } from "../pages/Error";
import { LoginForm, SignUpForm } from "../pages/Login";
import AdminApp from "./AdminApp";
import Help from "./Help";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/help" component={Help}></Route>
        <Route path="/admin" component={AdminApp}></Route>
        <Route exact path="/login" component={LoginForm}></Route>
        <Route exact path="/signup" component={SignUpForm}></Route>
        <Route exact path="/notice" component={NoticeContainer}></Route>
        <Route exact path="/" component={Main}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    );
  }
}

export default App;

//서버, 클라이언트 공용사용 컴포넌트
