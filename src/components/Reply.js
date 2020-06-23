import React, { Component } from "react";
import "./Reply.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ApiUtil } from "../common/kohubUtil";
import { FormInput, Button } from "../components";
class Reply extends Component {
  constructor(props) {
    super(props);
    this.reply = "";
  }

  onUpdateBtnClick() {
    let replyNode = event.target.parentNode.parentNode.parentNode;
    let updateNode = replyNode.nextElementSibling;
    replyNode.classList.add("hide");
    updateNode.classList.remove("hide");
  }

  onCancelBtnClick() {
    let updateNode = event.target.parentNode.parentNode;
    let replyNode = updateNode.previousElementSibling;
    replyNode.classList.remove("hide");
    updateNode.classList.add("hide");
  }

  onRegisterBtnClickListener(id) {
    let reply = this.reply;
    let { onRegisterBtnClick } = this.props;
    if (onRegisterBtnClick !== undefined) {
      onRegisterBtnClick(id, reply);
    }
  }
  onDeleteBtnClickListener(id) {
    let { onDeleteBtnClick } = this.props;
    if (onDeleteBtnClick !== undefined) {
      onDeleteBtnClick(id);
    }
  }
  // onDeleteApiHandler(id) {
  //   let parentNode = event.target.parentNode.parentNode.parentNode.parentNode;

  //   let pathVariable = {
  //     commentId: id,
  //   };
  //   let { deleteUrl } = this.props;
  //   deleteUrl = ApiUtil.bindPathVariable(deleteUrl, pathVariable);

  //   fetch(deleteUrl, {
  //     method: "DELETE",
  //   })
  //     .then((result) => {
  //       alert("댓글이 삭제되었습니다.");
  //       parentNode.remove();
  //     })
  //     .catch((err) => {
  //       new Error("Comment Error");
  //     });
  // }
  onReplyChangeListener(e) {
    this.reply = e.target.value;
  }
  getReplyList() {
    let { datas } = this.props;

    if (datas === undefined) {
      return [];
    }
    let dataList = datas.reduce((acc, data, idx) => {
      return acc.concat([
        <div data-id={data.id} key={idx} className="kohub-reply-area">
          <div className="kohub-reply">
            <div className="kohub-reply-header">
              <div className="kohub-reply-header-userinfo">
                <p id="reply-date">{data.createDate}</p>
                <p id="reply-username">{data.userName}</p>
              </div>
              <div className="kohub-reply__manage">
                <span onClick={this.onUpdateBtnClick.bind(this)}>
                  <FontAwesomeIcon icon={faEdit} flip="horizontal" />
                  {""}수정
                </span>
                |
                <span
                  onClick={this.onDeleteBtnClickListener.bind(this, data.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} flip="horizontal" />
                  {""}삭제
                </span>
              </div>
            </div>
            <div className="kohub-reply-article">
              <p>{data.comment}</p>
            </div>
          </div>
          <div className="kohub-reply-update hide">
            <div className="kohub-reply-update-input">
              <textarea onChange={this.onReplyChangeListener.bind(this)}>
                {data.comment}
              </textarea>
            </div>
            <div className="kohub-reply-update-btn">
              <Button
                value={"수정"}
                btnType={"register"}
                onClick={this.onRegisterBtnClickListener.bind(this, data.id)}
              ></Button>
              <Button
                value={"취소"}
                btnType={"cancel"}
                onClick={this.onCancelBtnClick.bind(this)}
              ></Button>
            </div>
          </div>
        </div>,
      ]);
    }, []);

    return dataList;
  }

  render() {
    let replyList = this.getReplyList();

    return <div className="kohub-replies">{replyList}</div>;
  }
}

export default Reply;
