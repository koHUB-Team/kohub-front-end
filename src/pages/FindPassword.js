import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";
class FindPassword extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>koHUB</h1>
          <hr></hr>
          <div>
            <h2>비밀번호 찾기</h2>
          </div>
          <div className="input-area text-left">
            <span className="font-bold">아이디</span>
          </div>
          <div>
            <input type="email" name="email" placeholder="Email"></input>
          </div>
          <div className="input-area text-right">
            <FontAwesomeIcon icon={faInfoCircle} className="color-base" />
            <span className="color-base">
              {" "}
              입력한 이메일 주소로 인증메일이 발송됩니다.
            </span>
          </div>
          <div>
            <button>메일보내기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FindPassword;
