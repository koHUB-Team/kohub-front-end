import React, { Component } from "react";
import "./FreeDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Record, List } from "immutable";
import { FormInput, Button, Reply, Header, Footer } from "../../components";
import { ApiUtil } from "../../common/kohubUtil";
import Moment from "moment";
import { Link } from "react-router-dom";
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
    this.count = 0;
  }

  componentDidMount() {
    let { match } = this.props;
    let { id } = match.params;
    let params = {
      freeId: id,
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
        history.back();
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
        document.getElementById("replyArea").value = "";
      })
      .catch((err) => {
        alert("댓글을 등록하는데 문제가 발생했습니다.");
      });
  }

  onReplyChangeListener(e) {
    this.reply = e.target.value;
    document.getElementById("count").innerHTML = this.reply.length;
  }

  onReplyRegisterBtnClick() {
    if (this.reply === null) {
      alert("댓글을 입력하여 주세요.");
      return;
    }
    this.requestPostReplyApi();
  }
  onUpdateBtnClickCallback(id) {
    let { onUpdateBtnClick } = this.props;
    if (onUpdateBtnClick !== undefined) {
      onUpdateBtnClick(id);
    }
  }
  onRegisterBtnClick(id, reply) {
    let updateNode = event.target.parentNode.parentNode;
    let replyNode = updateNode.previousElementSibling;
    let commentNode = replyNode.lastElementChild.firstElementChild;

    let pathVariable = {
      commentId: id,
    };
    let updateUrl = process.env.REACT_APP_KOHUB_API_URL_PUT_FREE_COMMENT;

    updateUrl = ApiUtil.bindPathVariable(updateUrl, pathVariable);
    console.log(updateUrl);
    let data = {
      comment: reply,
    };
    commentNode.innerHTML = reply;
    console.log(data);
    fetch(updateUrl, {
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
        alert("댓글이 수정되었습니다.");
      })
      .then(() => {
        replyNode.classList.remove("hide");
        updateNode.classList.add("hide");
      })
      .catch((err) => {
        alert("댓글을 수정하는데 문제가 발생했습니다.");
      });
  }

  render() {
    let { match } = this.props;
    let { id } = match.params;
    let { detailData, replyDatas, totalCommentCount } = this.state;
    let deleteUrl = process.env.REACT_APP_KOHUB_API_URL_DELETE_FREE_COMMENT;
    //let updateUrl = process.env.REACT_APP_KOHUB_API_URL_PUT_FREE_COMMENT;
    return (
      <div>
        <Header />
        <div className="kohub-freedetail container">
          <div className="content-area kohub-freedetail__content">
            <div className="kohub-freedetail__header">
              <h2>자유게시판</h2>
              <div className="kohub-freedetail__manage">
                <Link
                  to={"/free/write"}
                  onClick={this.onUpdateBtnClickCallback.bind(this, id)}
                >
                  <span>
                    <FontAwesomeIcon icon={faEdit} flip="horizontal" />
                    {""}수정
                  </span>
                </Link>
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
                <div className="kohub-freedetail__reply-content">
                  <textarea
                    id="replyArea"
                    placeholder="이곳에 댓글을 입력하세요."
                    maxLength="300"
                    onChange={this.onReplyChangeListener.bind(this)}
                  ></textarea>
                  <div className="kohub-freedetail__reply-text-limit">
                    <p>
                      <span id="count">0</span> / 300
                    </p>
                  </div>
                </div>
                <button onClick={this.onReplyRegisterBtnClick.bind(this)}>
                  등록
                </button>
              </div>
              {/* <div className="kohub-freedetail__reply-register-btn">
                <Button
                  value={"등록"}
                  type={"submit"}
                  onClick={this.onReplyRegisterBtnClick.bind(this)}
                ></Button>
              </div> */}
            </div>
            <Reply
              datas={replyDatas}
              deleteUrl={deleteUrl}
              onRegisterBtnClick={this.onRegisterBtnClick.bind(this)}
              //updateUrl={updateUrl}
            ></Reply>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default FreeDetail;
