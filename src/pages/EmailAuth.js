import React, { Component } from "react";
import "./EmailAuth.scss";
class EmailAuth extends Component {
  render() {
    return (
      <div className="kohub-emailauth">
        <div className="kohub-emailauth__content align-center-col">
          <h1>
            <span className="kohub-emailauth__logo blind center">
              koHUB EmailAuth
            </span>
          </h1>
          <hr></hr>
          <div className="kohub-emailauth__subtitle">
            <h2>이메일 인증 안내입니다.</h2>
          </div>
          <div>
            <div>
              <p>안녕하세요. koHUB Team입니다.</p>
              <p>
                아래 <span>'인증하기'</span> 버튼을 클릭해서 회원가입을
                완료해주세요.
              </p>
            </div>
            <p>감사합니다.</p>
          </div>
          <div className="kohub-emailauth__button">
            <button>인증하기</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default EmailAuth;
