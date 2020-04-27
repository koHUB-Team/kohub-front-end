import React, { Component } from "react";
import "./AdminContent.scss";
import AdminHeader from "./AdminHeader";

class AdminContent extends Component {
  render() {
    return (
      <div className="kohub-admin-content-container">
        <div className="kohub-admin-content-area">
          <AdminHeader selectedMenuId={1}></AdminHeader>
        </div>
      </div>
    );
  }
}

export default AdminContent;
