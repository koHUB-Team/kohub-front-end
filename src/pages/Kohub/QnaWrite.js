import React, { Component } from "react";
import "./QnaWrite.scss";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  FormInput,
  Editor,
  DropBox,
  Header,
  Footer,
} from "../../components";
import { List, Record } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";

const DetailData = Record({
  id: "",
  title: "",
  content: "",
  category: "",
});

class QnaWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: DetailData({}),
    };
    this.title = "";
    this.content = null;
    this.selectedDropMenu = null;
    this.dropMenuList = List(["신고", "문의사항", "건의사항"]);
  }

  componentDidMount() {
    let { mode, selectedDetailId } = this.props;
    if (mode === "UPDATE") {
      let params = {
        qnaId: selectedDetailId,
      };
      this.requestQnaApi(params);
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
      this.requestPostQnaApi();
    } else if (mode === "UPDATE") {
      this.requestPutQnaApi();
    }
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
        let newData = DetailData({
          id: qna.id,
          title: qna.title,
          category: qna.category,
          content: qna.content,
        });

        this.setState({
          detailData: newData,
        });
      })
      .catch((err) => {
        new Error("Qna Error");
      });
  }
  requestPostQnaApi() {
    let data = {
      title: this.title,
      content: this.content,
      category: this.selectedDropMenu,
      userId: 104,
    };

    let url = process.env.REACT_APP_KOHUB_API_URL_POST_QNA;
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

  requestPutQnaApi() {
    let data = {
      title: this.title,
      content: this.content,
      category: this.selectedDropMenu,
    };

    let pathVariable = {
      qnaId: this.state.detailData.id,
    };
    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_QNAS;
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

  onDropMenuClickCallback(selectedDropMenu) {
    this.selectedDropMenu = selectedDropMenu;
  }
  render() {
    let { detailData } = this.state;
    return (
      <div>
        <Header></Header>
        <form
          className="kohub-qnawrite container"
          onSubmit={this.onSubmitListener.bind(this)}
        >
          <div className="kohub-qnawrite__content content-area">
            <div className="kohub-qnawrite__header">
              <h2>Q&amp;A</h2>
            </div>
            <div className="kohub-qnawrite__hr">
              <hr></hr>
            </div>
            <div className="kohub-qnawrite__input">
              <div className="kohub-qnawrite__drop-box">
                <DropBox
                  onMenuClick={this.onDropMenuClickCallback.bind(this)}
                  menus={this.dropMenuList}
                ></DropBox>
              </div>
              <div className="kohub-qnawrite__title">
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
            <div className="kohub-qnawrite__hr">
              <hr></hr>
            </div>
            <div className="kohub-qnawrite__text-editor">
              <Editor
                onContentChange={this.onContentChangeCallback.bind(this)}
                value={detailData.content}
              ></Editor>
            </div>
            <div className="kohub-qnawrite__hr">
              <hr></hr>
            </div>
            <div className="kohub-qnawrite___button">
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

export default QnaWrite;
