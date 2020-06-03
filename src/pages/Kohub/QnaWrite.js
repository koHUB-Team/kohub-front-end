import React, { Component } from "react";
import "./QnaWrite.scss";
import "react-quill/dist/quill.snow.css";
import { Button, FormInput, Editor, DropBox } from "../../components";
import { List } from "immutable";

class QnaWrite extends Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.content = null;
    this.selectedDropMenu = null;
    this.dropMenuList = List(["신고", "문의사항", "건의사항"]);
  }

  onTitleChangeListener(newTitle) {
    this.title = newTitle;
  }

  onContentChangeCallback(content) {
    this.content = content;
  }
  onSubmitListener(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(this.content);
    console.log(this.title);

    if (this.title === "" || this.content === null) {
      alert("제목, 내용 모두 입력하여 주세요.");
      return;
    }

    this.requestPostNoticeApi();
  }
  requestPostNoticeApi() {
    let data = {
      title: this.title,
      content: this.content,
      category: this.selectedDropMenu,
      userId: 104,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_POST_QNA;
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
        alert("게시물을 등록하는데 문제가 발생했습니다.");
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

  onDropMenuClickCallback(selectedDropMenu) {
    this.selectedDropMenu = selectedDropMenu;
    console.log(this.selectedDropMenu);
  }
  render() {
    return (
      <form
        className="kohub-qnawrite container"
        onSubmit={this.onSubmitListener.bind(this)}
      >
        <div className="kohub-qnawrite__content content-area">
          <div className="kohub-qnawrite__header">
            <h2>Q&amp;A</h2>
          </div>
          <div className="kohub-qnawrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-qnawrite__input">
            <div className="kohub-qnawrite__drop-box">
              <DropBox
                onMenuClick={this.onDropMenuClickCallback.bind(this)}
                menus={this.dropMenuList}
              ></DropBox>
            </div>
            <div className="kohub-qnawrite__title">
              <FormInput
                type="text"
                name="title"
                placeholder="제목을 입력하세요."
                validOption={"title"}
                onChange={this.onTitleChangeListener.bind(this)}
              ></FormInput>
            </div>
          </div>
          <div className="kohub-qnawrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-qnawrite__text-editor">
            <Editor
              onContentChange={this.onContentChangeCallback.bind(this)}
            ></Editor>
          </div>
          <div className="kohub-qnawrite__hr">
            <hr></hr>
          </div>
          <div className="kohub-qnawrite___button">
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

export default QnaWrite;
