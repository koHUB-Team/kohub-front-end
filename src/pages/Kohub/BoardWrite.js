import React, { Component } from "react";
import "./BoardWrite.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

class BoardWrite extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { text: "" }; // You can also pass a Quill Delta here
  //   this.handleChange = this.handleChange.bind(this);
  // }
  // handleChange(value) {
  //   this.setState({ text: value });
  // }
  render() {
    return (
      <div className="kohub-boardwrite container">
        <div className="kohub-boardwrite__content content-area">
          <div className="kohub-boardwrite__title">
            <h2>공지사항</h2>
          </div>
          <div className="kohub-boardwrite__hr">
            <hr></hr>
          </div>

          <div className="kohub-boardwrite__input">
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요."
            ></input>
          </div>
          <div className="kohub-boardwrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-boardwrite__text-editor">
            <ReactQuill>
              <div className="kohub-boardwrite__edited-area"></div>
            </ReactQuill>
          </div>
          <div className="kohub-boardwrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-boardwrite___button">
            <button id="register">등록</button>
            <button id="cancel">취소</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardWrite;
