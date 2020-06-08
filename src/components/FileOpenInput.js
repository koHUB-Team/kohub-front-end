import React, { Component } from "react";
import "./FileOpenInput.scss";
import { List } from "immutable";

//****FileOpenInput 컴포넌트****//
//props
//option(필수) : 업로드할 파일 미리보기 옵션 / type : String ex) fileName, thumbnail .....
//accept : 파일 확장자 허용 옵션 / type : String ex) "image/jpg, image/png"
//multiple : 파일 다중 업로드 옵션 / type : boolean

class FileOpenInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfFiles: 0,
      files: [],
      thumbImageUrls: null,
    };
    this.OPTION = {
      FILE_NAME: "fileName",
      THUMBNAIL: "thumbnail",
    };
    this.FILE_TYPE_PATTERN = {
      IMAGE: /^(?:image\/)((?:png)|(?:jpg))/,
    };
    this.checkProps();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.urls !== state.thumbImageUrls) {
      return {
        numOfFiles: 1,
        thumbImageUrls: props.urls,
      };
    }
    return null; //null은 state 갱신 x
  }

  componentDidUpdate() {
    let { numOfFiles } = this.state;

    if (numOfFiles > 0) {
      this.showLoadFilePreview();
    }
  }

  checkProps() {
    let { option } = this.props;
    if (option === undefined) {
      new Error(" 'option' props는 반드시 필요합니다.");
    }
  }

  getAccept() {
    let { accept } = this.props;
    if (accept !== undefined) {
      return accept;
    }

    return "";
  }

  getMultiple() {
    let { multiple } = this.props;
    if (multiple === true) {
      return multiple;
    }

    return false;
  }

  getLoadedFilePreviewList() {
    let { option } = this.props;
    let loadedFilePreviewList = null;

    switch (option) {
      case this.OPTION.THUMBNAIL:
        let thumbImgList = this.getThumbImgList();
        loadedFilePreviewList = (
          <ul
            className="kohub-file__img-container"
            onClick={this.onDeleteBtnClickListener.bind(this)}
          >
            {thumbImgList}
          </ul>
        );
        return loadedFilePreviewList;
      case this.OPTION.FILE_NAME:
        //구현 필요.
        break;
      default:
        return loadedFilePreviewList;
    }
  }

  getThumbImgList() {
    let { numOfFiles, thumbImageUrls } = this.state;
    let thumbImgList = [];

    for (let i = 0; i < numOfFiles; i++) {
      thumbImgList = thumbImgList.concat([
        <li
          key={i}
          data-id={i}
          className={`kohub-file__thumb-img ${
            thumbImageUrls !== null ? "" : "hide"
          }`}
        >
          <img
            src={thumbImageUrls !== null ? thumbImageUrls.get(i) : ""}
            alt="img"
            onLoad={(e) => {
              let url = e.target.src;
              URL.revokeObjectURL(url);
            }}
          ></img>
          <button className="kohub-file__thumb-img__btn--delete">x</button>
        </li>,
      ]);
    }

    return thumbImgList;
  }

  onFileChangeListener(e) {
    let inputNode = e.target;
    let loadedFiles = inputNode.files;

    this.validFileType(loadedFiles);

    this.setState({
      numOfFiles: loadedFiles.length,
      files: loadedFiles,
    });

    let { onFileChange } = this.props;
    if (onFileChange !== undefined) {
      onFileChange(loadedFiles);
    }
  }

  onDeleteBtnClickListener(e) {
    e.preventDefault();

    let isEventNode = false;
    let btnNode;

    switch (e.target.tagName.toLowerCase()) {
      case "button":
        isEventNode = true;
        btnNode = e.target;
        break;
      default:
        break;
    }

    if (isEventNode) {
      let liNode = btnNode.parentElement;
      this.hideThumbImgContainer(liNode);

      let fileId = liNode.dataset.id;
      let ulNode = liNode.parentElement;
      let inputNode = ulNode.previousElementSibling.firstElementChild;

      //파일을 여러개 올리고 일부만 삭제하는 경우는 어떻게 할지 고려필요.
      inputNode.value = "";
    }
  }

  validFileType(files) {
    let { option } = this.props;

    switch (option) {
      case this.OPTION.THUMBNAIL:
        if (!this.validImageType(files)) {
          alert("이미지 파일은 png, jpg파일만 등록가능합니다.");
          return;
        }
        break;
      case this.OPTION.FILE_NAME:
        //구현 필요
        break;
      default:
        break;
    }
  }

  validImageType(imgs) {
    let isValidType = true;

    Object.values(imgs).forEach((img) => {
      if (!this.FILE_TYPE_PATTERN.IMAGE.test(img.type)) {
        isValidType = false;
      }
    });

    return isValidType;
  }

  showLoadFilePreview() {
    let { files } = this.state;
    let { option } = this.props;

    switch (option) {
      case this.OPTION.THUMBNAIL:
        let thumbImgContainers = document.querySelectorAll(
          ".kohub-file__thumb-img"
        );

        Object.values(files).forEach((img, idx) => {
          let thumbImgContainer = thumbImgContainers[idx];
          let thumbImgNode = thumbImgContainer.firstChild;

          this.showThumbImg(thumbImgNode, img);
          this.showThumbImgContainer(thumbImgContainer);
        });
        break;
      case this.OPTION.FILE_NAME:
        //구현필요
        break;
      default:
        break;
    }
  }

  showThumbImg(imgNode, img) {
    imgNode.src = window.URL.createObjectURL(img);
    imgNode.onload = (e) => {
      window.URL.revokeObjectURL(e.target.src);
    };
  }

  showThumbImgContainer(imgContainer) {
    imgContainer.classList.remove("hide");
  }

  hideThumbImgContainer(imgContainer) {
    imgContainer.classList.add("hide");
  }

  render() {
    let accept = this.getAccept();
    let multiple = this.getMultiple();
    let loadedFilePreviewList = this.getLoadedFilePreviewList();

    return (
      <div className="kohub-file-container">
        <label className="kohub-file__open" value="파일">
          파일 선택
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={this.onFileChangeListener.bind(this)}
          />
        </label>
        {loadedFilePreviewList}
      </div>
    );
  }
}

export default FileOpenInput;
