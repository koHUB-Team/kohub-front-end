import React, { Component } from "react";
import "./BoardHeader.scss";

class BoardHeader extends Component {
  render() {
    let { value } = this.props;

    return (
      <div className="kohub-boardheader">
        <h2>{value}</h2>
      </div>
    );
  }
}

export default BoardHeader;
