import React, { Component } from "react";
import "./Account.scss";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import {
  Table,
  Pagination,
  DropBox,
  SearchBar,
  Button,
  DropMenu,
} from "../../components";
import { List, Record } from "immutable";
import { ApiUtil, ValidateUtil } from "../../common/kohubUtil";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

const UserData = Record({
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

const DropMenuData = Record({
  menu: "",
  menuType: "",
  menuValue: "",
});

const FILTER_TYPE = Record({
  ALL: "ALL",
  ROLE: "ROLE",
  AUTH: "AUTH",
  STATE: "STATE",
})();

const FILTER_VALUE = Record({
  ADMIN: "ADMIN",
  USER: "USER",
  CERTIFIED: "CERTIFIED",
  UNCERTIFIED: "UNCERTIFIED",
})();

const USER_STATE = Record({
  NORMAL: "NORMAL",
  WARRNING: "WARRNING",
  FORBIDDEN: "FORBIDDEN",
})();

const ORDER_TYPE = Record({
  NO: "NO",
  CREATE_DATE: "CREATE_DATE",
  MODIFY_DATE: "MODIFY_DATE",
})();

const ORDER_OPTION = Record({
  ASC: "ASC",
  DESC: "DESC",
})();

const ColgroupData = Record({
  span: 0,
  class: "",
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData(),
      totalCount: 0,
      startPage: 1,
      endPage: 0,
      filterType: FILTER_TYPE.ALL,
      filterValue: "",
      orderType: ORDER_TYPE.NO,
      orderOption: ORDER_OPTION.ASC,
      totalUserCount: 0,
      normalCount: 0,
      warnningCount: 0,
      forbiddenCount: 0,
      searchFlag: false,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_TABLE_ROW = 10;
    this.dropMenuList = List(["이메일", "닉네임"]);
    this.selectedDropMenu = null;
    this.numOfCurrentPage = 1;
    this.filterMenuList = List([
      DropMenuData({
        menu: "모든 계정",
        menuType: FILTER_TYPE.ALL,
        menuValue: "",
      }),
      DropMenuData({
        menu: "관리자 계정",
        menuType: FILTER_TYPE.ROLE,
        menuValue: FILTER_VALUE.ADMIN,
      }),
      DropMenuData({
        menu: "회원 계정",
        menuType: FILTER_TYPE.ROLE,
        menuValue: FILTER_VALUE.USER,
      }),
      DropMenuData({
        menu: "인증 계정",
        menuType: FILTER_TYPE.AUTH,
        menuValue: FILTER_VALUE.CERTIFIED,
      }),
      DropMenuData({
        menu: "미인증 계정",
        menuType: FILTER_TYPE.AUTH,
        menuValue: FILTER_VALUE.UNCERTIFIED,
      }),
      DropMenuData({
        menu: "정상 계정",
        menuType: FILTER_TYPE.STATE,
        menuValue: USER_STATE.NORMAL,
      }),
      DropMenuData({
        menu: "경고 계정",
        menuType: FILTER_TYPE.STATE,
        menuValue: USER_STATE.WARRNING,
      }),
      DropMenuData({
        menu: "정지 계정",
        menuType: FILTER_TYPE.STATE,
        menuValue: USER_STATE.FORBIDDEN,
      }),
    ]);
    this.alignMenuList = List([
      DropMenuData({
        menu: "번호",
        menuType: ORDER_TYPE.NO,
        menuValue: ORDER_OPTION.ASC,
      }),
      DropMenuData({
        menu: "가입 날짜",
        menuType: ORDER_TYPE.CREATE_DATE,
        menuValue: ORDER_OPTION.DESC,
      }),
      DropMenuData({
        menu: "수정 날짜",
        menuType: ORDER_TYPE.MODIFY_DATE,
        menuValue: ORDER_OPTION.DESC,
      }),
    ]);
    this.colgroupDatas = List([
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-admin-account-board-col",
      }),
    ]);
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

  requestChangeUserStateApi(params = null, pathVariables = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_ADMIN_USER_STATE;

    if (pathVariables !== null) {
      url = ApiUtil.bindPathVariable(url, pathVariables);
    }

    fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      referrer: "no-referrer",
      body: JSON.stringify(params),
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("계정 상태가 변경되었습니다.");
        let params = {
          start: (this.numOfCurrentPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
          filterType: this.state.filterType,
          filterValue: this.state.filterValue,
          orderType: this.state.orderType,
          orderOption: this.state.orderOption,
        };
        this.requestUserApi(params);
      })
      .catch((err) => {
        alert("계정 상태를 변경하는데 문제가 발생하였습니다.");
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
      return UserData({
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
    let { searchFlag } = this.state;

    if (!searchFlag) {
      let { startPage } = this.state;

      if (startPage > this.MIN_PAGE_NUM) {
        let newStartPage = startPage - this.MAX_NUM_OF_PAGE_BTN;
        let newEndPage = newStartPage + this.MAX_NUM_OF_PAGE_BTN - 1;

        this.setState({
          startPage: newStartPage,
          endPage: newEndPage,
        });
        this.numOfCurrentPage = newStartPage;

        let params = {
          start: (newStartPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
          filterType: this.state.filterType,
          filterValue: this.state.filterValue,
          orderType: this.state.orderType,
          orderOption: this.state.orderOption,
        };
        this.requestUserApi(params);
      }
    }
  }

  onNextBtnClickCallback(e) {
    let { searchFlag } = this.state;

    if (!searchFlag) {
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
        this.numOfCurrentPage = newStartPage;

        let params = {
          start: (newStartPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
          filterType: this.state.filterType,
          filterValue: this.state.filterValue,
          orderType: this.state.orderType,
          orderOption: this.state.orderOption,
        };
        this.requestUserApi(params);
      }
    }
  }

  onPageBtnClickCallback(pageNum) {
    let { searchFlag } = this.state;

    if (!searchFlag) {
      this.numOfCurrentPage = pageNum;
      let params = {
        start: (pageNum - 1) * this.MAX_NUM_OF_TABLE_ROW,
        filterType: this.state.filterType,
        filterValue: this.state.filterValue,
        orderType: this.state.orderType,
        orderOption: this.state.orderOption,
      };
      this.requestUserApi(params);
    }
  }

  onSearchBarSubmitCallback(word) {
    let params;
    switch (this.selectedDropMenu) {
      case "이메일":
        if (!ValidateUtil.emailValidate(word)) {
          alert("이메일 형식을 지켜주세요.");
          return;
        }

        params = {
          email: word,
        };
        break;

      case "닉네임":
        if (!ValidateUtil.nicknameValidate(word)) {
          alert("닉네임은 문자, 숫자로만 이루어져야 합니다.");
          return;
        }

        params = {
          name: word,
        };
        break;

      default:
        alert("검색 카테고리를 설정해주세요.");
        return;
    }

    this.setState({
      filterType: FILTER_TYPE.ALL,
      filterValue: "",
      orderType: ORDER_TYPE.NO,
      orderOption: ORDER_OPTION.ASC,
      endPage: 0,
      searchFlag: true,
    });

    this.requestSearchUserApi(params);
  }

  onDropMenuClickCallback(selectedDropMenu) {
    this.selectedDropMenu = selectedDropMenu;
  }

  onOrderMenuClickCallback(newOrderType, newOrderOption) {
    this.setState({
      filterType: this.state.filterType,
      filterValue: this.state.filterValue,
      orderType: newOrderType,
      orderOption: newOrderOption,
      startPage: 1,
      endPage: 0,
      searchFlag: false,
    });
    this.numOfCurrentPage = 1;

    let params = {
      filterType: this.state.filterType,
      filterValue: this.state.filterValue,
      orderType: newOrderType,
      orderOption: newOrderOption,
    };

    this.requestUserApi(params);
  }

  onFilterMenuClickCallback(newFilterType, newFilterValue) {
    this.setState({
      filterType: newFilterType,
      filterValue: newFilterValue,
      orderType: this.state.orderType,
      orderOption: this.state.orderOption,
      startPage: 1,
      endPage: 0,
      searchFlag: false,
    });
    this.numOfCurrentPage = 1;

    let params = {
      filterType: newFilterType,
      filterValue: newFilterValue,
      orderType: this.state.orderType,
      orderOption: this.state.orderOption,
    };

    this.requestUserApi(params);
  }

  onWarnningBtnClickCallback() {
    let checkedNodes = this.getCheckedNodes();

    if (checkedNodes.length > 0) {
      checkedNodes.forEach((e) => {
        let params = {
          state: USER_STATE.WARRNING,
        };
        let pathVariables = {
          userId: e.value,
        };

        this.requestChangeUserStateApi(params, pathVariables);
      });
    }
  }

  onForbiddenBtnClickCallback() {
    let checkedNodes = this.getCheckedNodes();

    if (checkedNodes.length > 0) {
      checkedNodes.forEach((e) => {
        let params = {
          state: USER_STATE.FORBIDDEN,
        };
        let pathVariables = {
          userId: e.value,
        };

        this.requestChangeUserStateApi(params, pathVariables);
      });
    }
  }

  onRecoveryBtnClickCallback() {
    let checkedNodes = this.getCheckedNodes();

    if (checkedNodes.length > 0) {
      checkedNodes.forEach((e) => {
        let params = {
          state: USER_STATE.NORMAL,
        };
        let pathVariables = {
          userId: e.value,
        };

        this.requestChangeUserStateApi(params, pathVariables);
      });
    }
  }

  getCheckedNodes() {
    let checkBoxNodes = document.querySelectorAll(".kohub-table-check");
    let checkedNodes = Object.values(checkBoxNodes).filter((checkBox) => {
      if (checkBox.checked === true) {
        return checkBox;
      }
    });

    return checkedNodes;
  }

  render() {
    let heads = this.state.table.heads;
    let datas = this.state.table.datas;
    let {
      startPage,
      endPage,
      totalUserCount,
      normalCount,
      warnningCount,
      forbiddenCount,
    } = this.state;

    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
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
                <div className="kohub-admin-header__filter">
                  <DropMenu
                    value={"필터"}
                    menus={this.filterMenuList}
                    onDropMenuClick={this.onFilterMenuClickCallback.bind(this)}
                  ></DropMenu>
                </div>
                <div className="kohub-admin-header__align">
                  <DropMenu
                    value={"정렬"}
                    menus={this.alignMenuList}
                    onDropMenuClick={this.onOrderMenuClickCallback.bind(this)}
                  ></DropMenu>
                </div>
              </div>
            </header>
            <Table
              heads={heads}
              datas={datas}
              checked={true}
              colgroupDatas={this.colgroupDatas}
            ></Table>
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
      </div>
    );
  }
}

export default Account;
