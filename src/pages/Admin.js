import React, { Component } from "react";
import { AdminNav, AdminContent } from "../components";
import "./Admin.scss";
import { Route, Switch } from "react-router-dom";

class Admin extends Component {
  render() {
    let match = this.props.match;

    return (
      <div className="kohub-admin-container">
        <AdminNav></AdminNav>
        <Switch>
          <Route
            path={match.url + "/promotion"}
            component={AdminContent}
          ></Route>
          <Route path={match.url + "/lecture"} component={AdminContent}></Route>
          <Route path={match.url + "/hotspot"} component={AdminContent}></Route>
          <Route path={match.url + "/lecture"} component={AdminContent}></Route>
          <Route path={match.url + "/circles"} component={AdminContent}></Route>
          <Route path={match.url + "/groups"} component={AdminContent}></Route>
          <Route
            path={match.url + "/residence"}
            component={AdminContent}
          ></Route>
          <Route
            path={match.url + "/domitory"}
            component={AdminContent}
          ></Route>
          <Route path={match.url + "/faq"} component={AdminContent}></Route>
          <Route path={match.url + "/ad"} component={AdminContent}></Route>
          <Route component={AdminContent}></Route>
        </Switch>
      </div>
    );
  }
}

export default Admin;
