import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./FindPassword.scss";
class FindPassword extends Component {
  render() {
    return (
      <div className="kohub-findpassword">
        <div className="kohub-findpassword__content align-center-col">
          <h1>
            <span className="kohub-findpassword__logo blind center">
              koHUB FindPassword
            </span>
          </h1>
          <hr></hr>
          <div className="kohub-findpassword__subtitle">
            <h2>비밀번호 찾기</h2>
          </div>
          <div className="kohub-findpassword__input">
            <span className="font-bold">아이디</span>
            <div>
              <input type="email" name="email" placeholder="Email"></input>
            </div>
            <div className="kohub-findpassword__notice">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span> 입력한 이메일 주소로 인증메일이 발송됩니다.</span>
            </div>
          </div>

          <div className="kohub-findpassword__button">
            <button>메일보내기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FindPassword;
