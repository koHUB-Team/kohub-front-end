import React, { Component } from "react";
import "./NoticeUpdate.scss";
import { Button, FormInput, Editor } from "../../components";
import { Record } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";

const DetailData = Record({
  id: null,
  title: "",
  content: "",
});

class NoticeUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData(),
      isTitleChange: false,
      isContentChange: false,
    };
    this.title = "";
    this.content = null;
  }
  componentDidMount() {
    this.requestNoticeApi();
  }

  requestNoticeApi() {
    let params = {
      noticeId: 2,
    };
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_NOTICE;
    let queryStr = ApiUtil.parseObjToQueryStr(params);
    url += queryStr;

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let noticeBoard = json;
        this.noticeApiHandler(noticeBoard);
      })
      .catch((err) => {
        new Error("NoticeDetail Error");
      });
  }

  noticeApiHandler(noticeBoard) {
    let newData = DetailData({
      id: noticeBoard.id,
      title: noticeBoard.title,
      content: noticeBoard.content,
    });

    this.setState({
      detailData: newData,
    });
  }

  onTitleChangeListener(newTitle) {
    this.title = newTitle;
  }

  onContentChangeCallback(content, delta, source, editor) {
    this.content = content;
  }

  onSumitBtnClickCallback() {
    if (this.title === "" || this.content === null) {
      alert("제목과 내용 모두 입력하여주세요.");
      return;
    }

    this.requestPutNoticeApi();
  }

  requestPutNoticeApi() {
    let data = {
      title: this.title,
      content: this.content,
      userId: 1,
    };

    let pathVariable = {
      noticeId: this.state.detailData.id,
    };
    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_NOTICE;
    url = ApiUtil.bindPathVariable(url, pathVariable);
    console.log(url);

    fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        alert("게시물이 수정되었습니다..");
      })
      .then(() => {
        this.onUpdateBtnClickCallback();
      })
      .catch((err) => {
        alert("게시물을 등록하는데 문제가 발생했습니다.");
      });
  }

  onUpdateBtnClickCallback() {
    let { onUpdateBtnClick } = this.props;
    if (onUpdateBtnClick !== undefined) {
      onUpdateBtnClick();
    }
  }

  onCancelBtnClickCallback() {
    let { onCancelBtnClick } = this.props;
    if (onCancelBtnClick !== undefined) {
      onCancelBtnClick();
    }
  }

  render() {
    let { detailData } = this.state;

    return (
      <form className="kohub-noticeupdate container">
        <div className="kohub-noticeupdate__content content-area">
          <div className="kohub-noticeupdate__title">
            <h2>공지사항</h2>
          </div>
          <div className="kohub-noticeupdate__hr">
            <hr></hr>
          </div>

          <div className="kohub-noticeupdate__input">
            <FormInput
              type="text"
              name="title"
              value={detailData.title}
              onChange={this.onTitleChangeListener.bind(this)}
              validOption={"title"}
            ></FormInput>
          </div>
          <div className="kohub-noticeupdate__hr">
            <hr></hr>
          </div>
          <Editor
            onContentChange={this.onContentChangeCallback.bind(this)}
            value={detailData.content}
          ></Editor>
          <div className="kohub-noticeupdate__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticeupdate___button">
            <Button
              value={"수정"}
              btnType={"register"}
              onClick={this.onSumitBtnClickCallback.bind(this)}
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

export default NoticeUpdate;
