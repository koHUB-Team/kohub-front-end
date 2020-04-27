import React, { Component } from "react";
import { AdminNav, AdminAccount, AdminPromotion } from "../components";
import "./Admin.scss";
import { Route, Switch } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let match = this.props.match;

    return (
      <div className="kohub-admin-container">
        <AdminNav></AdminNav>
        <Switch>
          <Route
            path={match.url + "/promotion"}
            component={AdminPromotion}
          ></Route>
          <Route component={AdminAccount}></Route>
        </Switch>
      </div>
    );
  }
}

export default Admin;
