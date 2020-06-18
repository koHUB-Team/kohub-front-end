import React, { Component } from "react";
import { Table, Pagination, Button } from "../../components";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import { Record, List } from "immutable";
import "./Faq.scss";

const FaqData = Record({
  id: null,
  title: "",
  answer: "",
  createDate: "",
  modifyDate: "",
});

const TableData = Record({
  heads: List(["No", "FAQ", "Answer", "CreateDate", "ModifyDate"]),
  datas: List(),
});

const ColgroupData = Record({
  span: 0,
  class: "",
});

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData({
        heads: List(["No", "FAQ", "Answer", "CreateDate", "ModifyDate"]),
        datas: List([
          FaqData({
            id: 1,
            title: "Sample 질문입니다.",
            answer: "Sample 답변입니다.",
            createDate: "0000.00.00",
            modifyDate: "0000.00.00",
          }),
          FaqData({
            id: 2,
            title: "Sample 질문입니다.",
            answer: "Sample 답변입니다.",
            createDate: "0000.00.00",
            modifyDate: "0000.00.00",
          }),
          FaqData({
            id: 3,
            title: "Sample 질문입니다.",
            answer: "Sample 답변입니다.",
            createDate: "0000.00.00",
            modifyDate: "0000.00.00",
          }),
          FaqData({
            id: 4,
            title:
              "Sample 질문입니다.Sample 질문입니다.Sample 질문입니다.Sample 질문입니다.Sample 질문입니다.Sample 질문입니다.",
            answer:
              "Sample 답변입니다.Sample 답변입니다.Sample 답변입니다.Sample 답변입니다.Sample 답변입니다.Sample 답변입니다.",
            createDate: "0000.00.00",
            modifyDate: "0000.00.00",
          }),
          FaqData({
            id: 5,
            title: "Sample 질문입니다.",
            answer: "Sample 답변입니다.",
            createDate: "0000.00.00",
            modifyDate: "0000.00.00",
          }),
        ]),
      }),
    };
    this.colgroupDatas = List([
      ColgroupData({
        span: 1,
        class: "kohub-faq-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-faq-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-faq-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-faq-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-faq-board-col",
      }),
      ColgroupData({
        span: 1,
        class: "kohub-faq-board-col",
      }),
    ]);
  }

  onTableRowClickCallback(dataId) {
    // let pathVariables = {
    //   promotionId: dataId,
    // };
    // this.requestGetPromotionDetailApi(pathVariables);
  }

  render() {
    let { table } = this.state;

    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <header className="kohub-admin-header">
              <div className="kohub-admin-header-area">
                <AdminTitleContainer></AdminTitleContainer>
                <div className="kohub-admin-header__info">
                  <span>총질문수:{0}</span>
                </div>
                {/* <div className="kohub-admin-header__filter"> */}
                {/* <DropMenu
          value={"필터"}
          menus={this.filterMenus}
          onDropMenuClick={this.onFilterMenuClickCallback.bind(this)}
        ></DropMenu> */}
                {/* </div> */}
                {/* <div className="kohub-admin-header__align">
        <DropMenu
          value={"정렬"}
          menus={this.alignMenus}
          onDropMenuClick={this.onOrderMenuClickCallback.bind(this)}
        ></DropMenu>
      </div>  */}
              </div>
            </header>
            <Table
              heads={table.heads}
              datas={table.datas}
              checked={true}
              colgroupDatas={this.colgroupDatas}
              //   onTableRowClick={this.onTableRowClickCallback.bind(this)}
            ></Table>
            <div className="kohub-admin-control__btn">
              <Button
                value={"등록"}
                //   onClick={this.onWriteBtnClickCallback.bind(this)}
              ></Button>
              <Button
                value={"수정"}
                //   onClick={this.onUpdateBtnClickCallback.bind(this)}
              ></Button>
              <Button
                value={"삭제"}
                //   onClick={this.onDeleteBtnClickCallback.bind(this)}
              ></Button>
            </div>
            <div className="kohub-admin-content__bottom-area">
              <Pagination
                start={1}
                end={5}
                //   onPrevBtnClick={this.onPrevBtnClickCallback.bind(this)}
                //   onNextBtnClick={this.onNextBtnClickCallback.bind(this)}
                //   onPageBtnClick={this.onPageBtnClickCallback.bind(this)}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
