import React, { Component } from "react";
import "./Button.scss";

//****Button 컴포넌트****//
//props
//value : 버튼에 표시할 텍스트 / type : String
//onClick : 버튼 클릭시 실행할 콜백 메소드
//btnType : 버튼에 추가할 className

class Button extends Component {
  onBtnClickListener(e) {
    let { onClick } = this.props;
    onClick();
  }
  render() {
    let { value, btnType } = this.props;
    return (
      <button
        onClick={this.onBtnClickListener.bind(this)}
        className={"kohub-btn " + btnType}
      >
        {value}
      </button>
    );
  }
}

export default Button;
