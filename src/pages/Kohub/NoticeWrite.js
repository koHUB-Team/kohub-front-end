import React, { Component } from "react";
import "./NoticeWrite.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WriteButton } from "../../components";
class NoticeWrite extends Component {
  render() {
    return (
      <div className="kohub-noticewrite container">
        <div className="kohub-noticewrite__content content-area">
          <div className="kohub-noticewrite__title">
            <h2>공지사항</h2>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>

          <div className="kohub-noticewrite__input">
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요."
            ></input>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticewrite__text-editor">
            <ReactQuill>
              <div className="kohub-noticewrite__edited-area"></div>
            </ReactQuill>
          </div>
          <div className="kohub-noticewrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticewrite___button">
            <WriteButton value={"등록"} type={"register"}></WriteButton>
            <WriteButton value={"취소"} type={"cancel"}></WriteButton>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeWrite;
