import React, { Component } from "react";
import "./AdminContent.scss";
import AdminHeader from "../containers/AdminHeader";
import { Table, Pagination } from ".";
import { List, Record } from "immutable";
import { ApiUtil } from "../common/kohubUtil";

const User = Record({
  id: null,
  email: "",
  name: "",
  auth: "",
  state: "",
  role: "",
  createDate: "",
  modifyDate: "",
});

const TableData = Record({
  heads: List(),
  datas: List(),
});

class AdminContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData(),
      totalCount: 0,
      startPage: 1,
      endPage: 0,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_TABLE_ROW = 10;
  }

  componentDidMount() {
    this.requestUserApi();
  }

  requestUserApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_ADMIN_USERS;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let userDatas = json.users;
        let totalCount = json.totalCount;
        this.userApiHandler(userDatas, totalCount);
      })
      .catch((err) => {
        new Error("User API Error");
      });
  }

  userApiHandler(userDatas, newTotalCount) {
    let newHeads = List([
      "No",
      "Email",
      "Name",
      "Auth",
      "State",
      "Role",
      "CreateDate",
      "ModifyDate",
    ]);

    let newDatas = List(userDatas).map((userData) => {
      return User({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        auth: userData.auth ? "인증" : "미인증",
        state: userData.state,
        role: userData.role,
        createDate: userData.createDate,
        modifyDate: userData.modifyDate,
      });
    });

    let newTableData = TableData({
      heads: newHeads,
      datas: newDatas,
    });

    let { endPage } = this.state;
    let newEndPage;
    if (endPage === 0) {
      newEndPage = this.calculateMaxPage(newTotalCount);
      if (newEndPage > this.MAX_NUM_OF_PAGE_BTN) {
        newEndPage = this.MAX_NUM_OF_PAGE_BTN;
      }
    } else {
      newEndPage = endPage;
    }

    this.setState({
      table: newTableData,
      totalCount: newTotalCount,
      endPage: newEndPage,
    });
  }

  calculateMaxPage(totalCount) {
    return Math.ceil(totalCount / 10);
  }

  onPrevBtnClickCallback(e) {
    console.log("prevClick Callback!");
    let { startPage } = this.state;

    if (startPage > this.MIN_PAGE_NUM) {
      let newStartPage = startPage - this.MAX_NUM_OF_PAGE_BTN;
      let newEndPage = newStartPage + this.MAX_NUM_OF_PAGE_BTN - 1;

      this.setState({
        startPage: newStartPage,
        endPage: newEndPage,
      });

      let params = {
        start: (newStartPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
      };
      this.requestUserApi(params);
    }
  }

  onNextBtnClickCallback(e) {
    console.log("nextClick Callback!");
    let { startPage } = this.state;
    let { endPage } = this.state;
    let { totalCount } = this.state;
    let maxPage = this.calculateMaxPage(totalCount);

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

      let params = {
        start: (newStartPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
      };
      this.requestUserApi(params);
    }
  }

  onPageBtnClickCallback(pageNum) {
    console.log("pageClick Callback!!");
    let params = {
      start: (pageNum - 1) * this.MAX_NUM_OF_TABLE_ROW,
    };
    this.requestUserApi(params);
  }

  render() {
    let heads = this.state.table.heads;
    let datas = this.state.table.datas;
    let startPage = this.state.startPage;
    let endPage = this.state.endPage;

    return (
      <div className="kohub-admin-content-container">
        <div className="kohub-admin-content-area">
          <AdminHeader></AdminHeader>
          <Table heads={heads} datas={datas}></Table>
          <div className="kohub-admin-content__bottom-area">
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
    );
  }
}

export default AdminContent;
