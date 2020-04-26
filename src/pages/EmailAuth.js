import React, { Component } from "react";
import "./Login.scss";
class EmailAuth extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>koHUB</h1>
          <hr></hr>
          <div>
            <h2>이메일 인증 안내입니다.</h2>
          </div>
          <div>
            <div>
              <span>안녕하세요. koHUB Team입니다.</span>
            </div>
            <div>
              <span>
                아래 <span className="font-bold">'인증하기'</span> 버튼을
                클릭해서 회원가입을 완료해주세요.
              </span>
            </div>
            <span>감사합니다.</span>
          </div>
          <div>
            <button>인증하기</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default EmailAuth;
