import React, { Component } from "react";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import {
  Table,
  DropMenu,
  Button,
  Pagination,
  ModalPopup,
} from "../../components";
import { Record, List } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";
import Moment from "moment";
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

const PROMOTION_STATE = Record({
  WAITING: "WAITING",
  PROMOTING: "PROMOTING",
})();

const ORDER_TYPE = Record({
  NO: "NO",
  CREATE_DATE: "CREATE_DATE",
  MODIFY_DATE: "MODIFY_DATE",
  START_DATE: "START_DATE",
})();

const ORDER_OPTION = Record({
  ASC: "ASC",
  DESC: "DESC",
})();

const FILTER_TYPE = Record({
  ALL: "ALL",
  STATE: "STATE",
})();

const ModalData = Record({
  isShow: false,
  title: "",
  content: "",
  imageUrl: "",
});

class PromotionRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData(),
      totalCount: 0,
      startPage: 1,
      endPage: 0,
      totalPromotionCount: 0,
      promotingCount: 0,
      waitingCount: 0,
      orderType: ORDER_TYPE.NO,
      orderOption: ORDER_OPTION.ASC,
      filterType: FILTER_TYPE.ALL,
      filterValue: "",
      modal: ModalData(),
    };
    this.MAX_NUM_OF_TABLE_ROW = 10;
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.numOfCurrentPage = 1;
    this.alignMenus = List([
      DropMenuData({
        menu: "번호",
        menuType: ORDER_TYPE.NO,
        menuValue: ORDER_OPTION.ASC,
      }),
      DropMenuData({
        menu: "신청 날짜",
        menuType: ORDER_TYPE.CREATE_DATE,
        menuValue: ORDER_OPTION.DESC,
      }),
      DropMenuData({
        menu: "수정 날짜",
        menuType: ORDER_TYPE.MODIFY_DATE,
        menuValue: ORDER_OPTION.DESC,
      }),
      DropMenuData({
        menu: "홍보 날짜",
        menuType: ORDER_TYPE.START_DATE,
        menuValue: ORDER_OPTION.DESC,
      }),
    ]);
    this.filterMenus = List([
      DropMenuData({
        menu: "모든신청",
        menuType: FILTER_TYPE.ALL,
        menuValue: "",
      }),
      DropMenuData({
        menu: "홍보중",
        menuType: FILTER_TYPE.STATE,
        menuValue: PROMOTION_STATE.PROMOTING,
      }),
      DropMenuData({
        menu: "홍보대기중",
        menuType: FILTER_TYPE.STATE,
        menuValue: PROMOTION_STATE.WAITING,
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
        let totalCount = json.totalCount;
        let totalPromotionCount = json.totalPromotionCount;
        let promotingCount = json.totalPromotingCount;
        let waitingCount = json.totalWaitingCount;
        this.promotionApiHandler(
          promotionDatas,
          totalCount,
          totalPromotionCount,
          promotingCount,
          waitingCount
        );
      })
      .catch((err) => {
        new Error("Promotion API Error");
      });
  }

  requestChangePromotionStateApi(params = null, pathVariables = null) {
    if (params == null || pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_PUT_ADMIN_PROMOTION_STATE;
    url = ApiUtil.bindPathVariable(url, pathVariables);

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
        alert("홍보 상태가 변경되었습니다.");
        let params = {
          start: (this.numOfCurrentPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
          orderType: this.state.orderType,
          orderOption: this.state.orderOption,
          filterType: this.state.filterType,
          filterValue: this.state.filterValue,
        };
        this.requestPromotionApi(params);
      })
      .catch((err) => {
        alert("홍보 상태를 변경하는데 문제가 발생하였습니다.");
      });
  }

  requestDeletePromotionApi(pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_DELETE_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      referrer: "no-referrer",
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("홍보가 삭제되었습니다.");
        let params = {
          start: (this.numOfCurrentPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
          orderType: this.state.orderType,
          orderOption: this.state.orderOption,
          filterType: this.state.filterType,
          filterValue: this.state.filterValue,
        };
        this.requestPromotionApi(params);
      })
      .catch((err) => {
        alert("홍보를 삭제하는데 문제가 발생하였습니다.");
      });
  }

  promotionApiHandler(
    promotionDatas,
    newTotalCount,
    newTotalPromotionCount,
    newPromotingCount,
    newWaitingCount
  ) {
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
        period: `${Moment(promotionData.startDate).format(
          "YYYY.MM.DD"
        )}~${Moment(promotionData.endDate).format("YYYY.MM.DD")}`,
        state: promotionData.state === "waiting" ? "홍보대기중" : "홍보중",
        createDate: promotionData.createDate,
        modifyDate: promotionData.modifyDate,
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
      endPage: newEndPage,
      totalCount: newTotalCount,
      totalPromotionCount: newTotalPromotionCount,
      promotingCount: newPromotingCount,
      waitingCount: newWaitingCount,
    });
  }

  calculateMaxPage(totalCount) {
    return Math.ceil(totalCount / 10);
  }

  onWriteBtnClickCallback() {
    let { onWriteBtnClick } = this.props;
    if (onWriteBtnClick !== undefined) {
      onWriteBtnClick();
    }
  }

  onUpdateBtnClickCallback() {
    let { onUpdateBtnClick } = this.props;
    let checkedNodes = this.getCheckedNodes();

    if (checkedNodes.length === 0) {
      alert("수정할 홍보 정보를 체크하세요!");
      return;
    } else if (checkedNodes.length > 1) {
      alert("수정할 홍보 정보는 하나만 체크해주세요!");
      return;
    }

    let promotionId = checkedNodes[0].value;
    if (onUpdateBtnClick !== undefined) {
      onUpdateBtnClick(promotionId);
    }
  }

  onPrevBtnClickCallback(e) {
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
        orderType: this.state.orderType,
        orderOption: this.state.orderOption,
        filterType: this.state.filterType,
        filterValue: this.state.filterValue,
      };
      this.requestPromotionApi(params);
    }
  }

  onNextBtnClickCallback(e) {
    let { startPage, endPage, totalCount } = this.state;
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
        orderType: this.state.orderType,
        orderOption: this.state.orderOption,
        filterType: this.state.filterType,
        filterValue: this.state.filterValue,
      };
      this.requestPromotionApi(params);
    }
  }

  onPageBtnClickCallback(pageNum) {
    this.numOfCurrentPage = pageNum;
    let params = {
      start: (pageNum - 1) * this.MAX_NUM_OF_TABLE_ROW,
      orderType: this.state.orderType,
      orderOption: this.state.orderOption,
      filterType: this.state.filterType,
      filterValue: this.state.filterValue,
    };
    this.requestPromotionApi(params);
  }

  onPromotionStartClickCallback() {
    let checkedNodes = this.getCheckedNodes();
    if (checkedNodes.length > 0) {
      checkedNodes.forEach((e) => {
        let params = {
          state: PROMOTION_STATE.PROMOTING,
        };
        let pathVariables = {
          promotionId: e.value,
        };

        this.requestChangePromotionStateApi(params, pathVariables);
      });
    }
  }

  onPromotionStopClickCallback() {
    let checkedNodes = this.getCheckedNodes();
    if (checkedNodes.length > 0) {
      checkedNodes.forEach((e) => {
        let params = {
          state: PROMOTION_STATE.WAITING,
        };
        let pathVariables = {
          promotionId: e.value,
        };

        this.requestChangePromotionStateApi(params, pathVariables);
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

  onOrderMenuClickCallback(newOrderType, newOrderOption) {
    this.setState({
      filterType: this.state.filterType,
      filterValue: this.state.filterValue,
      orderType: newOrderType,
      orderOption: newOrderOption,
      startPage: 1,
      endPage: 0,
    });
    this.numOfCurrentPage = 1;

    let params = {
      filterType: this.state.filterType,
      filterValue: this.state.filterValue,
      orderType: newOrderType,
      orderOption: newOrderOption,
    };

    this.requestPromotionApi(params);
  }

  onFilterMenuClickCallback(newFilterType, newFilterValue) {
    this.setState({
      filterType: newFilterType,
      filterValue: newFilterValue,
      orderType: this.state.orderType,
      orderOption: this.state.orderOption,
      startPage: 1,
      endPage: 0,
    });
    this.numOfCurrentPage = 1;

    let params = {
      filterType: newFilterType,
      filterValue: newFilterValue,
      orderType: this.state.orderType,
      orderOption: this.state.orderOption,
    };

    this.requestPromotionApi(params);
  }

  onDeleteBtnClickCallback() {
    let checkedNodes = this.getCheckedNodes();

    if (checkedNodes.length > 0) {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        checkedNodes.forEach((e) => {
          let pathVariables = {
            promotionId: e.value,
          };

          this.requestDeletePromotionApi(pathVariables);
        });
      }
    }
  }

  requestGetPromotionDetailApi(pathVariables = null) {
    if (pathVariables === null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let promotionData = json.promotions[0];
        let promotionImages = json.promotionImages;
        this.promotionDetailApiHandler(promotionData, promotionImages);
      })
      .catch((err) => {
        new Error("Promotion API Error");
      });
  }

  promotionDetailApiHandler(promotionData, promotionImages) {
    let { modal } = this.state;
    let newModal = modal.set("title", promotionData.title);
    newModal = newModal.set("content", promotionData.content);

    this.setState({
      modal: newModal,
    });

    let mainImage = promotionImages.filter((image) => {
      if (image.type === "ma") {
        return image;
      }
    })[0];

    let pathVariables = {
      promotionImageId: mainImage.id,
    };
    this.requestDownloadPromotionImageApi(pathVariables);
  }

  requestDownloadPromotionImageApi(pathVariables = null) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_DOWNLOAD_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.blob();
      })
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        this.downloadImageHandler(objectURL);
      })
      .catch((err) => {
        new Error("Promotion Image Api Error!");
      });
  }

  downloadImageHandler(promotionImageUrl) {
    let { modal } = this.state;
    let newModal = modal.set("imageUrl", promotionImageUrl);
    newModal = newModal.set("isShow", true);

    this.setState({
      modal: newModal,
    });
  }

  onTableRowClickCallback(dataId) {
    console.log("table Click!!");
    let pathVariables = {
      promotionId: dataId,
    };
    this.requestGetPromotionDetailApi(pathVariables);
  }

  onCloseModalPopupCallback() {
    let { modal } = this.state;
    let newModal = modal.set("isShow", false);

    this.setState({
      modal: newModal,
    });
  }

  render() {
    let {
      table,
      startPage,
      endPage,
      totalPromotionCount,
      promotingCount,
      waitingCount,
      modal,
    } = this.state;

    return (
      <div>
        <header className="kohub-admin-header">
          <div className="kohub-admin-header-area">
            <AdminTitleContainer></AdminTitleContainer>
            <div className="kohub-admin-header__info">
              <span>총신청수:{totalPromotionCount}</span>
              <span>홍보중:{promotingCount}</span>
              <span>홍보대기중:{waitingCount}</span>
            </div>
            <div className="kohub-admin-header__filter">
              <DropMenu
                value={"필터"}
                menus={this.filterMenus}
                onDropMenuClick={this.onFilterMenuClickCallback.bind(this)}
              ></DropMenu>
            </div>
            <div className="kohub-admin-header__align">
              <DropMenu
                value={"정렬"}
                menus={this.alignMenus}
                onDropMenuClick={this.onOrderMenuClickCallback.bind(this)}
              ></DropMenu>
            </div>
          </div>
        </header>
        <Table
          heads={table.heads}
          datas={table.datas}
          checked={true}
          colgroupDatas={this.colgroupDatas}
          onTableRowClick={this.onTableRowClickCallback.bind(this)}
        ></Table>
        <div className="kohub-admin-control__btn">
          <Button
            value={"등록"}
            onClick={this.onWriteBtnClickCallback.bind(this)}
          ></Button>
          <Button
            value={"수정"}
            onClick={this.onUpdateBtnClickCallback.bind(this)}
          ></Button>
          <Button
            value={"시작"}
            onClick={this.onPromotionStartClickCallback.bind(this)}
          ></Button>
          <Button
            value={"종료"}
            onClick={this.onPromotionStopClickCallback.bind(this)}
          ></Button>
          <Button
            value={"삭제"}
            onClick={this.onDeleteBtnClickCallback.bind(this)}
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
        <ModalPopup
          isShow={modal.isShow}
          title={modal.title}
          content={modal.content}
          imageUrl={modal.imageUrl}
          onClosePopup={this.onCloseModalPopupCallback.bind(this)}
        ></ModalPopup>
      </div>
    );
  }
}

export default PromotionRead;
