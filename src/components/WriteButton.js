import React, { Component } from "react";
import "./WriteButton.scss";

class WriteButton extends Component {
  onBtnClickListener(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    let { value } = this.props;
    let { type } = this.props;
    console.log(this.props.type);
    return (
      <button
        onClick={this.onBtnClickListener.bind(this)}
        className="kohub-write-btn"
        id={type}
      >
        {value}
      </button>
    );
  }
}

export default WriteButton;
