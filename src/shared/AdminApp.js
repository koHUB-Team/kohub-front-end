import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Account, Promotion, Faq, PromotionWrite } from "../pages/Admin";
import { PromotionContainer } from "../containers";
import FaqWrite from "../pages/Admin/FaqWrite";

class AdminApp extends Component {
  render() {
    let match = this.props.match;

    return (
      <Switch>
        {/* <Route path={match.url + "/lecture"} component={Account}></Route>
          <Route path={match.url + "/hotspot"} component={Account}></Route>
          <Route path={match.url + "/lecture"} component={Account}></Route>
          <Route path={match.url + "/circles"} component={Account}></Route>
          <Route path={match.url + "/groups"} component={Account}></Route>
          <Route path={match.url + "/residence"} component={Account}></Route>
          <Route path={match.url + "/domitory"} component={Account}></Route>
          <Route path={match.url + "/faq"} component={Account}></Route>
          <Route path={match.url + "/ad"} component={Account}></Route> */}
        <Route path={`${match.url}/faq_write`} component={FaqWrite}></Route>
        <Route path={`${match.url}/faq`} component={Faq}></Route>
        <Route
          path={`${match.url}/promotion_write`}
          component={PromotionWrite}
        ></Route>
        <Route path={`${match.url}/promotion`} component={Promotion}></Route>
        <Route component={Account}></Route>
      </Switch>
    );
  }
}

export default AdminApp;
