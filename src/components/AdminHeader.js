import React, { Component } from "react";
import { AdminTitle, SearchBar } from ".";
import "./AdminHeader.scss";
import { Link } from "react-router-dom";

//selectedMenuId에 따라 컴포넌트들을 조합해서 헤더를 렌더링
class AdminHeader extends Component {
  render() {
    let selectedMenuId = this.props.selectedMenuId;

    return (
      <header className="kohub-admin-header">
        <div className="kohub-admin-header-area">
          <AdminTitle selectedMenuId={selectedMenuId}></AdminTitle>
          <div className="align-center-col">
            <SearchBar type="admin"></SearchBar>
          </div>
          <div className="kohub-admin-header__align-btn">
            <Link to="">
              <span>Auth</span>
            </Link>
            <Link to="">
              <span>State</span>
            </Link>
            <Link to="">
              <span>Role</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default AdminHeader;
