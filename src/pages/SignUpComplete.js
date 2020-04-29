import React, { Component } from "react";
import "./SignUpComplete.scss";
class SignUpComplete extends Component {
  render() {
    return (
      <div className="kohub-signupComplete">
        <div className="kohub-signupComplete__content align-center-col">
          <h1>
            <span className="kohub-signupComplete__logo blind center">
              koHUB SignUpComplete
            </span>
          </h1>
          <hr></hr>
          <div className="kohub-signupComplete__subtitle">
            <h2>이메일 인증 완료</h2>
          </div>
          <div>
            <div>
              <p>안녕하세요. koHUB Team입니다.</p>
              <p>이메일 인증이 완료되었습니다!</p>
            </div>
            <p>감사합니다.</p>
          </div>
          <div className="kohub-signupComplete__button">
            <button>메인으로</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default SignUpComplete;
