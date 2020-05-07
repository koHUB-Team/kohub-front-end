import React, { Component } from "react";
import "./Promotion.scss";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import { Table } from "../../components";

class Promotion extends Component {
  render() {
    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <header className="kohub-admin-header">
              <div className="kohub-admin-header-area">
                <AdminTitleContainer></AdminTitleContainer>
              </div>
            </header>
            {/* <Table></Table> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Promotion;
