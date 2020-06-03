import React, { Component } from "react";
import "./QnaDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Record } from "immutable";
import Moment from "moment";
import { ApiUtil } from "../../common/kohubUtil";

const DetailData = Record({
  id: null,
  title: "",
  userName: "",
  createDate: "",
  content: "",
});

class QnaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData({}),
    };
  }

  componentDidMount() {
    let { selectedDetailId } = this.props;
    let params = {
      qnaId: selectedDetailId,
    };
    this.requestQnaApi(params);
  }
  requestQnaApi(params = null) {
    if (params === null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_QNA;
    let queryStr = ApiUtil.parseObjToQueryStr(params);
    url += queryStr;

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let qna = json;
        this.qnaApiHandler(qna);
      })
      .catch((err) => {
        new Error("QnaDetail Error");
      });
  }
  qnaApiHandler(qna) {
    let newData = DetailData({
      id: qna.id,
      title: qna.title,
      userName: qna.userName,
      createDate: qna.createDate,
      content: qna.content,
    });

    this.setState({
      detailData: newData,
    });
  }

  render() {
    let { detailData } = this.state;
    return (
      <div className="kohub-qnadetail container">
        <div className="content-area kohub-qnadetail__content">
          <div className="kohub-qnadetail__header">
            <h2>Q&amp;A</h2>
            <div className="kohub-qnadetail__manage">
              <span>
                <FontAwesomeIcon icon={faEdit} flip="horizontal" />
                {""}수정
              </span>
              |
              <span>
                <FontAwesomeIcon icon={faTrashAlt} flip="horizontal" />
                {""}삭제
              </span>
            </div>
          </div>
          <div className="kohub-qnadetail__hr">
            <hr></hr>
          </div>
          <div className="kohub-qnadetail__title-area">
            <div className="kohub-qnadetail__title align-center-col">
              <span>{detailData.title}</span>
            </div>
            <div className="kohub-qnadetail__user-info align-center-col">
              <span>작성자 : {detailData.userName}</span>
              <br></br>
              <span>{detailData.createDate}</span>
            </div>
          </div>
          <div className="kohub-qnadetail__hr">
            <hr></hr>
          </div>
          <div
            className="kohub-qnadetail__article"
            dangerouslySetInnerHTML={{ __html: detailData.content }}
          ></div>
          <div className="kohub-qnadetail__hr">
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
}

export default QnaDetail;
