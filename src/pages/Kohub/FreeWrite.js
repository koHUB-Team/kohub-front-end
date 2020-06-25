import React, { Component } from "react";
import "./FreeWrite.scss";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  FormInput,
  Editor,
  DropBox,
  Header,
  Footer,
} from "../../components";
import { Record } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";

const DetailData = Record({
  id: "",
  title: "",
  content: "",
});

class FreeWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData({}),
    };
    this.title = "";
    this.content = null;
  }

  componentDidMount() {
    let { mode, selectedDetailId } = this.props;
    if (mode === "UPDATE") {
      let params = {
        freeId: selectedDetailId,
      };
      this.requestFreeApi(params);
    }
  }
  onTitleChangeListener(newTitle) {
    this.title = newTitle;
  }

  onContentChangeCallback(content) {
    this.content = content;
  }
  onSubmitListener(e) {
    let { mode } = this.props;
    e.preventDefault();
    e.stopPropagation();

    if (this.title === "" || this.content === null) {
      alert("제목, 내용 모두 입력하여 주세요.");
      return;
    }
    if (mode === "CREATE") {
      this.requestPostFreeApi();
    } else if (mode === "UPDATE") {
      this.requestPutFreeApi();
    }
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
        let newData = DetailData({
          id: freeBoard.id,
          title: freeBoard.title,
          content: freeBoard.content,
        });

        this.setState({
          detailData: newData,
        });
      })
      .catch((err) => {
        new Error("Qna Error");
      });
  }
  requestPostFreeApi() {
    let data = {
      title: this.title,
      content: this.content,
      userId: 104,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_POST_FREE;
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
      .then((result) => {
        return result.json();
      })
      .then(() => {
        alert("게시물이 등록되었습니다.");
      })
      .then(() => {
        history.back();
      })
      .catch((err) => {
        alert("게시물을 등록하는데 문제가 발생했습니다.");
      });
  }

  requestPutFreeApi() {
    let data = {
      title: this.title,
      content: this.content,
    };

    let pathVariable = {
      freeId: this.state.detailData.id,
    };
    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_FREE;
    url = ApiUtil.bindPathVariable(url, pathVariable);

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
        alert("게시물이 수정되었습니다.");
      })
      .then(() => {
        this.onRegisterBtnClickCallback();
        history.back();
      })
      .catch((err) => {
        alert("게시물을 수정하는데 문제가 발생했습니다.");
      });
  }
  onRegisterBtnClickCallback() {
    let { onRegisterBtnClick } = this.props;
    if (onRegisterBtnClick !== undefined) {
      onRegisterBtnClick();
    }
  }
  onCancelBtnClickCallback() {
    history.back();
  }

  render() {
    let { detailData } = this.state;

    return (
      <div>
        <Header></Header>
        <form
          className="kohub-freewrite container"
          onSubmit={this.onSubmitListener.bind(this)}
        >
          <div className="kohub-freewrite__content content-area">
            <div className="kohub-freewrite__header">
              <h2>자유게시판</h2>
            </div>
            <div className="kohub-freewrite__hr">
              <hr></hr>
            </div>
            <div className="kohub-freewrite__input">
              <div className="kohub-freewrite__title">
                <FormInput
                  value={detailData.title}
                  type="text"
                  name="title"
                  placeholder="제목을 입력하세요."
                  validOption={"title"}
                  onChange={this.onTitleChangeListener.bind(this)}
                ></FormInput>
              </div>
            </div>
            <div className="kohub-freewrite__hr">
              <hr></hr>
            </div>
            <div className="kohub-freewrite__text-editor">
              <Editor
                onContentChange={this.onContentChangeCallback.bind(this)}
                value={detailData.content}
              ></Editor>
            </div>
            <div className="kohub-freewrite__hr">
              <hr></hr>
            </div>
            <div className="kohub-freewrite___button">
              <Button
                value={"등록"}
                type={"submit"}
                btnType={"register"}
              ></Button>
              <Button
                value={"취소"}
                btnType={"cancel"}
                onClick={this.onCancelBtnClickCallback.bind(this)}
              ></Button>
            </div>
          </div>
        </form>
        <Footer></Footer>
      </div>
    );
  }
}

export default FreeWrite;
