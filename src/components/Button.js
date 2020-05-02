import React, { Component } from "react";
import "./Button.scss";

class Button extends Component {
  onBtnClickListener(e) {
    this.props.onClick();
  }

  render() {
    let { value } = this.props;
    return (
      <button
        onClick={this.onBtnClickListener.bind(this)}
        className="kohub-btn"
      >
        {value}
      </button>
    );
  }
}

export default Button;
