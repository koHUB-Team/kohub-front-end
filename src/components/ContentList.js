import React, { Component } from "react";
import "./ContentList.scss";
import { Link } from "react-router-dom";

//props
//title : 리스트 상단 타이틀 값 / type : string
//contents : 리스트에 보여줄 데이터 / type : immutable.List
//moreLink: 더보기 클릭시 이동할 링크

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
    let link = this.getLink();

    if (contents !== undefined) {
      let contentList = contents.reduce((acc, contentData) => {
        return acc.concat([
          <li key={contentData.id} data-id={contentData.id}>
            <div className="kohub-content-list__title-area">
              <Link to={`${link}/${contentData.id}`}>
                <span className="kohub-content-list__title">
                  {contentData.title}
                </span>
              </Link>
            </div>

            <span className="kohub-content-list__date">{contentData.date}</span>
          </li>,
        ]);
      }, []);

      return contentList;
    }
    return [];
  }

  getLink() {
    let { link } = this.props;
    if (link !== undefined) {
      return link;
    }

    return "";
  }

  render() {
    let title = this.getTitle();
    let contentList = this.getContentList();
    let link = this.getLink();

    return (
      <div className="kohub-content-list">
        <div className="kohub-content-list-title-area">
          <div className="kohub-content-list__title">
            <h2>{title}</h2>
          </div>
          <div className="kohub-content-list__more">
            <Link to={link}>
              <span>더보기</span>
            </Link>
          </div>
        </div>
        <div className="kohub-conent-list__contents">
          <ul
          // onClick={this.onContentClickListener.bind(this)}
          >
            {contentList}
          </ul>
        </div>
      </div>
    );
  }
}

export default ContentList;
