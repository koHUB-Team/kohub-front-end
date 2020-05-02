import React, { Component } from "react";
import "./AdminContent.scss";
import AdminTitleContainer from "../containers/AdminTitleContainer";
import { Table, Pagination, AdminTitle, DropBox, SearchBar, Button } from ".";
import { List, Record } from "immutable";
import { ApiUtil } from "../common/kohubUtil";
import { Link } from "react-router-dom";

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
      totalUserCount: 0,
      normalCount: 0,
      warnningCount: 0,
      forbiddenCount: 0,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_TABLE_ROW = 10;
    this.dropMenuList = List(["이메일", "닉네임"]);
    this.selectedDropMenu = null;
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
        let totalUserCount = json.totalUserCount;
        let normalCount = json.normalCount;
        let warnningCount = json.warnningCount;
        let forbiddenCount = json.forbiddenCount;

        this.userApiHandler(
          userDatas,
          totalCount,
          totalUserCount,
          normalCount,
          warnningCount,
          forbiddenCount
        );
      })
      .catch((err) => {
        new Error("User API Error");
      });
  }

  requestSearchUserApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_ADMIN_USER;
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
        let totalUserCount = json.totalUserCount;
        let normalCount = json.normalCount;
        let warnningCount = json.warnningCount;
        let forbiddenCount = json.forbiddenCount;
        this.userApiHandler(
          userDatas,
          totalCount,
          totalUserCount,
          normalCount,
          warnningCount,
          forbiddenCount
        );
      })
      .catch((err) => {
        alert("조회된 데이터가 없습니다.");
      });
  }

  userApiHandler(
    userDatas,
    newTotalCount,
    newTotalUserCount,
    newNormalCount,
    newWarnningCount,
    newForbiddenCount
  ) {
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
      totalUserCount: newTotalUserCount,
      normalCount: newNormalCount,
      warnningCount: newWarnningCount,
      forbiddenCount: newForbiddenCount,
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

  onSearchBarSubmitCallback(word) {
    //유효성 검사 필요

    let params;
    switch (this.selectedDropMenu) {
      case "이메일":
        params = {
          email: word,
        };
        break;

      case "닉네임":
        params = {
          name: word,
        };
        break;

      default:
        break;
    }

    this.requestSearchUserApi(params);
  }

  onDropMenuClickCallback(selectedDropMenu) {
    this.selectedDropMenu = selectedDropMenu;
  }

  onWarnningBtnClickCallback() {
    console.log("경고");
    let checkBoxNodes = document.querySelectorAll(".kohub-table-check");
    let checkedIds = Object.values(checkBoxNodes).filter((checkBox) => {
      if (checkBox.checked === true) {
        return checkBox;
      }
    });

    if (checkedIds.length > 0) {
      checkedIds.forEach((e) => {
        console.log(e.value);
      });
    }
  }

  onForbiddenBtnClickCallback() {
    console.log("정지");
  }

  onRecoveryBtnClickCallback() {
    console.log("해제");
  }

  render() {
    let heads = this.state.table.heads;
    let datas = this.state.table.datas;
    let startPage = this.state.startPage;
    let endPage = this.state.endPage;
    let {
      totalUserCount,
      normalCount,
      warnningCount,
      forbiddenCount,
    } = this.state;

    return (
      <div className="kohub-admin-content-container">
        <div className="kohub-admin-content-area">
          <header className="kohub-admin-header">
            <div className="kohub-admin-header-area">
              <AdminTitleContainer></AdminTitleContainer>
              <div className="kohub-admin-header__search align-center-col">
                <DropBox
                  onMenuClick={this.onDropMenuClickCallback.bind(this)}
                  menus={this.dropMenuList}
                ></DropBox>
                <SearchBar
                  onSubmit={this.onSearchBarSubmitCallback.bind(this)}
                  type="admin"
                ></SearchBar>
              </div>
              <div className="kohub-admin-header__info">
                <span>총회원수:{totalUserCount}</span>
                <span>정상:{normalCount}</span>
                <span>경고:{warnningCount}</span>
                <span>정지:{forbiddenCount}</span>
              </div>
              <div className="kohub-admin-header__align-btn">
                <button>필터</button>
              </div>
            </div>
          </header>
          <Table heads={heads} datas={datas} checked={true}></Table>
          <div className="kohub-admin-control__btn">
            <Button
              value={"경고"}
              onClick={this.onWarnningBtnClickCallback.bind(this)}
            ></Button>
            <Button
              value={"정지"}
              onClick={this.onForbiddenBtnClickCallback.bind(this)}
            ></Button>
            <Button
              value={"해제"}
              onClick={this.onRecoveryBtnClickCallback.bind(this)}
            ></Button>
          </div>
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
