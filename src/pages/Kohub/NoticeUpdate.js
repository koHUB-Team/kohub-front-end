import React, { Component } from "react";
import "./NoticeUpdate.scss";
import { WriteButton, FormInput, Editor } from "../../components";
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
  }
  componentDidMount() {
    this.requestNoticeApi();
  }

  requestNoticeApi() {
    let params = {
      noticeId: 12,
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
    let { detailData } = this.state;
    let newDetailData = detailData.set("title", newTitle);

    this.setState({
      detailData: newDetailData,
      isTitleChange: true,
      isContentChange: false,
    });
  }

  onContentChangeCallback(content, delta, source, editor) {
    let { detailData } = this.state;
    let newDetailData = detailData.set("content", content);

    this.setState({
      detailData: newDetailData,
      isTitleChange: false,
      isContentChange: true,
    });
  }

  onSumitBtnClickCallback() {
    // if (this.title === "" || this.content === null) {
    //   alert("제목과 내용 모두 입력하여주세요.");
    //   return;
    // }

    this.requestPutNoticeApi();
  }

  requestPutNoticeApi() {
    let { detailData } = this.state;

    let data = {
      title: detailData.title,
      content: detailData.content,
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
    let { isTitleChange, isContentChange, detailData } = this.state;

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
              focus={isTitleChange}
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
            focus={isContentChange}
          ></Editor>
          <div className="kohub-noticeupdate__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticeupdate___button">
            <WriteButton
              value={"수정"}
              type={"register"}
              onClick={this.onSumitBtnClickCallback.bind(this)}
            ></WriteButton>
            <WriteButton
              value={"취소"}
              type={"cancel"}
              onClick={this.onCancelBtnClickCallback.bind(this)}
            ></WriteButton>
          </div>
        </div>
      </form>
    );
  }
}

export default NoticeUpdate;
