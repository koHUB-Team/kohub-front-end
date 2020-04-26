import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";
class SignUp extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>koHUB</h1>
          <hr></hr>
          <div className="input-area text-left font-bold">
            <span>아이디</span>
          </div>
          <div>
            <input type="email" name="email" placeholder="Email"></input>
          </div>
          <div className="input-area text-right">
            <FontAwesomeIcon icon={faInfoCircle} className="color-base" />
            <span className="color-base">
              {" "}
              입력한 이메일 주소로 인증메일이 발송됩니다.
            </span>
          </div>
          <div className="input-area text-left font-bold">
            <span>비밀번호</span>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
            ></input>
          </div>
          <div className="input-area text-left font-bold">
            <span>비밀번호 확인</span>
          </div>
          <div>
            <input
              type="password"
              name="check_password"
              placeholder="Password"
            ></input>
          </div>
          <div className="input-area text-left font-bold">
            <span>닉네임</span>
          </div>
          <div>
            <input type="text" name="nickname"></input>
          </div>
          <div className="input-area text-right">
            <FontAwesomeIcon icon={faInfoCircle} className="color-base" />
            <span className="color-base">
              {" "}
              게시물 / 댓글 작성시 사용됩니다.
            </span>
          </div>
          <div>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
