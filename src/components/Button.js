import React, { Component } from "react";
import "./Button.scss";

//****Button 컴포넌트****//
//props
//value : 버튼에 표시할 텍스트 / type : String
//onClick : 버튼 클릭시 실행할 콜백 메소드

class Button extends Component {
  onBtnClickListener(e) {
    let { onClick } = this.props;
    onClick();
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
