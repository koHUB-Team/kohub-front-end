import React, { Component } from "react";
import { AdminTitle, SearchBar } from ".";
import "./AdminHeader.scss";

class AdminHeader extends Component {
  render() {
    let selectedMenuId = this.props.selectedMenuId;

    return (
      <header>
        <div className="kohub-admin-header-area">
          <AdminTitle selectedMenuId={selectedMenuId}></AdminTitle>
          <div className="align-center-col">
            <SearchBar type="admin"></SearchBar>
          </div>
        </div>
      </header>
    );
  }
}

export default AdminHeader;
