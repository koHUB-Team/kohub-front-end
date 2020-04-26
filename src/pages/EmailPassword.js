import React, { Component } from "react";
import "./Login.scss";
class EmailPassword extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>koHUB</h1>
          <hr></hr>
          <div>
            <h2>비밀번호 안내 이메일입니다.</h2>
          </div>
          <div>
            <div>
              <span>안녕하세요. koHUB Team입니다.</span>
            </div>
            <div>
              <span>비밀번호는 *******입니다.</span>
            </div>
            <span>감사합니다.</span>
          </div>
          <div>
            <button>로그인하기</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default EmailPassword;
