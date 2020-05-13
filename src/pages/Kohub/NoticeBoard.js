import React, { Component } from "react";
import "./NoticeBoard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Table,
  SearchBar,
  DropBox,
  Pagination,
  Sidebar,
} from "../../components";
import { List, Record } from "immutable";
import Moment from "moment";
import { ApiUtil } from "../../common/kohubUtil";

const TableData = Record({
  heads: List(),
  datas: List(),
});

const NoticeBoardData = Record({
  id: null,
  title: "",
  user_name: "",
  create_date: "",
});

class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heads: List(["번호", "제목", "작성자", "등록일"]),
      datas: List([
        NoticeBoardData({
          id: 1,
          title: "첫번째 제목",
          user_name: "관리자",
          create_date: "2020.00.00",
        }),
        NoticeBoardData({
          id: 2,
          title: "두번째 제목",
          user_name: "관리자",
          create_date: "2021.00.00",
        }),
        NoticeBoardData({
          id: 3,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 4,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 5,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 6,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 7,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 8,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 9,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
        NoticeBoardData({
          id: 10,
          title: "세번째 제목",
          user_name: "관리자",
          create_date: "2022.00.00",
        }),
      ]),
      table: TableData(),
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_KOHUB_API_URL_GET_NOTICES)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let noticeBoards = json.items;
        this.noticeBoardApiHandler(noticeBoards);
      })
      .catch((err) => {
        new Error("Notice Error");
      });
  }

  noticeBoardApiHandler(noticeBoardDatas) {
    let newDatas = List([]);
    Object.values(noticeBoardDatas).forEach((noticeBoardData, idx) => {
      newDatas = newDatas.set(
        idx,
        NoticeBoardData({
          id: noticeBoardData.id,
          title: noticeBoardData.title,
          user_name: noticeBoardData.userName,
          create_date: Moment(noticeBoardData.createDate).format("YYYY.MM.DD"),
        })
      );
    });

    this.setState({
      datas: newDatas,
    });

    let queryStr = ApiUtil.parseObjToQueryStr({ start: 10 });
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_NOTICES + queryStr;

    console.log(url);
  }

  render() {
    let { heads, datas } = this.state;

    return (
      <div className="container kohub-noticeboard ">
        <div className="content-area kohub-noticeboard__content ">
          <Sidebar></Sidebar>
          <div className="kohub-noticeboard__board">
            <div className="kohub-noticeboard-header">
              <div className="kohub-noticeboard__title">
                <h1>공지사항</h1>
              </div>
              <div className="kohub-noticeboard__search align-center-col"></div>
            </div>
            <Table heads={heads} datas={datas} checked={false}></Table>
            <div className="kohub-noticeboard-content__bottom-area">
              <Pagination start={1} end={5}></Pagination>
              <div className="kohub-noticeboard-content__write-button">
                <span>
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
