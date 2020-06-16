import React, { Component } from "react";
import "./FreeDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Record } from "immutable";
import { FormInput, Button } from "../../components";
import { ApiUtil } from "../../common/kohubUtil";

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
    };
    this.isReply = false;
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
        let freeBoard = json;
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
    let { detailData } = this.state;
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
            <span>댓글 0</span>
            <div className="kohub-freedetail__reply-input">
              <FormInput placeholder={"이곳에 댓글을 입력하세요."} />
            </div>
            <div className="kohub-freedetail__reply-register-btn">
              <Button value={"등록"} type={"submit"}></Button>
            </div>
          </div>
          <div className="kohub-freedetail__replies">
            <div className="kohub-freedetail__reply">
              <div className="kohub-freedetail__reply-header">
                <div className="kohub-freedetail__reply-header-userinfo">
                  <span id="reply-date">2020.00.00</span>
                  <br />
                  <span id="reply-username">UserName</span>
                </div>
                <div className="kohub-freedetail__reply__manage">
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
              <div className="kohub-freedetail__reply-article">
                <p>
                  무한한 가치를 가진 것이다 사람은 크고 작고 간에 이상이
                  있음으로써 용감하고 굳세게 살 수 있는 것이다 석가는 무엇을
                  위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서
                  방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 무한한
                  가치를 가진 것이다 사람은 크고 작고 간에 이상이 있음으로써
                  용감하고 굳세게 살 수 있는 것이다 석가는 무엇을 위하여
                  설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서
                  방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가?
                </p>
              </div>
            </div>

            <div className="kohub-freedetail__reply">
              <div className="kohub-freedetail__reply-header">
                <div className="kohub-freedetail__reply-header-userinfo">
                  <span id="reply-date">2020.00.00</span>
                  <br />
                  <span id="reply-username">UserName</span>
                </div>
                <div className="kohub-freedetail__reply__manage">
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
              <div className="kohub-freedetail__reply-article">
                <p>
                  무한한 가치를 가진 것이다 사람은 크고 작고 간에 이상이
                  있음으로써 용감하고 굳세게 살 수 있는 것이다 석가는 무엇을
                  위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서
                  방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 무한한
                  가치를 가진 것이다 사람은 크고 작고 간에 이상이 있음으로써
                  용감하고 굳세게 살 수 있는 것이다 석가는 무엇을 위하여
                  설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서
                  방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FreeDetail;
