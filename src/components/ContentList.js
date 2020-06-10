import React, { Component } from "react";
import "./ContentList.scss";

//props
//title : 리스트 상단 타이틀 값 / type : string
//contents : 리스트에 보여줄 데이터 / type : immutable.List

class ContentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTitle() {
    let { title } = this.props;
    if (title !== undefined) {
      return title;
    }
    return "";
  }

  getContentList() {
    let { contents } = this.props;
    if (contents !== undefined) {
      let contentList = contents.reduce((acc, contentData) => {
        return acc.concat([
          <li key={contentData.id}>
            <span>{contentData.title}</span>
          </li>,
        ]);
      }, []);

      return contentList;
    }
    return [];
  }

  render() {
    let title = this.getTitle();
    let contentList = this.getContentList();

    return (
      <div className="kohub-content-list">
        <div className="kohub-content-list-title-area">
          <div className="kohub-content-list__title">
            <h2>{title}</h2>
          </div>
          <div className="kohub-content-list__more">
            <span>더보기</span>
          </div>
        </div>
        <div className="kohub-conent-list__contents">
          <ul>{contentList}</ul>
        </div>
      </div>
    );
  }
}

export default ContentList;
