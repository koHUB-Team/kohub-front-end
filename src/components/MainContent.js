import React, { Component } from "react";
import "./MainContent.scss";

class MainContent extends Component {
  render() {
    return (
      <main>
        <div className="container">
          <div className="content-area">
            <h2>최신게시글</h2>
            <h3>공지사항</h3>
            <h3>자유게시판</h3>
            <h3>아르바이트</h3>
            <h3>팀원모집</h3>

            <h2>교내홍보</h2>
            <h2>학식메뉴</h2>
            <h2>맛집추천</h2>
            <h2>매물추천</h2>
            <h2>외부광고</h2>
            <h2>중고장터</h2>
            <h2>분실물</h2>
          </div>
        </div>
      </main>
    );
  }
}

export default MainContent;
