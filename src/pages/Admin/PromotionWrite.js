import React, { Component } from "react";
import { Button, FileOpenInput, FormInput } from "../../components";
import "./PromotionWrite.scss";

class PromotionWrite extends Component {
  render() {
    return (
      <form className="kohub-admin-promotion-write">
        <div className="kohub-admin-promotion-write__user-info">
          <FormInput
            type="text"
            placeholder="제목을 입력하세요."
            validOption={"title"}
          ></FormInput>
          <FormInput
            type="email"
            placeholder="이메일을 입력하세요."
            validOption={"email"}
          ></FormInput>
        </div>
        <div className="kohub-admin-promotion-write__promo-info">
          <FormInput
            name="startDate"
            type="date"
            placeholder="시작일"
            validOption={"date"}
          ></FormInput>
          <FormInput
            name="endDate"
            type="date"
            placeholder="종료일"
            validOption={"date"}
          ></FormInput>
          <FormInput
            type="text"
            placeholder="닉네임을 입력하세요."
            validOption={"nickname"}
          ></FormInput>
        </div>
        <div className="kohub-admin-promotion-write__text">
          <textarea></textarea>
        </div>
        <div className="kohub-admin-promotion-write__file">
          <FileOpenInput
            option={"thumbnail"}
            accept={"image/jpg, image/png"}
            multiple={true}
          ></FileOpenInput>
        </div>
        <div className="kohub-admin-promotion-write__btn">
          <Button value={"추가"}></Button>
          <Button value={"취소"}></Button>
        </div>
      </form>
    );
  }
}

export default PromotionWrite;
