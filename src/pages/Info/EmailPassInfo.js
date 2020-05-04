import React, { Component } from "react";
import "./EmailPassInfo.scss";
class EmailPassInfo extends Component {
  render() {
    return (
      <div className="kohub-emailpass">
        <div className="kohub-emailpass__content align-center-col">
          <h1>
            <span className="kohub-emailpass__logo blind center">
              koHUB EmailPassword
            </span>
          </h1>
          <hr></hr>
          <div className="kohub-emailpass__subtitle">
            <h2>비밀번호 안내 이메일입니다.</h2>
          </div>
          <div>
            <div>
              <p>안녕하세요. koHUB Team입니다.</p>
              <p>비밀번호는 *******입니다.</p>
            </div>
            <p>감사합니다.</p>
          </div>
          <div className="kohub-emailpass__button">
            <button>로그인하기</button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default EmailPassInfo;
