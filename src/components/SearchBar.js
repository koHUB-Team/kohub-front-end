import React, { Component } from "react";
import "./SearchBar.scss";

//props로 type을 전달해주면 됨
//type => css 스타일을 결정함.
//.search-bar--type

class SearchBar extends Component {
  render() {
    let searchBarType = this.props.type;

    return (
      <div
        className={`kohub-search-bar-container search-bar--${searchBarType}`}
      >
        <input
          id="search"
          className=""
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <span className="search-bar-logo blind">검색</span>
      </div>
    );
  }
}

export default SearchBar;
