import React, { Component } from "react";
import { Header, Footer } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Table, Pagination, Sidebar, BoardHeader } from "../../components";
import { List, Record } from "immutable";
import Moment from "moment";
import { ApiUtil } from "../../common/kohubUtil";
import "./Notice.scss";

const NoticeBoardData = Record({
  id: null,
  title: "",
  userName: "",
  createDate: "",
});

const ColgroupData = Record({
  span: 0,
  class: "",
});

const SidebarData = Record({
  menuName: "",
  menuUrl: "",
});

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarTitle: "koHUB",
      sidebarList: List([
        SidebarData({
          menuName: "공지사항",
          menuUrl: "/notice",
        }),
        SidebarData({
          menuName: "FAQ",
          menuUrl: "/faq",
        }),
        SidebarData({
          menuName: "Q&A",
          menuUrl: "/qna",
        }),
        SidebarData({
          menuName: "자유게시판",
          menuUrl: "/free",
        }),
        SidebarData({
          menuName: "실험실",
          menuUrl: "/lab",
        }),
      ]),
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
    this.colgroupDatas = List([
      ColgroupData({
        span: 1,
        class: "kohub-notice-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-notice-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-notice-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-notice-board-col",
      }),
    ]);
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
    let {
      heads,
      datas,
      startPage,
      endPage,
      sidebarTitle,
      sidebarList,
    } = this.state;
    let { match } = this.props;

    return (
      <div>
        <Header></Header>
        <div className="container kohub-noticeboard ">
          <div className="content-area kohub-noticeboard__content ">
            <Sidebar sidebarTitle={sidebarTitle} datas={sidebarList}></Sidebar>
            <div className="kohub-noticeboard__board">
              <BoardHeader value={"공지사항"}></BoardHeader>
              <div className="kohub-noticeboard__table">
                <Table
                  heads={heads}
                  datas={datas}
                  checked={false}
                  colgroupDatas={this.colgroupDatas}
                  linked={true}
                  link={"/notice"}
                  linkIdx={1}
                ></Table>
              </div>
              <div className="kohub-noticeboard-content__bottom-area">
                <Pagination
                  start={startPage}
                  end={endPage}
                  onPrevBtnClick={this.onPrevBtnClickCallback.bind(this)}
                  onNextBtnClick={this.onNextBtnClickCallback.bind(this)}
                  onPageBtnClick={this.onPageBtnClickCallback.bind(this)}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Notice;
