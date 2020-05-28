import React, { Component } from "react";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import { Table, DropMenu, Button, Pagination } from "../../components";
import { Record, List } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";
import "./PromotionRead.scss";

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
  datas: List(),
});

const DropMenuData = Record({
  menu: "",
  menuType: "",
  menuValue: "",
});

const ColgroupData = Record({
  span: 0,
  class: "",
});

class PromotionRead extends Component {
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
    this.colgroupDatas = List([
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-promotion-board-col",
      }),
    ]);
  }

  componentDidMount() {
    this.requestPromotionApi();
  }

  requestPromotionApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_PROMOTIONS;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let promotionDatas = json.promotions;
        this.promotionApiHandler(promotionDatas);
      })
      .catch((err) => {
        new Error("Promotion API Error");
      });
  }

  promotionApiHandler(promotionDatas) {
    let newHeads = List([
      "No",
      "Email",
      "Name",
      "Period",
      "State",
      "CreateDate",
      "ModifyDate",
    ]);

    let newDatas = List(promotionDatas).map((promotionData) => {
      return PromotionData({
        id: promotionData.id,
        email: promotionData.email,
        name: promotionData.userName,
        period: "2020.00.00~2020.00.00",
        state: promotionData.state === "waiting" ? "홍보대기중" : "홍보중",
        createDate: promotionData.createDate,
        modifyDate: promotionData.modifyDate,
      });
    });

    let newTableData = TableData({
      heads: newHeads,
      datas: newDatas,
    });

    this.setState({
      table: newTableData,
    });
  }

  onWriteBtnClickCallback() {
    console.log("write!!");
    let { onWriteBtnClick } = this.props;
    if (onWriteBtnClick !== undefined) {
      onWriteBtnClick();
    }
  }

  render() {
    let { table } = this.state;

    return (
      <div>
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
          checked={true}
          colgroupDatas={this.colgroupDatas}
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
    );
  }
}

export default PromotionRead;
