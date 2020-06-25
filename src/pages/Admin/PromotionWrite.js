import React, { Component } from "react";
import { Button, FileOpenInput, FormInput } from "../../components";
import "./PromotionWrite.scss";
import ReactQuill from "react-quill";
import Moment from "moment";
import { ApiUtil } from "../../common/kohubUtil";
import { Record, List } from "immutable";
import { AdminNavContainer } from "../../containers";
import queryString from "query-string";

const PromotionData = Record({
  id: 0,
  email: "",
  title: "",
  startDate: "",
  endDate: "",
});

class PromotionWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: PromotionData(),
      thumbImageUrls: null,
      isUpdateForm: false,
    };
    this._quillModules = {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
      },
    };
    this._quillFormats = [
      "header",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "link",
      "image",
    ];
    this.content = "";
    this.promotionImageFile = null;
    this.titleValid = false;
    this.emailValid = false;
    this.startDateValid = false;
    this.endDateValid = false;
    this.promotionImageFileValid = false;
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
        promotionId: id,
      };
      this.requestGetPomorionApi(pathVariables);
    }
  }

  requestGetPomorionApi(pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let promotionData = json.promotions[0];
        this.promotionGetApiHandler(promotionData);

        this.titleValid = true;
        this.emailValid = true;
        this.startDateValid = true;
        this.endDateValid = true;

        let promotionImageDatas = json.promotionImages;
        promotionImageDatas.filter((promotionImage) => {
          if (promotionImage.type === "ma") {
            return promotionImage;
          }
        });

        let pathVariables = {
          promotionImageId: promotionImageDatas[0].id,
        };

        this.requestDownloadPromotionImageApi(pathVariables);
      })
      .catch((err) => {
        new Error("Promotion Api Error!");
      });
  }

  requestDownloadPromotionImageApi(pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_DOWNLOAD_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.blob();
      })
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        this.downloadImageHandler(objectURL);
      })
      .catch((err) => {
        new Error("Promotion Image Api Error!");
      });
  }

  downloadImageHandler(newThumbImageUrl) {
    this.setState({
      thumbImageUrls: List([newThumbImageUrl]),
    });
    this.promotionImageFileValid = true;
  }

  promotionGetApiHandler(promotionData) {
    let newData = PromotionData({
      id: promotionData.id,
      email: promotionData.email,
      title: promotionData.title,
      startDate: new Date(promotionData.startDate),
      endDate: new Date(promotionData.endDate),
    });

    this.content = promotionData.content;
    this.setState({
      data: newData,
    });
  }

  requestPutPromtionApi(formData, pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_ADMIN_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {},
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("홍보 게시물이 수정되었습니다.");
        this.goBackPage();
      })
      .catch((err) => {
        alert("홍보 게시물을 수정하는데 문제가 발생했습니다.");
      });
  }

  onSubmitListener(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.isFormDataValid()) {
      alert(
        "프로모션 추가 양식을 모두 입력해주세요. 이미지는 반드시 등록해야합니다."
      );
      return;
    }

    let formNode = e.target;
    let formData = new FormData();
    formData.append("title", formNode.title.value);
    formData.append("email", formNode.email.value);

    let { data } = this.state;
    formData.append("startDate", Moment(data.startDate).format("YYYY.MM.DD"));
    formData.append("endDate", Moment(data.endDate).format("YYYY.MM.DD"));
    formData.append("content", this.content);

    if (this.promotionImageFile !== null) {
      formData.append("promotionImage", this.promotionImageFile[0]);
    }

    let { isUpdateForm } = this.state;
    if (isUpdateForm) {
      let { id } = this.state.data;
      let pathVariables = {
        promotionId: id,
      };

      this.requestPutPromtionApi(formData, pathVariables);
    } else {
      this.requestPostPromtionApi(formData);
    }
  }

  requestPostPromtionApi(formData) {
    let url = process.env.REACT_APP_KOHUB_API_URL_POST_PROMOTION;

    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {},
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("홍보 게시물이 등록되었습니다.");
        this.goBackPage();
      })
      .catch((err) => {
        alert("홍보 게시물을 등록하는데 문제가 발생했습니다.");
      });
  }

  onFileChangeCallback(loadedFiles) {
    this.promotionImageFile = loadedFiles;
  }

  onContentChangeListener(content, delta, source, editor) {
    this.content = content;
    this.contentValid = true;
  }

  onTitleBlur(isValid) {
    this.titleValid = isValid;
  }

  onEmailBlur(isValid) {
    this.emailValid = isValid;
  }

  onCancelBtnClickCallback() {
    this.goBackPage();
  }

  //현재날짜보다 이전값 받으면 안됨 -- 유효성검사
  onStartDateChangeCallback(newStartDate, isValid) {
    let { data } = this.state;

    if (data.endDate !== "") {
      if (!this.validPromotionDate(newStartDate, data.endDate)) {
        alert("홍보시작 날짜는 홍보종료 이전날짜여야 합니다.");
        this.startDateValid = false;
        return false;
      }
    }

    let newData = this.state.data.set("startDate", new Date(newStartDate));
    this.setState({
      data: newData,
    });

    this.startDate = this.startDateValid = isValid;

    return true;
  }

  onEndDateChangeCallback(newEndDate, isValid) {
    let { data } = this.state;

    if (data.startDate !== "") {
      if (!this.validPromotionDate(data.startDate, newEndDate)) {
        alert("홍보종료 날짜는 홍보시작 이후날짜여야 합니다.");
        this.endDateValid = false;
        return false;
      }
    }

    let newData = this.state.data.set("endDate", new Date(newEndDate));
    this.setState({
      data: newData,
    });

    this.endDateValid = isValid;

    return true;
  }

  validPromotionDate(startDate, endDate) {
    return Moment(startDate).isBefore(endDate);
  }

  validPromotionImageFile() {
    if (this.promotionImageFile.length > 0) {
      this.promotionImageFileValid = true;
    } else {
      this.promotionImageFileValid = false;
    }
  }

  isFormDataValid() {
    if (this.promotionImageFile !== null) {
      this.validPromotionImageFile();
    }

    return (
      this.titleValid &&
      this.emailValid &&
      this.startDateValid &&
      this.endDateValid &&
      this.contentValid &&
      this.promotionImageFileValid
    );
  }

  goBackPage() {
    let { history } = this.props;
    history.goBack();
  }

  render() {
    let { title, email, startDate, endDate } = this.state.data;
    let { thumbImageUrls, isUpdateForm } = this.state;

    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <form
              className="kohub-admin-promotion-write"
              onSubmit={this.onSubmitListener.bind(this)}
              autoComplete="off"
            >
              <div className="kohub-admin-promotion-write__user-info">
                <FormInput
                  name="title"
                  type="text"
                  placeholder="제목을 입력하세요."
                  validOption={"title"}
                  onBlur={this.onTitleBlur.bind(this)}
                  value={title}
                ></FormInput>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요."
                  validOption={"email"}
                  onBlur={this.onEmailBlur.bind(this)}
                  value={email}
                ></FormInput>
              </div>
              <div className="kohub-admin-promotion-write__promo-info">
                <FormInput
                  name="startDate"
                  type="date"
                  placeholder="시작일"
                  validOption={"date"}
                  onChange={this.onStartDateChangeCallback.bind(this)}
                  selected={isUpdateForm === true ? startDate : null}
                ></FormInput>
                <FormInput
                  name="endDate"
                  type="date"
                  placeholder="종료일"
                  validOption={"date"}
                  onChange={this.onEndDateChangeCallback.bind(this)}
                  selected={isUpdateForm === true ? endDate : null}
                ></FormInput>
              </div>
              <div className="kohub-admin-promotion-write__text-editor">
                <ReactQuill
                  theme="snow"
                  modules={this._quillModules}
                  formats={this._quillFormats}
                  toolbar={false}
                  onChange={this.onContentChangeListener.bind(this)}
                  value={this.content}
                >
                  <div className="kohub-admin-promotion-write__edited-area"></div>
                </ReactQuill>
              </div>
              <div className="kohub-admin-promotion-write__file">
                <FileOpenInput
                  name="promotionImage"
                  option={"thumbnail"}
                  accept={"image/jpg, image/png"}
                  multiple={false}
                  onFileChange={this.onFileChangeCallback.bind(this)}
                  urls={thumbImageUrls}
                ></FileOpenInput>
              </div>
              <div className="kohub-admin-promotion-write__btn">
                <Button
                  type={"submit"}
                  value={isUpdateForm === false ? "추가" : "수정"}
                ></Button>
                <Button
                  value={"취소"}
                  type={"button"}
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

export default PromotionWrite;
