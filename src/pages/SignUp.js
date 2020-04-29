import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./SignUp.scss";
class SignUp extends Component {
  render() {
    return (
      <div className="kohub-signup">
        <div className="kohub-signup__content align-center-col">
          <h1>
            <span className="kohub-signup__logo blind center">
              koHUB SignUp
            </span>
          </h1>
          <hr></hr>
          <div className="kohub-signup__input">
            <span>아이디</span>
            <div>
              <input type="email" name="email" placeholder="Email"></input>
            </div>
            <div className="kohub-signup__notice">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span> 입력한 이메일 주소로 인증메일이 발송됩니다.</span>
            </div>
          </div>
          <div className="kohub-signup__input">
            <span>비밀번호</span>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div className="kohub-signup__input">
            <span>비밀번호 확인</span>
            <div>
              <input
                type="password"
                name="check_password"
                placeholder="Password"
              ></input>
            </div>
          </div>

          <div className="kohub-signup__input">
            <span>닉네임</span>
            <div>
              <input type="text" name="nickname"></input>
            </div>
            <div className="kohub-signup__notice">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span> 게시물 / 댓글 작성시 사용됩니다.</span>
            </div>
          </div>
          <div className="kohub-signup__button">
            <button>회원가입</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
