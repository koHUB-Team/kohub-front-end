import React, { Component } from "react";
import "./Button.scss";

//****Button 컴포넌트****//
//props
//type : 버튼의 type / type : String
//value : 버튼에 표시할 텍스트 / type : String
//onClick : 버튼 클릭시 실행할 콜백 메소드
//btnType : 버튼에 추가할 className

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

  getBtnType() {
    let { btnType } = this.props;
    if (btnType === undefined) {
      return "";
    }

    return btnType;
  }

  render() {
    let value = this.getValue();
    let type = this.getType();
    let btnType = this.getBtnType();

    return (
      <button
        type={type}
        onClick={this.onBtnClickListener.bind(this)}
        className={"kohub-btn " + btnType}
      >
        {value}
      </button>
    );
  }
}

export default Button;
