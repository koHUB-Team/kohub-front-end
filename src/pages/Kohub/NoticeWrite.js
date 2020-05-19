import React, { Component } from "react";
import "./NoticeWrite.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WriteButton, BoardHeader, FormInput } from "../../components";
class NoticeWrite extends Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.content = null;
  }

  onTitleChangeListener(newTitle) {
    this.title = newTitle;
  }

  onContentChangeListener(content, delta, source, editor) {
    this.content = editor.getHTML();
  }

  onSumitBtnClickCallback() {
    if (this.title === "" || this.content === null) {
      alert("제목과 내용 모두 입력하여주세요.");
      return;
    }

    this.requestPostNoticeApi();
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
        alert("게시물이 등록되었습니다.");
      })
      .catch((err) => {
        alert("게시물을 등록하는데 문제가 발생했습니다.");
      });
  }

  render() {
    return (
      <form className="kohub-noticewrite container">
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
            <ReactQuill onChange={this.onContentChangeListener.bind(this)}>
              <div className="kohub-noticewrite__edited-area"></div>
            </ReactQuill>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticewrite___button">
            <WriteButton
              value={"등록"}
              type={"register"}
              onClick={this.onSumitBtnClickCallback.bind(this)}
            ></WriteButton>
            <WriteButton value={"취소"} type={"cancel"}></WriteButton>
          </div>
        </div>
      </form>
    );
  }
}

export default NoticeWrite;
