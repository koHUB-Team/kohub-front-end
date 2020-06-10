import React, { Component } from "react";
import "./NoticeWrite.scss";
import "react-quill/dist/quill.snow.css";
import { Button, FormInput, Editor } from "../../components";
class NoticeWrite extends Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.content = null;
  }

  onTitleChangeListener(newTitle) {
    this.title = newTitle;
  }

  onContentChangeCallback(content, delta, source, editor) {
    this.content = content;
  }

  requestPostNoticeApi() {
    let data = {
      title: this.title,
      content: this.content,
      userId: 1,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_POST_NOTICE;
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        return result.json();
      })
      .then(() => {
        alert("게시물이 등록되었습니다.");
        this.onRegisterBtnClickCallback();
      })
      .catch((err) => {
        alert("게시물을 등록하는데 문제가 발생했습니다." + err);
      });
  }
  onRegisterBtnClickCallback() {
    let { onRegisterBtnClick } = this.props;
    if (onRegisterBtnClick !== undefined) {
      onRegisterBtnClick();
    }
  }
  onCancelBtnClickCallback() {
    let { onCancelBtnClick } = this.props;
    if (onCancelBtnClick !== undefined) {
      onCancelBtnClick();
    }
  }
  onSubmitListener(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.title === "" || this.content === null) {
      alert("제목과 내용 모두 입력하여주세요.");
      return;
    }

    this.requestPostNoticeApi();
  }

  render() {
    return (
      <form
        className="kohub-noticewrite container"
        onSubmit={this.onSubmitListener.bind(this)}
      >
        <div className="kohub-noticewrite__content content-area">
          <div className="kohub-noticewrite__title">
            <h2>공지사항</h2>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>

          <div className="kohub-noticewrite__input">
            <FormInput
              type="text"
              name="title"
              placeholder="제목을 입력하세요."
              onChange={this.onTitleChangeListener.bind(this)}
              validOption={"title"}
            ></FormInput>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticewrite__text-editor">
            <Editor
              onContentChange={this.onContentChangeCallback.bind(this)}
            ></Editor>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticewrite___button">
            <Button
              value={"등록"}
              type={"submit"}
              btnType={"register"}
            ></Button>
            <Button
              value={"취소"}
              btnType={"cancel"}
              onClick={this.onCancelBtnClickCallback.bind(this)}
            ></Button>
          </div>
        </div>
      </form>
    );
  }
}

export default NoticeWrite;
