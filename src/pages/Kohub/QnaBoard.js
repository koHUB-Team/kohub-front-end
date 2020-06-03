import React, { Component } from "react";
import "./QnaBoard.scss";
import {
  Sidebar,
  Table,
  Pagination,
  SearchBar,
  DropBox,
  DropMenu,
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Record, List } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";

const QnaBoardData = Record({
  id: null,
  title: "",
  userName: "",
  createDate: "",
});

const ColgroupData = Record({
  span: 0,
  class: "",
});

class QnaBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heads: List(["번호", "제목", "작성자", "등록일"]),
      datas: List([]),
      startPage: 1,
      endPage: 0,
      totalQnaCount: 0,
      searchFlag: false,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_TABLE_ROW = 10;
    this.dropMenuList = List(["제목", "작성자"]);
    this.selectedDropMenu = null;
    this.numofCurrentPage = null;
    this.colgroupDatas = List([
      ColgroupData({
        span: 1,
        class: "kohub-qna-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-qna-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-qna-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-qna-board-col",
      }),
    ]);
  }

  componentDidMount() {
    this.requestQnaApi();
  }
  requestQnaApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_QNAS;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let qnas = json.qnas;
        let totalQnaCount = json.totalQnaCount;
        this.qnaApiHandler(qnas, totalQnaCount);
      })
      .catch((err) => {
        new Error("Q&A Error");
      });
  }

  requestSearchQnaApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_QNA_SEARCH;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let qnas = json.qnas;
        let totalQnaCount = json.totalQnaCount;
        this.qnaApiHandler(qnas, totalQnaCount);
      })
      .catch((err) => {
        new Error("Q&A Error");
      });
  }

  qnaApiHandler(qnas, totalQnaCount) {
    let { searchFlag } = this.state;
    if (searchFlag) {
      this.setState({
        endPage: 0,
      });
    }

    let newDatas = List([]);
    Object.values(qnas).forEach((qna, idx) => {
      let newTitle = "[" + qna.category + "] " + qna.title;
      newDatas = newDatas.set(
        idx,
        QnaBoardData({
          id: qna.id,
          title: newTitle,
          userName: qna.userName,
          createDate: qna.createDate,
        })
      );
    });

    let { endPage } = this.state;
    let newEndPage;
    if (endPage === 0) {
      newEndPage = Math.ceil(totalQnaCount / 10);
      if (newEndPage > this.MAX_NUM_OF_PAGE_BTN) {
        newEndPage = this.MAX_NUM_OF_PAGE_BTN;
      }
    } else {
      newEndPage = endPage;
    }

    this.setState({
      datas: newDatas,
      totalQnaCount: totalQnaCount,
      endPage: newEndPage,
    });
  }

  onPageBtnClickCallback(pageNum) {
    this.numofCurrentPage = pageNum;
    let params = {
      start: (pageNum - 1) * this.MAX_NUM_OF_TABLE_ROW,
    };
    this.requestQnaApi(params);
  }

  onNextBtnClickCallback() {
    let { startPage, endPage, totalQnaCount } = this.state;
    let maxPage = Math.ceil(totalQnaCount / 10);

    if (endPage < maxPage) {
      let newStartPage = startPage + this.MAX_NUM_OF_PAGE_BTN;
      let newEndPage = endPage + this.MAX_NUM_OF_PAGE_BTN;
      if (newEndPage > maxPage) {
        newEndPage = maxPage;
      }
      this.setState({
        startPage: newStartPage,
        endPage: newEndPage,
      });

      this.numOfCurrentPage = newStartPage;

      let params = {
        start: (newStartPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
      };
      this.requestQnaApi(params);
    }
  }

  onPrevBtnClickCallback() {
    let { startPage } = this.state;
    if (startPage !== this.MIN_PAGE_NUM) {
      let newStartPage = startPage - this.MAX_NUM_OF_PAGE_BTN;
      let newEndPage = newStartPage + this.MAX_NUM_OF_PAGE_BTN - 1;
      if (newStartPage < 0) {
        newStartPage = this.MIN_PAGE_NUM;
      }

      this.setState({
        startPage: newStartPage,
        endPage: newEndPage,
      });
      this.numOfCurrentPage = newStartPage;

      let params = {
        start: (newStartPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
      };
      this.requestQnaApi(params);
    }
  }

  onDropMenuClickCallback(selectedDropMenu) {
    this.selectedDropMenu = selectedDropMenu;
  }

  onSearchBarSubmitCallback(word) {
    if (word === "") {
      alert("내용을 입력해주세요");
      return;
    }
    let params;
    switch (this.selectedDropMenu) {
      case "제목":
        params = {
          title: word,
        };
        break;
      case "작성자":
        params = {
          userName: word,
        };
        break;
      default:
        alert("검색 카테고리를 설정해주세요.");
        return;
    }

    this.setState({
      searchFlag: true,
    });
    this.requestSearchQnaApi(params);
  }

  onWriteBtnClickCallback() {
    let { onWriteBtnClick } = this.props;
    if (onWriteBtnClick !== undefined) {
      onWriteBtnClick();
    }
  }

  onTableRowClickCallback(boardId) {
    let { onDetailClick } = this.props;
    if (onDetailClick !== undefined) {
      onDetailClick(boardId);
    }
  }
  render() {
    let { datas, heads, startPage, endPage } = this.state;
    return (
      <div className="container kohub-qna">
        <div className="content-area kohub-qna__content">
          <Sidebar></Sidebar>
          <div className="kohub-qna__board">
            <div className="kohub-qna__header">
              <h2>Q&amp;A</h2>
              <div className="kohub-qna-header__drop-box">
                <DropBox
                  onMenuClick={this.onDropMenuClickCallback.bind(this)}
                  menus={this.dropMenuList}
                ></DropBox>
              </div>
              <div className="kohub-qna-header__search-bar">
                <SearchBar
                  type="admin"
                  onSubmit={this.onSearchBarSubmitCallback.bind(this)}
                ></SearchBar>
              </div>
            </div>
            <div className="kohub-qna__table">
              <Table
                heads={heads}
                datas={datas}
                checked={false}
                colgroupDatas={this.colgroupDatas}
                onTableRowClick={this.onTableRowClickCallback.bind(this)}
              ></Table>
            </div>
            <div className="kohub-qna-content__bottom-area">
              <Pagination
                start={startPage}
                end={endPage}
                onPrevBtnClick={this.onPrevBtnClickCallback.bind(this)}
                onNextBtnClick={this.onNextBtnClickCallback.bind(this)}
                onPageBtnClick={this.onPageBtnClickCallback.bind(this)}
              ></Pagination>
              <div className="kohub-qna-content__write-button">
                <span onClick={this.onWriteBtnClickCallback.bind(this)}>
                  <FontAwesomeIcon icon={faEdit} flip="horizontal" />
                  {""}
                  글쓰기
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QnaBoard;
