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
  category: "",
});
const AnswerData = Record({
  id: null,
  userName: "",
  comment: "",
  createDate: "",
});

class QnaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData({}),
      answerData: AnswerData({}),
    };
    this.isAnswer = false;
  }

  componentDidMount() {
    let { selectedDetailId } = this.props;
    let params = {
      qnaId: selectedDetailId,
    };
    this.requestQnaApi(params);
    // if (this.isAnswer === false) {
    //   let answerNode = document.querySelector(".kohub-qnadetail__answer");
    //   answerNode.classList.add("hide");
    // } else if (this.isAnswer === true) {
    //   let answerNode = document.querySelector(".kohub-qnadetail__answer");
    //   answerNode.classList.remove("hide");
    // }
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
        let qna = json.qna;
        if (json.qnaComment !== null) {
          let answerNode = document.querySelector(".kohub-qnadetail__answer");
          answerNode.classList.remove("hide");
          let qnaComment = json.qnaComment;
          let newData = AnswerData({
            id: qnaComment.id,
            userName: qnaComment.userName,
            comment: qnaComment.comment,
            createDate: qnaComment.createDate,
          });
          this.setState({
            answerData: newData,
          });
        }

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
      category: qna.category,
    });

    this.setState({
      detailData: newData,
    });
  }
  onDeleteApiHandler() {
    let pathVariable = {
      qnaId: this.state.detailData.id,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_POST_QNAS;
    url = ApiUtil.bindPathVariable(url, pathVariable);

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
        new Error("Qna Error");
      });
  }
  onDeleteBtnClickCallback() {
    let { onDeleteBtnClick } = this.props;
    if (onDeleteBtnClick !== undefined) {
      onDeleteBtnClick();
    }
  }
  onUpdateBtnClickCallback() {
    let { onUpdateBtnClick } = this.props;
    if (onUpdateBtnClick !== undefined) {
      onUpdateBtnClick();
    }
  }

  render() {
    let { detailData, answerData } = this.state;
    return (
      <div className="kohub-qnadetail container">
        <div className="content-area kohub-qnadetail__content">
          <div className="kohub-qnadetail__header">
            <h2>Q&amp;A</h2>
            <div className="kohub-qnadetail__manage">
              <span onClick={this.onUpdateBtnClickCallback.bind(this)}>
                <FontAwesomeIcon icon={faEdit} flip="horizontal" />
                {""}수정
              </span>
              |
              <span onClick={this.onDeleteApiHandler.bind(this)}>
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
              <span>
                [{detailData.category}] {detailData.title}
              </span>
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
          <div className="kohub-qnadetail__answer hide">
            <div className="kohub-qnadetail__answer-header-area">
              <div className="kohub-qnadetail__answer-header align-center-col">
                <h3>답변</h3>
              </div>
              <div className="kohub-qnadetail__answer-user-info align-center-col">
                <span>작성자 : {answerData.userName}</span>
                <br></br>
                <span>{answerData.createDate}</span>
              </div>
            </div>
            <div
              className="kohub-qnadetail__answer-article"
              dangerouslySetInnerHTML={{ __html: answerData.comment }}
            ></div>
            <div className="kohub-qnadetail__hr">
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QnaDetail;
