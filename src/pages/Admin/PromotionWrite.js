import React, { Component } from "react";
import { Button, FileOpenInput, FormInput } from "../../components";
import "./PromotionWrite.scss";
import ReactQuill from "react-quill";
import Moment from "moment";

class PromotionWrite extends Component {
  constructor(props) {
    super(props);
    this._quillModules = {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
      },
    };
    this._quillFormats = [
      "header",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "link",
      "image",
    ];
    this.startDate = "";
    this.endDate = "";
    this.content = "";
    this.promotionImageFile = null;
    this.titleValid = false;
    this.emailValid = false;
    this.startDateValid = false;
    this.endDateValid = false;
    this.promotionImageFileValid = false;
  }

  onSubmitListener(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.isFormDataValid()) {
      alert(
        "프로모션 추가 양식을 모두 입력해주세요. 이미지는 반드시 등록해야합니다."
      );
      return;
    }

    let formNode = e.target;
    let formData = new FormData();
    formData.append("title", formNode.title.value);
    formData.append("email", formNode.email.value);
    formData.append("startDate", this.startDate);
    formData.append("endDate", this.endDate);
    formData.append("content", this.content);
    formData.append("promotionImage", this.promotionImageFile[0]);

    this.requestPostPromtionApi(formData);
  }

  requestPostPromtionApi(formData) {
    let url = process.env.REACT_APP_KOHUB_API_URL_POST_PROMOTION;

    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {},
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("홍보 게시물이 등록되었습니다.");
      })
      .catch((err) => {
        alert("홍보 게시물을 등록하는데 문제가 발생했습니다.");
      });
  }

  onFileChangeCallback(loadedFiles) {
    this.promotionImageFile = loadedFiles;
  }

  onContentChangeListener(content, delta, source, editor) {
    this.content = content;
    this.contentValid = true;
  }

  onTitleBlur(isValid) {
    this.titleValid = isValid;
  }

  onEmailBlur(isValid) {
    this.emailValid = isValid;
  }

  onCancelBtnClickCallback() {
    let { onCancelBtnClick } = this.props;
    if (onCancelBtnClick !== undefined) {
      onCancelBtnClick();
    }
  }

  //현재날짜보다 이전값 받으면 안됨 -- 유효성검사
  onStartDateChangeCallback(newStartDate, isValid) {
    if (this.endDate !== "") {
      if (!this.validPromotionDate(newStartDate, this.endDate)) {
        alert("홍보시작 날짜는 홍보종료 이전날짜여야 합니다.");
        this.startDateValid = false;
        return;
      }
    }

    this.startDate = Moment(newStartDate).format("YYYY.MM.DD");
    this.startDateValid = isValid;
  }

  onEndDateChangeCallback(newEndDate, isValid) {
    if (this.startDate !== "") {
      if (!this.validPromotionDate(this.startDate, newEndDate)) {
        alert("홍보종료 날짜는 홍보시작 이후날짜여야 합니다.");
        this.endDateValid = false;
        return;
      }
    }

    this.endDate = Moment(newEndDate).format("YYYY.MM.DD");
    this.endDateValid = isValid;
  }

  validPromotionDate(startDate, endDate) {
    return Moment(startDate).isBefore(endDate);
  }

  validPromotionImageFile() {
    if (this.promotionImageFile.length > 0) {
      this.promotionImageFileValid = true;
    } else {
      this.promotionImageFileValid = false;
    }
  }

  isFormDataValid() {
    if (this.promotionImageFile !== null) {
      this.validPromotionImageFile();
    }

    return (
      this.titleValid &&
      this.emailValid &&
      this.startDateValid &&
      this.endDateValid &&
      this.contentValid &&
      this.promotionImageFileValid
    );
  }

  render() {
    return (
      <form
        className="kohub-admin-promotion-write"
        onSubmit={this.onSubmitListener.bind(this)}
      >
        <div className="kohub-admin-promotion-write__user-info">
          <FormInput
            name="title"
            type="text"
            placeholder="제목을 입력하세요."
            validOption={"title"}
            onBlur={this.onTitleBlur.bind(this)}
          ></FormInput>
          <FormInput
            name="email"
            type="email"
            placeholder="이메일을 입력하세요."
            validOption={"email"}
            onBlur={this.onEmailBlur.bind(this)}
          ></FormInput>
        </div>
        <div className="kohub-admin-promotion-write__promo-info">
          <FormInput
            name="startDate"
            type="date"
            placeholder="시작일"
            validOption={"date"}
            onChange={this.onStartDateChangeCallback.bind(this)}
          ></FormInput>
          <FormInput
            name="endDate"
            type="date"
            placeholder="종료일"
            validOption={"date"}
            onChange={this.onEndDateChangeCallback.bind(this)}
          ></FormInput>
        </div>
        <div className="kohub-admin-promotion-write__text-editor">
          <ReactQuill
            theme="snow"
            modules={this._quillModules}
            formats={this._quillFormats}
            toolbar={false}
            onChange={this.onContentChangeListener.bind(this)}
          >
            <div className="kohub-admin-promotion-write__edited-area"></div>
          </ReactQuill>
        </div>
        <div className="kohub-admin-promotion-write__file">
          <FileOpenInput
            name="promotionImage"
            option={"thumbnail"}
            accept={"image/jpg, image/png"}
            multiple={false}
            onFileChange={this.onFileChangeCallback.bind(this)}
          ></FileOpenInput>
        </div>
        <div className="kohub-admin-promotion-write__btn">
          <Button type={"submit"} value={"추가"}></Button>
          <Button
            value={"취소"}
            onClick={this.onCancelBtnClickCallback.bind(this)}
          ></Button>
        </div>
      </form>
    );
  }
}

export default PromotionWrite;
