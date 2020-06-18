import React, { Component } from "react";
import "./Slider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
//props

//중복 코드 정리하기
//Immutable List 앞에 원소 추가하는 거 알아보기
//오토 슬라이드 구현하기
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.slideIndex = 0;
  }

  getTitle() {
    let { title } = this.props;
    if (title !== undefined) {
      return title;
    }

    return "";
  }

  getSrc() {
    let { src } = this.props;
    if (src !== undefined) {
      return src;
    }

    return [];
  }

  getImageList() {
    let src = this.getSrc();

    if (src.size < 1) {
      return [];
    }

    let imageList = [];
    let lastImg = src.get(src.size - 1);
    let firstImg = src.get(0);

    imageList = this.addImage(
      imageList,
      lastImg,
      {
        left: `${-235 - 10}px`,
      },
      0
    );

    imageList = src.reduce((acc, data, idx) => {
      let liStyle = {
        left: `${235 * idx + 10 * idx}px`,
      };

      return acc.concat([
        <li className="imgList" key={idx + 1} data-id={data.id} style={liStyle}>
          <img
            src={data.url}
            alt="promoImg"
            onLoad={(e) => {
              let url = e.target.src;
              URL.revokeObjectURL(url);
            }}
          ></img>
        </li>,
      ]);
    }, imageList);

    imageList = this.addImage(
      imageList,
      firstImg,
      {
        left: `${235 * (imageList.length - 1) + 10 * (imageList.length - 1)}px`,
      },
      imageList.length
    );

    return imageList;
  }

  addImage(imageList, img, style, key) {
    imageList = imageList.concat([
      <li className="imgList" key={key} data-id={img.id} style={style}>
        <img src={img.url} alt="image"></img>
      </li>,
    ]);

    return imageList;
  }

  onSlideBtnClickListener(e) {
    let isEventTatget = false;
    let btnNode;
    let svgNode;
    let pathNode;

    switch (e.target.tagName.toLowerCase()) {
      case "button":
        isEventTatget = true;
        btnNode = e.target;
        break;

      case "svg":
        isEventTatget = true;
        svgNode = e.target;
        btnNode = svgNode.parentElement;
        break;

      case "path":
        isEventTatget = true;
        pathNode = e.target;
        svgNode = pathNode.parentElement;
        btnNode = svgNode.parentElement;
        break;

      default:
        break;
    }

    if (isEventTatget) {
      switch (btnNode.dataset.type) {
        case "left":
          this.slideLeft();
          break;
        case "right":
          this.slideRight();
          break;
        default:
          break;
      }
    }
  }

  slideLeft() {
    let liNodes = document.querySelectorAll(".imgList");
    if (liNodes.length < 5) {
      return;
    }

    this.slideIndex++;
    console.log(`slideIndex : ${this.slideIndex}`);

    if (this.slideIndex === liNodes.length - 2) {
      this.initiateImageLocation(liNodes, -245);
      this.slideIndex = 0;
      return;
    }

    Object.values(liNodes).forEach((liNode, idx) => {
      let width = this.getNumOfWidth(liNode.style.left);
      let newWidth = `${width - 235 - 10}px`;
      liNode.style.left = newWidth;
    });
  }

  slideRight() {
    let liNodes = document.querySelectorAll(".imgList");
    if (liNodes.length < 5) {
      return;
    }

    this.slideIndex--;
    console.log(`slideIndex : ${this.slideIndex}`);

    if (this.slideIndex <= -2) {
      this.initiateImageLocation(liNodes, -245 * (liNodes.length - 3));
      this.slideIndex = liNodes.length - 4;
      return;
    }

    Object.values(liNodes).forEach((liNode, idx) => {
      let width = this.getNumOfWidth(liNode.style.left);
      let newWidth = `${width + 235 + 10}px`;
      liNode.style.left = newWidth;
    });
  }

  getNumOfWidth(pixelStr) {
    return Number(pixelStr.match(/[0-9-]*/)[0]);
  }

  initiateImageLocation(liNodes, startWidth) {
    Object.values(liNodes).forEach((liNode, idx) => {
      liNode.style.left = `${startWidth + 245 * idx}px`;
    });
  }

  // inActiveSlideAnimation(liNodes) {
  //   Object.values(liNodes).forEach((liNode, idx) => {
  //     liNode.style.transition = "none";
  //   });
  // }

  // activeSlideAnimation(liNodes) {
  //   Object.values(liNodes).forEach((liNode, idx) => {
  //     liNode.style.transition = "left 0.8s";
  //   });
  // }

  onSlideImageClickListener(e) {
    let isEventTarget = false;

    let imgNode;
    let liNode;
    switch (e.target.tagName.toLowerCase()) {
      case "img":
        isEventTarget = true;
        imgNode = e.target;
        liNode = imgNode.parentElement;
        break;
      case "li":
        isEventTarget = true;
        liNode = e.target;
        break;
      default:
        break;
    }

    if (isEventTarget) {
      let { onSlideImageClick } = this.props;
      if (onSlideImageClick !== undefined) {
        onSlideImageClick(liNode.dataset.id);
      }
    }
  }

  render() {
    let title = this.getTitle();
    let imageList = this.getImageList();

    return (
      <div
        className="kohub-slider-container"
        onClick={this.onSlideBtnClickListener.bind(this)}
      >
        <div className="kohub-slider__title-area">
          <div className="kohub-slider__title">
            <h2>{title}</h2>
          </div>
        </div>

        <div className="kohub-slider-btn btn--left">
          <button data-type="left">
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </button>
        </div>
        <div className="kohub-slider-btn btn--right">
          <button data-type="right">
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </button>
        </div>

        <div className="kohub-slider__img-area">
          <ul onClick={this.onSlideImageClickListener.bind(this)}>
            {imageList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Slider;
