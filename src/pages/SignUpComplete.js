import React, { Component } from "react";
import "./Login.scss";
class SignUpComplete extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>koHUB</h1>
          <hr></hr>
          <div>
            <h2>이메일 인증 완료</h2>
          </div>
          <div>
            <div>
              <span>안녕하세요. koHUB Team입니다.</span>
            </div>
            <div>
              <span>이메일 인증이 완료되었습니다!</span>
            </div>
            <span>감사합니다.</span>
          </div>
          <div>
            <button>메인으로</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default SignUpComplete;
