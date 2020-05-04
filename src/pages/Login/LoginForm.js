import React, { Component } from "react";
import "./LoginForm.scss";
import { Link } from "react-router-dom";
class LoginForm extends Component {
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
            <Link to="/signup">회원가입</Link> <span>| </span>
            <Link to="/help/pass">비밀번호 찾기</Link>
          </div>
          <div className="kohub-login__button">
            <button>로그인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
