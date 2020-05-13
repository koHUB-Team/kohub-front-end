import React, { Component } from "react";
import "./SearchBar.scss";
import Cleave from "cleave.js/react";

//****SearchBar 컴포넌트****//
//props
//onSubmit : input box에서 엔터를 쳐서 발생하는 onSubmit 이벤트에서 실행할 콜백메소드. 선택한 메뉴이름을 인자로 넘겨줌.
//onSearchBarFocus : onFocus 이벤트 시 실행할 콜백함수
//onSearchBarChange : onChange 이벤트 시 실행할 콜백함수
//validOptions : input box의 값을 유효성을 검사하는 옵션. Cleave.js 문서 참고, Cleave 컴포넌트의 props로 전달해줌.
//type : 컴포넌트의 디자인이 변경되야하는 부분은 scss파일에 스타일을 추가해서 사용할 것. / type : String
//.search-bar--xxx 식으로 스타일 정의. xxx부분에 type으로 전달받은 props로 치환해서 스타일을 지정하게 됨.

class SearchBar extends Component {
  onSubmitListener(e) {
    e.preventDefault();
    let formNode = e.target;
    let word = formNode.searchWord.value;

    let { onSubmit } = this.props;
    if (onSubmit !== undefined) {
      onSubmit(word);
    }
  }

  onSearchBarFocusListener() {
    let { onSearchBarFocus } = this.props;
    if (onSearchBarFocus !== undefined) {
      onSearchBarFocus();
    }
  }

  onSearchBarChangeListener() {
    let { onSearchBarChange } = this.props;
    if (onSearchBarChange !== undefined) {
      onSearchBarChange();
    }
  }

  getInputBox() {
    let { validOptions } = this.props;
    if (validOptions !== undefined) {
      return (
        <Cleave
          name="searchWord"
          type="text"
          options={validOptions}
          onFocus={this.onSearchBarFocusListener.bind(this)}
          onChange={this.onSearchBarChangeListener.bind(this)}
        ></Cleave>
      );
    }

    return (
      <Cleave
        name="searchWord"
        type="text"
        onFocus={this.onSearchBarFocusListener.bind(this)}
        onChange={this.onSearchBarChangeListener.bind(this)}
      ></Cleave>
    );
  }

  render() {
    let searchBarType = this.props.type;
    let inputBox = this.getInputBox();

    return (
      <div
        className={`kohub-search-bar-container search-bar--${searchBarType}`}
      >
        <form onSubmit={this.onSubmitListener.bind(this)}>{inputBox}</form>
        <span className="search-bar-logo blind">검색</span>
      </div>
    );
  }
}

export default SearchBar;
