import React, { Component } from "react";
import "./Login.scss";
class Login extends Component {
  render() {
    return (
      <div className="kohub-login">
        <div className="kohub-login__content align-center-col">
          <h1>
            <span className="kohub-login__logo blind center">koHUB Login</span>
          </h1>
          <div className="kohub-login__input">
            <input type="email" name="email" placeholder="Email"></input>
          </div>
          <div className="kohub-login__input">
            <input
              type="password"
              name="password"
              placeholder="Password"
            ></input>
          </div>
          <div className="kohub-login__help">
            <a href="./singUp">회원가입</a> <span>| </span>
            <a href="./findPassword">비밀번호 찾기</a>
          </div>
          <div className="kohub-login__button">
            <button>로그인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
