import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { FindPassForm } from "../pages/Login";

class Help extends Component {
  render() {
    let { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.url}/pass`} component={FindPassForm}></Route>
      </Switch>
    );
  }
}

export default Help;
