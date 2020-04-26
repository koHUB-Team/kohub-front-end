import React, { Component } from "react";
import "./Login.scss";
class Login extends Component {
  render() {
    return (
      <div className="login-area">
        <div className="login-container">
          <h1>
            <span className="kohub-login__logo blind">koHUB Login</span>
          </h1>
          <div>
            <input type="email" name="email" placeholder="Email"></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
            ></input>
          </div>
          <div className="input-area text-right">
            <a href="./singUp">회원가입</a> <span>| </span>
            <a href="./findPassword">비밀번호 찾기</a>
          </div>
          <div>
            <button>로그인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
