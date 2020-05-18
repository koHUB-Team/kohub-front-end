import React, { Component } from "react";
import "./NoticeDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Record } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";
import Moment from "moment";

const DetailData = Record({
  id: null,
  title: "",
  user_name: "",
  modify_date: "",
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
    this.requestNoticeApi();
  }

  requestNoticeApi() {
    let params = {
      noticeId: 53,
    };
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_NOTICE;
    let queryStr = ApiUtil.parseObjToQueryStr(params);
    url += queryStr;
    console.log(url);

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
      user_name: noticeBoard.userName,
      modify_date: Moment(noticeBoard.modifyDate).format("YYYY.MM.DD hh:mm:ss"),
      content: noticeBoard.content,
    });

    this.setState({
      detailData: newData,
    });
  }
  render() {
    let { detailData } = this.state;
    return (
      <div className="kohub-noticedetail container">
        <div className="kohub-noticedetail__content content-area">
          <div className="kohub-noticedetail__header">
            <h2>공지사항</h2>
            <div className="kohub-noticedetail__manage">
              <Link to="/">
                <span>
                  <FontAwesomeIcon icon={faEdit} flip="horizontal" /> {""}수정
                </span>
              </Link>
              |
              <Link to="/">
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faTrashAlt} flip="horizontal" /> {""}
                  삭제
                </span>
              </Link>
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
              <span>작성자 : {detailData.user_name}</span>
              <br></br>
              <span>{detailData.modify_date}</span>
            </div>
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
          <div
            className="kohub-noticedetail__article"
            dangerouslySetInnerHTML={{ __html: detailData.content }}
          >
            {/* <p>{}</p> */}
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
