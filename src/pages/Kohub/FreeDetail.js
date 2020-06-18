import React, { Component } from "react";
import "./FreeDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Record, List } from "immutable";
import { FormInput, Button, Reply } from "../../components";
import { ApiUtil } from "../../common/kohubUtil";
import Moment from "moment";
const DetailData = Record({
  id: null,
  title: "",
  userName: "",
  createDate: "",
  content: "",
});
const ReplyData = Record({
  id: null,
  userName: "",
  comment: "",
  createDate: "",
});

class FreeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData({}),
      replyDatas: List([]),
      totalCommentCount: 0,
    };
    this.reply = null;
  }

  componentDidMount() {
    let { selectedDetailId } = this.props;
    let params = {
      freeId: selectedDetailId,
    };
    this.requestFreeApi(params);
  }

  requestFreeApi(params = null) {
    if (params === null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_FREE;
    let queryStr = ApiUtil.parseObjToQueryStr(params);
    url += queryStr;

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let freeBoard = json.freeBoard;
        let replyDatas = json.comments;
        let totalCommentCount = json.totalCommentCount;
        if (replyDatas !== null) {
          this.replyApiHandler(replyDatas, totalCommentCount);
        }
        this.freeApiHandler(freeBoard);
      })
      .catch((err) => {
        new Error("FreeDetail Error");
      });
  }

  freeApiHandler(freeBoard) {
    let newData = DetailData({
      id: freeBoard.id,
      title: freeBoard.title,
      userName: freeBoard.userName,
      createDate: freeBoard.createDate,
      content: freeBoard.content,
    });
    this.setState({
      detailData: newData,
    });
  }

  replyApiHandler(replyDatas, totalCommentCount) {
    let newDatas = List([]);
    Object.values(replyDatas).forEach((replyData, idx) => {
      newDatas = newDatas.set(
        idx,
        ReplyData({
          id: replyData.id,
          userName: replyData.userName,
          comment: replyData.comment,
          createDate: Moment(replyData.createDate).format("YYYY.MM.DD"),
        })
      );
    });
    this.setState({
      replyDatas: newDatas,
      totalCommentCount: totalCommentCount,
    });
  }
  onDeleteApiHandler() {
    let pathVariable = {
      freeId: this.state.detailData.id,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_DELETE_FREE;
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

  requestPostReplyApi() {
    let data = {
      freeBoardId: this.state.detailData.id,
      userId: 104,
      comment: this.reply,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_POST_FREE_COMMENT;
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
      .then(() => {
        alert("댓글이 입력되었습니다.");
        let params = {
          freeId: this.state.detailData.id,
        };
        this.requestFreeApi(params);
      })
      .catch((err) => {
        alert("댓글을 등록하는데 문제가 발생했습니다.");
      });
  }

  onReplyChangeListener(newReply) {
    this.reply = newReply;
  }

  onReplyRegisterBtnClick() {
    if (this.reply === null) {
      alert("댓글을 입력하여 주세요.");
      return;
    }
    this.requestPostReplyApi();
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
    let { detailData, replyDatas, totalCommentCount } = this.state;
    let deleteUrl = process.env.REACT_APP_KOHUB_API_URL_DELETE_FREE_COMMENT;
    let updateUrl = process.env.REACT_APP_KOHUB_API_URL_PUT_FREE_COMMENT;
    return (
      <div className="kohub-freedetail container">
        <div className="content-area kohub-freedetail__content">
          <div className="kohub-freedetail__header">
            <h2>자유게시판</h2>
            <div className="kohub-freedetail__manage">
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
          <div className="kohub-freedetail__hr">
            <hr></hr>
          </div>
          <div className="kohub-freedetail__title-area">
            <div className="kohub-freedetail__title align-center-col">
              <span>{detailData.title}</span>
            </div>
            <div className="kohub-freedetail__user-info align-center-col">
              <span>작성자 : {detailData.userName}</span>
              <br></br>
              <span>{detailData.createDate}</span>
            </div>
          </div>
          <div className="kohub-freedetail__hr">
            <hr></hr>
          </div>
          <div
            className="kohub-freedetail__article"
            dangerouslySetInnerHTML={{ __html: detailData.content }}
          ></div>
          <div className="kohub-freedetail__hr">
            <hr></hr>
          </div>
          <div className="kohub-freedetail__reply-input-area">
            <span>댓글 {totalCommentCount}</span>
            <div className="kohub-freedetail__reply-input">
              <FormInput
                placeholder={"이곳에 댓글을 입력하세요."}
                onChange={this.onReplyChangeListener.bind(this)}
              />
            </div>
            <div className="kohub-freedetail__reply-register-btn">
              <Button
                value={"등록"}
                type={"submit"}
                onClick={this.onReplyRegisterBtnClick.bind(this)}
              ></Button>
            </div>
          </div>
          <Reply
            datas={replyDatas}
            deleteUrl={deleteUrl}
            updateUrl={updateUrl}
          ></Reply>
        </div>
      </div>
    );
  }
}
export default FreeDetail;
