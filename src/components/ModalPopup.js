import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./ModalPopup.scss";
import Button from "./Button";

//props
//title : 팝업 표시할 타이틀 텍스트
//content : 팝업에 표시할 텍스트
//imageUrl : 팝업에 띄울 이미지 src
//onClosePopup : 팝업 닫기 버튼 클릭시 실행할 콜백함수

class ModalPopup extends Component {
  closePopup() {
    let { onClosePopup } = this.props;
    if (onClosePopup !== undefined) {
      onClosePopup();
    }
  }

  getTitle() {
    let { title } = this.props;
    if (title !== undefined) {
      return title;
    }
    return "";
  }

  getImageUrl() {
    let { imageUrl } = this.props;
    if (imageUrl !== undefined) {
      return imageUrl;
    }
    return "";
  }

  getContent() {
    let { content } = this.props;
    if (content !== undefined) {
      return content;
    }
    return "";
  }

  getImage() {
    let { image } = this.props;
    if (image === false || image === undefined) {
      return "";
    }

    let imageUrl = this.getImageUrl();
    return (
      <div className="kohub-modal-img-container">
        <img
          src={imageUrl}
          alt="img"
          onLoad={(e) => {
            let url = e.target.src;
            URL.revokeObjectURL(url);
          }}
        ></img>
      </div>
    );
  }

  render() {
    let { isShow } = this.props;
    let title = this.getTitle();
    let content = this.getContent();
    let image = this.getImage();

    return (
      <div>
        <Modal show={isShow} onHide={this.closePopup.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {image}
            <div
              className="kohub-modal-content"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.closePopup.bind(this)}
              value={"닫기"}
              btnType={"close--admin"}
            ></Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalPopup;
