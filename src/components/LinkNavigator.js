import React, { Component } from "react";
import "./LinkNavigator.scss";

//props

class LinkNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="kohub-link-container">
        <div className="kohub-link__title">
          <p>교내사이트</p>
          <p>바로가기</p>
        </div>
        <div className="kohub-link__nav">
          <ul>
            <li>
              <a href="#">
                <span>코리아텍</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>아우누리</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>아우미르</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>다산정보관</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>LINK+사업단</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>상담진로센터</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>IPP센터</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>대학원</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LinkNavigator;
