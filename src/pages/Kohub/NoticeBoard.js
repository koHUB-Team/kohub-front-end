import React, { Component } from "react";
import "./NoticeBoard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Table, Pagination, Sidebar, BoardHeader } from "../../components";
import { List, Record } from "immutable";
import Moment from "moment";
import { ApiUtil } from "../../common/kohubUtil";

//카멜케이스로
const NoticeBoardData = Record({
  id: null,
  title: "",
  userName: "",
  createDate: "",
});

class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heads: List(["번호", "제목", "작성자", "등록일"]),
      datas: List([]),
      startPage: 1,
      endPage: 0,
      totalNoticeCount: 0,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_TABLE_ROW = 10;
    this.numOfCurrentPage = null;
  }

  componentDidMount() {
    this.requestNoticeApi();
  }
  requestNoticeApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_NOTICES;
    if (params != null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let noticeBoards = json.items;
        let totalNoticeCount = json.totalNoticeCount;
        this.noticeBoardApiHandler(noticeBoards, totalNoticeCount);
      })
      .catch((err) => {
        new Error("Notice Error");
      });
  }

  noticeBoardApiHandler(noticeBoardDatas, totalNoticeCount) {
    let newDatas = List([]);
    Object.values(noticeBoardDatas).forEach((noticeBoardData, idx) => {
      newDatas = newDatas.set(
        idx,
        NoticeBoardData({
          id: noticeBoardData.id,
          title: noticeBoardData.title,
          userName: noticeBoardData.userName,
          createDate: Moment(noticeBoardData.createDate).format("YYYY.MM.DD"),
        })
      );
    });

    let { endPage } = this.state;
    let newEndPage;
    if (endPage === 0) {
      newEndPage = Math.ceil(totalNoticeCount / 10);
      if (newEndPage > this.MAX_NUM_OF_PAGE_BTN) {
        newEndPage = this.MAX_NUM_OF_PAGE_BTN;
      }
    } else {
      newEndPage = endPage;
    }
    this.setState({
      datas: newDatas,
      totalNoticeCount: totalNoticeCount,
      endPage: newEndPage,
    });
  }

  onPageBtnClickCallback(pageNum) {
    this.numOfCurrentPage = pageNum;
    let params = {
      start: (pageNum - 1) * this.MAX_NUM_OF_TABLE_ROW,
    };
    this.requestNoticeApi(params);
  }

  onNextBtnClickCallback() {
    let { startPage, endPage, totalNoticeCount } = this.state;
    let maxPage = Math.ceil(totalNoticeCount / 10);

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
      this.requestNoticeApi(params);
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
      this.requestNoticeApi(params);
    }
  }
  onWriteBtnClickCallback() {
    let { onWriteBtnClick } = this.props;
    if (onWriteBtnClick !== undefined) {
      onWriteBtnClick();
    }
  }

  render() {
    let { heads, datas, startPage, endPage } = this.state;

    return (
      <div className="container kohub-noticeboard ">
        <div className="content-area kohub-noticeboard__content ">
          <Sidebar></Sidebar>
          <div className="kohub-noticeboard__board">
            <BoardHeader value={"공지사항"}></BoardHeader>
            <div className="kohub-noticeboard_table">
              <Table heads={heads} datas={datas} checked={false}></Table>
            </div>
            <div className="kohub-noticeboard-content__bottom-area">
              <Pagination
                start={startPage}
                end={endPage}
                onPrevBtnClick={this.onPrevBtnClickCallback.bind(this)}
                onNextBtnClick={this.onNextBtnClickCallback.bind(this)}
                onPageBtnClick={this.onPageBtnClickCallback.bind(this)}
              ></Pagination>
              <div className="kohub-noticeboard-content__write-button">
                <span onClick={this.onWriteBtnClickCallback.bind(this)}>
                  <FontAwesomeIcon icon={faEdit} flip="horizontal" /> {""}
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

export default NoticeBoard;
