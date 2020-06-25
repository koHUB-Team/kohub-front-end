import React, { Component } from "react";
import "./FaqWrite.scss";
import queryString from "query-string";
import { AdminNavContainer } from "../../containers";
import { FormInput, Button, Editor } from "../../components";
import { ApiUtil } from "../../common/kohubUtil";
import { Record } from "immutable";

const FaqData = Record({
  id: 0,
  title: "",
  answer: "",
});

class FaqWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: FaqData(),
      isUpdateForm: false,
    };
    this.content = "";
    this.titleValid = false;
    this.answerValid = false;
  }

  componentDidMount() {
    let { location } = this.props;
    let query = queryString.parse(location.search);
    let id = query.id;

    if (id !== undefined) {
      this.setState({
        isUpdateForm: true,
      });

      let pathVariables = {
        faqId: id,
      };
      this.requestGetFaqApi(pathVariables);
    }
  }

  requestGetFaqApi(pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_FAQ;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        this.faqGetApiHandler(json);
      })
      .catch((err) => {
        new Error("Faq Api Error!");
      });
  }

  faqGetApiHandler(faqData) {
    let newData = FaqData({
      id: faqData.id,
      title: faqData.title,
      answer: faqData.answer,
    });

    this.content = faqData.answer;
    this.titleValid = true;
    this.answerValid = true;
    this.setState({
      data: newData,
    });
  }

  requestPostFaqApi(formData) {
    let url = process.env.REACT_APP_KOHUB_API_URL_POST_FAQ;
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("FAQ가 등록되었습니다.");
        this.goBackPage();
      })
      .catch((err) => {
        alert("FAQ를 등록하는데 문제가 발생했습니다.");
      });
  }

  requestPutFaqApi(formData, pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_FAQ;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("FAQ가 수정되었습니다.");
        this.goBackPage();
      })
      .catch((err) => {
        alert("FAQ를 수정하는데 문제가 발생했습니다.");
      });
  }

  onCancelBtnClickCallback() {
    this.goBackPage();
  }

  onSubmitListener(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.isFormDataValid()) {
      alert("FAQ 추가 양식을 모두 입력해주세요.");
      return;
    }

    let formNode = e.target;
    let formData = new FormData();
    formData.append("title", formNode.title.value);
    formData.append("answer", this.content);

    let { isUpdateForm } = this.state;
    if (isUpdateForm) {
      let { id } = this.state.data;
      let pathVariables = {
        faqId: id,
      };

      this.requestPutFaqApi(formData, pathVariables);
    } else {
      this.requestPostFaqApi(formData);
    }
  }

  isFormDataValid() {
    return this.titleValid && this.answerValid;
  }

  onTitleBlur(isValid) {
    this.titleValid = isValid;
  }

  goBackPage() {
    let { history } = this.props;
    history.goBack();
  }

  onContentChangeCallback(content, delta, source, editor) {
    this.content = content;
    this.answerValid = true;
  }

  render() {
    let { isUpdateForm } = this.state;
    let { title, answer } = this.state.data;

    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <form onSubmit={this.onSubmitListener.bind(this)}>
              <div className="kohub-admin-faq-write">
                <FormInput
                  name="title"
                  type="text"
                  placeholder="질문을 입력하세요."
                  validOption={"title"}
                  onBlur={this.onTitleBlur.bind(this)}
                  value={title}
                ></FormInput>
              </div>
              <div className="kohub-admin-faq-write__text-editor">
                <Editor
                  value={answer}
                  onContentChange={this.onContentChangeCallback.bind(this)}
                ></Editor>
              </div>
              <div className="kohub-admin-faq-write-btn-area">
                <Button
                  type={"submit"}
                  value={isUpdateForm === false ? "추가" : "수정"}
                ></Button>
                <Button
                  type={"button"}
                  value={"취소"}
                  onClick={this.onCancelBtnClickCallback.bind(this)}
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FaqWrite;
