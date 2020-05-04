import React, { Component } from "react";
import "./SearchBar.scss";

//props로 type을 전달해주면 됨
//type => css 스타일을 결정함.
//.search-bar--type

class SearchBar extends Component {
  onSubmitListener(e) {
    e.preventDefault();
    let formNode = e.target;
    let word = formNode.searchWord.value;
    this.props.onSubmit(word);
  }

  render() {
    let searchBarType = this.props.type;

    return (
      <div
        className={`kohub-search-bar-container search-bar--${searchBarType}`}
      >
        <form onSubmit={this.onSubmitListener.bind(this)}>
          <input name="searchWord" type="text" />
        </form>
        <span className="search-bar-logo blind">검색</span>
      </div>
    );
  }
}

export default SearchBar;
