import React, { Component } from "react";
import "./NoticeDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Record } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";
import Moment from "moment";

const DetailData = Record({
  id: null,
  title: "",
  userName: "",
  createDate: "",
  content: "",
});

class NoticeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData(),
    };
  }

  componentDidMount() {
    let { selectedDetailId } = this.props;

    let params = {
      noticeId: selectedDetailId,
    };
    this.requestNoticeApi(params);
  }

  requestNoticeApi(params = null) {
    if (params == null) {
      return;
    }

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
      userName: noticeBoard.userName,
      createDate: Moment(noticeBoard.createDate).format("YYYY.MM.DD hh:mm:ss"),
      content: noticeBoard.content,
    });

    this.setState({
      detailData: newData,
    });
  }
  onDeleteApiHandler() {
    let pathVariable = {
      noticeId: this.state.detailData.id,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_DELETE_NOTICE;
    url = ApiUtil.bindPathVariable(url, pathVariable);
    console.log(url);

    fetch(url, {
      method: "DELETE",
    })
      .then((result) => {
        alert("삭제되었습니다.");
      })
      .then(() => {
        this.onDeleteBtnClickCallback();
      })
      .catch((err) => {
        new Error("NoticeDetail Error");
      });
  }

  onUpdateBtnClickCallback() {
    let { onUpdateBtnClick } = this.props;
    if (onUpdateBtnClick !== undefined) {
      onUpdateBtnClick();
    }
    console.log("click!!");
  }
  onDeleteBtnClickCallback() {
    let { onDeleteBtnClick } = this.props;
    if (onDeleteBtnClick !== undefined) {
      onDeleteBtnClick();
    }
  }
  render() {
    let { detailData } = this.state;
    return (
      <div className="kohub-noticedetail container">
        <div className="kohub-noticedetail__content content-area">
          <div className="kohub-noticedetail__header">
            <h2>공지사항</h2>
            <div className="kohub-noticedetail__manage">
              <span onClick={this.onUpdateBtnClickCallback.bind(this)}>
                <FontAwesomeIcon icon={faEdit} flip="horizontal" /> {""}수정
              </span>
              |
              <span onClick={this.onDeleteApiHandler.bind(this)}>
                {" "}
                <FontAwesomeIcon icon={faTrashAlt} flip="horizontal" /> {""}
                삭제
              </span>
            </div>
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticedetail__title-area ">
            <div className="kohub-noticedetail__title align-center-col">
              <span>{detailData.title}</span>
            </div>
            <div className="kohub-noticedetail__user-info align-center-col">
              <span>작성자 : {detailData.userName}</span>
              <br></br>
              <span>{detailData.createDate}</span>
            </div>
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
          <div
            className="kohub-noticedetail__article"
            dangerouslySetInnerHTML={{ __html: detailData.content }}
          ></div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
