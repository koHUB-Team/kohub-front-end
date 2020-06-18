import React, { Component } from "react";
import "./VideoSlider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
//props

//API 받아서 이미지 띄우기
//이미지 슬라이드 구현하기
class VideoSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="kohub-video-container">
        <div className="kohub-video__title-area">
          <div className="kohub-video__title">
            <h2>홍보공간</h2>
          </div>
        </div>
        <div className="kohub-video__content">
          <video
            src="https://player.vimeo.com/external/297888125.sd.mp4?s=ea52a812267fee0f7dfce87c08a801ee63d3932d&profile_id=164&oauth2_token_id=57447761"
            controls
            autoplay
          ></video>
        </div>
      </div>
    );
  }
}

export default VideoSlider;
