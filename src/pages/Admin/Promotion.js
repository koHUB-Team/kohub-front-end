import React, { Component } from "react";
import "./Promotion.scss";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import { Table, DropMenu, Button, Pagination } from "../../components";
import { Record, List } from "immutable";
import { MODE } from "../../store";
import PromotionWrite from "./PromotionWrite";

const PromotionData = Record({
  id: null,
  email: "",
  name: "",
  period: "",
  state: "",
  createDate: "",
  modifyDate: "",
});

const TableData = Record({
  heads: List([
    "No",
    "Email",
    "Name",
    "Period",
    "State",
    "CreateDate",
    "ModifyDate",
  ]),
  datas: List([
    PromotionData({
      id: 1,
      email: "test@test.com",
      name: "김사라",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 2,
      email: "test@test.com",
      name: "펭수",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 3,
      email: "test@test.com",
      name: "뚱이",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 4,
      email: "test@test.com",
      name: "징징이",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 5,
      email: "test@test.com",
      name: "스폰지밥",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 6,
      email: "test@test.com",
      name: "집게사장",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 7,
      email: "test@test.com",
      name: "다람이",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 8,
      email: "test@test.com",
      name: "핑핑이",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 9,
      email: "test@test.com",
      name: "콩콩이",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
    PromotionData({
      id: 10,
      email: "test@test.com",
      name: "캉캉이",
      period: "2020.00.00~2020.00.00",
      state: "홍보중",
      createDate: "2020.00.00",
      modifyDate: "2020.00.00",
    }),
  ]),
});

const DropMenuData = Record({
  menu: "",
  menuType: "",
  menuValue: "",
});

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData(),
    };
    this.alignMenus = List([
      DropMenuData({
        menu: "번호",
        menuType: "",
        menuValue: "",
      }),
      DropMenuData({
        menu: "신청 날짜",
        menuType: "",
        menuValue: "",
      }),
      DropMenuData({
        menu: "수정 날짜",
        menuType: "",
        menuValue: "",
      }),
      DropMenuData({
        menu: "홍보 날짜",
        menuType: "",
        menuValue: "",
      }),
    ]);
    this.filterMenus = List([
      DropMenuData({
        menu: "모든계정",
        menuType: "",
        menuValue: "",
      }),
      DropMenuData({
        menu: "홍보중",
        menuType: "",
        menuValue: "",
      }),
      DropMenuData({
        menu: "홍보종료",
        menuType: "",
        menuValue: "",
      }),
    ]);
  }

  onWriteBtnClickCallback() {
    console.log("write!!");
    let { onWriteBtnClick } = this.props;
    if (onWriteBtnClick !== undefined) {
      onWriteBtnClick();
    }
  }

  getReadPage() {
    let { table } = this.state;

    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <header className="kohub-admin-header">
              <div className="kohub-admin-header-area">
                <AdminTitleContainer></AdminTitleContainer>
                <div className="kohub-admin-header__filter">
                  <DropMenu
                    value={"필터"}
                    menus={this.filterMenus}
                    // onDropMenuClick={this.onFilterMenuClickCallback.bind(this)}
                  ></DropMenu>
                </div>
                <div className="kohub-admin-header__align">
                  <DropMenu
                    value={"정렬"}
                    menus={this.alignMenus}
                    // onDropMenuClick={this.onOrderMenuClickCallback.bind(this)}
                  ></DropMenu>
                </div>
              </div>
            </header>
            <Table
              heads={table.heads}
              datas={table.datas}
              checked={false}
            ></Table>
            <div className="kohub-admin-control__btn">
              <Button
                value={"등록"}
                onClick={this.onWriteBtnClickCallback.bind(this)}
              ></Button>
              <Button
                value={"내용"}
                // onClick={this.onForbiddenBtnClickCallback.bind(this)}
              ></Button>
              <Button
                value={"수정"}
                // onClick={this.onRecoveryBtnClickCallback.bind(this)}
              ></Button>
              <Button
                value={"시작"}
                // onClick={this.onRecoveryBtnClickCallback.bind(this)}
              ></Button>
              <Button
                value={"종료"}
                // onClick={this.onRecoveryBtnClickCallback.bind(this)}
              ></Button>
            </div>
            <div className="kohub-admin-content__bottom-area">
              <Pagination
                start={1}
                end={5}
                // onPrevBtnClick={this.onPrevBtnClickCallback.bind(this)}
                // onNextBtnClick={this.onNextBtnClickCallback.bind(this)}
                // onPageBtnClick={this.onPageBtnClickCallback.bind(this)}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getWritePage() {
    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <PromotionWrite></PromotionWrite>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { mode } = this.props;
    console.log(mode);

    let page;
    switch (mode) {
      case MODE.READ:
        page = this.getReadPage();
        break;
      case MODE.CREATE:
        page = this.getWritePage();
        break;
    }

    return page;
  }
}

export default Promotion;
