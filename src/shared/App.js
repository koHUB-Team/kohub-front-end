import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Main,
  Account,
  Login,
  SignUp,
  SignUpAuth,
  NotFound,
  Admin,
  SignUpComplete,
  FindPassword,
} from "../pages";
import { Header, Footer } from "../components";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/admin" component={Admin}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/signup_auth" component={SignUpAuth}></Route>
        <Route exact path="/signup_complete" component={SignUpComplete}></Route>
        <Route exact path="/help_pass" component={FindPassword}></Route>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
          </Route>
          <Route exact path="/myaccount">
            <Header></Header>
            <Account></Account>
            <Footer></Footer>
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Switch>
    );
  }
}

export default App;

//서버, 클라이언트 공용사용 컴포넌트
