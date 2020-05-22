import React, { Component } from "react";
import "./Button.scss";

//****Button 컴포넌트****//
//props
//type : 버튼의 type / type : String
//value : 버튼에 표시할 텍스트 / type : String
//onClick : 버튼 클릭시 실행할 콜백 메소드

class Button extends Component {
  onBtnClickListener(e) {
    let { onClick } = this.props;

    if (onClick !== undefined) {
      onClick();
    }
  }

  getType() {
    let { type } = this.props;
    if (type === undefined) {
      return "";
    }

    return type;
  }

  getValue() {
    let { value } = this.props;
    if (value === undefined) {
      return "";
    }

    return value;
  }

  render() {
    let value = this.getValue();
    let type = this.getType();

    return (
      <button
        type={type}
        onClick={this.onBtnClickListener.bind(this)}
        // onSubmit={}
        className="kohub-btn"
      >
        {value}
      </button>
    );
  }
}

export default Button;
