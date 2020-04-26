import React, { Component } from "react";
import "./Login.scss";
class SignUpAuth extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>koHUB</h1>
          <hr></hr>
          <div>
            <h2>이메일 인증</h2>
          </div>
          <div>
            <span>
              입력하신 이메일 주소로 가입 인증 이메일이 발송되었습니다.
            </span>
            <br></br>
            <span>회원가입을 완료하기 위해 이메일 인증을 해주세요.</span>
          </div>
          <div>
            <button>재전송</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default SignUpAuth;
