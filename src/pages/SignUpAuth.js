import React, { Component } from "react";
import "./SignUpAuth.scss";
class SignUpAuth extends Component {
  render() {
    return (
      <div className="kohub-signupAuth">
        <div className="kohub-signupAuth__content align-center-col">
          <h1>
            <span className="kohub-signupAuth__logo blind center">
              koHUB SignUpAuth
            </span>
          </h1>
          <hr></hr>
          <div className="kohub-signupAuth__subtitle">
            <h2>이메일 인증</h2>
          </div>
          <div>
            <span>
              입력하신 이메일 주소로 가입 인증 이메일이 발송되었습니다.
            </span>
            <br></br>
            <span>회원가입을 완료하기 위해 이메일 인증을 해주세요.</span>
          </div>
          <div className="kohub-signupAuth__button">
            <button>재전송</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default SignUpAuth;
