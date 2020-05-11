import React, { Component } from "react";
import { Button, FileOpenInput } from "../../components";

class PromotionWrite extends Component {
  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="제목을 입력하세요." />
          <input type="text" placeholder="아이디를 입력하세요." />
        </div>
        <div>
          <div>
            <input type="text" placeholder="시작일" />
            <input type="text" placeholder="종료일" />
          </div>
          <input type="text" placeholder="닉네임을 입력하세요."></input>
        </div>
        <FileOpenInput accept={"image/jpg, image/png"}></FileOpenInput>
        <textarea></textarea>
      </div>
    );
  }
}

export default PromotionWrite;
