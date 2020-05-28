import React, { Component } from "react";
import "./Promotion.scss";
import { AdminNavContainer, PromotionReadContainer } from "../../containers";
import { MODE } from "../../store";
import PromotionWrite from "./PromotionWrite";

class Promotion extends Component {
  getReadPage() {
    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <PromotionReadContainer></PromotionReadContainer>
          </div>
        </div>
      </div>
    );
  }

  getWritePage() {
    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <PromotionWrite></PromotionWrite>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { mode } = this.props;
    console.log(mode);

    let page;
    switch (mode) {
      case MODE.READ:
        page = this.getReadPage();
        break;
      case MODE.CREATE:
        page = this.getWritePage();
        break;
    }

    return page;
  }
}

export default Promotion;
