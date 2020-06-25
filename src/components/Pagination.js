import React, { Component } from "react";
import "./Pagination.scss";

//****Pagination 컴포넌트****//
//props정보
//start : 페이징 버튼 첫번째 숫자
//end : 페이징 버튼 마지막 숫자
//onPrevBtnClick : 이전 페이징 버튼 클릭 시 이벤트 리스너에서 실행할 콜백함수
//onPageBtnClick : 다음 페이징 버튼 클릭 시 이벤트 리스너에서 실행할 콜백함수
//onPageBtnClick : 페이징 버튼 클릭 시 이벤트 리스너에서 실행할 콜백함수

class Pagination extends Component {
  onPrevBtnClickListener(e) {
    e.preventDefault();
    e.stopPropagation();

    let { onPrevBtnClick } = this.props;
    if (onPrevBtnClick !== undefined) {
      onPrevBtnClick();
    }
  }

  onNextBtnClickListener(e) {
    e.preventDefault();
    e.stopPropagation();

    let { onNextBtnClick } = this.props;
    if (onNextBtnClick !== undefined) {
      onNextBtnClick();
    }
  }

  //콜백함수의 인자로 클릭한 페이징 버튼의 숫자 값을 전달.
  onPageBtnClickListener(e) {
    e.preventDefault();
    e.stopPropagation();

    let pageNum = Number(e.target.textContent);
    let { onPageBtnClick } = this.props;
    if (onPageBtnClick !== undefined) {
      onPageBtnClick(pageNum);
    }
  }

  //start ~ end개의 페이징 버튼 리스트 반환 함수
  getPagingBtnList() {
    let pagingBtnList = [];
    let { start } = this.props;
    let { end } = this.props;

    if (start === undefined || end === undefined) {
      return pagingBtnList;
    }

    for (let i = start; i <= end; i++) {
      pagingBtnList = pagingBtnList.concat([
        <button
          key={i}
          className="kohub-pagination__btn--item"
          onClick={this.onPageBtnClickListener.bind(this)}
        >
          {i}
        </button>,
      ]);
    }

    return pagingBtnList;
  }

  render() {
    let pagingBtnList = this.getPagingBtnList();

    return (
      <div className="kohub-pagination-container">
        <button
          className="kohub-pagination__btn--prev"
          onClick={this.onPrevBtnClickListener.bind(this)}
        >
          {["\u003C"]}
        </button>
        {pagingBtnList}
        <button
          className="kohub-pagination__btn--next"
          onClick={this.onNextBtnClickListener.bind(this)}
        >
          {["\u003E"]}
        </button>
      </div>
    );
  }
}

export default Pagination;
