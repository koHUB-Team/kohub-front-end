import React, { Component } from "react";
import "./FileOpenInput.scss";

//****FileOpenInput 컴포넌트****//
//props
//inputType : 오픈할 파일 종류 / type : String ex) Image, Excel .....
//accept : 파일 확장자 허용 옵션 / type : String ex) "image/jpg, image/png"

class FileOpenInput extends Component {
  getAccept() {
    let { accept } = this.props;
    if (accept !== undefined) {
      return accept;
    }

    return "";
  }

  render() {
    let accept = this.getAccept();

    return (
      <label className="kohub-file-open">
        <input type="file" accept={accept} />
        파일 선택
      </label>
    );
  }
}

export default FileOpenInput;
