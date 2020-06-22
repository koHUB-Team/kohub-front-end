import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "../pages/Main";
import {
  FreeDetailContainer,
  FreeWriteContainer,
  QnaDetailContainer,
  QnaWriteContainer,
} from "../containers";
import { NotFound } from "../pages/Error";
import { LoginForm, SignUpForm } from "../pages/Login";
import AdminApp from "./AdminApp";
import Help from "./Help";
import { Faq, NoticeDetail, Notice, Free, Qna } from "../pages/Kohub";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/admin" component={AdminApp}></Route>
        <Route path="/help" component={Help}></Route>
        <Route exact path="/login" component={LoginForm}></Route>
        <Route exact path="/signup" component={SignUpForm}></Route>
        <Route exact path="/faq" component={Faq}></Route>
        <Route exact path="/free/write" component={FreeWriteContainer}></Route>
        <Route exact path="/free/:id" component={FreeDetailContainer}></Route>
        <Route path="/free" component={Free}></Route>
        <Route exact path="/qna/write" component={QnaWriteContainer}></Route>
        <Route exact path="/qna/:id" component={QnaDetailContainer}></Route>
        <Route path="/qna" component={Qna}></Route>
        <Route exact path="/notice/:id" component={NoticeDetail}></Route>
        <Route path="/notice" component={Notice}></Route>
        <Route exact path="/" component={Main}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    );
  }
}

export default App;

//서버, 클라이언트 공용사용 컴포넌트
