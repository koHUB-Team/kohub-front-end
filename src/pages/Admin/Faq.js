import React, { Component } from "react";
import { Table, Pagination, Button, ModalPopup } from "../../components";
import { AdminTitleContainer, AdminNavContainer } from "../../containers";
import { Record, List } from "immutable";
import "./Faq.scss";
import { ApiUtil } from "../../common/kohubUtil";
import moment from "moment";

const FaqData = Record({
  id: null,
  title: "",
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

const ModalData = Record({
  isShow: false,
  title: "",
  content: "",
});

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData({
        heads: List(["No", "FAQ", "CreateDate", "ModifyDate"]),
        datas: List(),
      }),
      modal: ModalData({
        isShow: false,
        title: "",
        content: "",
      }),
      startPage: 1,
      endPage: 0,
      totalFaqCount: 0,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_TABLE_ROW = 5;
    this.numOfCurrentPage = 1;
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
    ]);
  }

  componentDidMount() {
    this.requestGetFaqsApi();
  }

  requestGetFaqsApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_FAQS;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let faqs = json.faqs;
        let totalFaqCount = json.totalFaqCount;
        this.faqGetApiHandler(faqs, totalFaqCount);
      })
      .catch((err) => {
        new Error("FAQ Error");
      });
  }

  faqGetApiHandler(faqs, newTotalFaqCount) {
    let { table } = this.state;
    let newFaqDatas = this.parseFaqDatas(faqs);
    let newTable = table.set("datas", newFaqDatas);

    let { endPage } = this.state;
    let newEndPage;
    if (endPage === 0) {
      newEndPage = this.calculateEndPage(newTotalFaqCount);
    } else {
      newEndPage = endPage;
    }

    this.setState({
      table: newTable,
      totalFaqCount: newTotalFaqCount,
      endPage: newEndPage,
    });
  }

  parseFaqDatas(faqs) {
    let newFaqDatas = faqs.reduce((acc, data, idx) => {
      return acc.set(
        idx,
        new FaqData({
          id: data.id,
          title: data.title,
          createDate: moment(data.createDate).format("YYYY.MM.DD"),
          modifyDate: moment(data.modifyDate).format("YYYY.MM.DD"),
        })
      );
    }, List());

    return newFaqDatas;
  }

  calculateEndPage(newTotalFaqCount) {
    let newEndPage = Math.ceil(newTotalFaqCount / 5);
    if (newEndPage > this.MAX_NUM_OF_PAGE_BTN) {
      newEndPage = this.MAX_NUM_OF_PAGE_BTN;
    }

    return newEndPage;
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
      this.requestGetFaqsApi(params);
    }
  }

  onNextBtnClickCallback() {
    let { startPage, endPage, totalFaqCount } = this.state;
    let maxPage = Math.ceil(totalFaqCount / this.MAX_NUM_OF_TABLE_ROW);

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
      this.requestGetFaqsApi(params);
    }
  }

  onPageBtnClickCallback(pageNum) {
    this.numOfCurrentPage = pageNum;
    let params = {
      start: (pageNum - 1) * this.MAX_NUM_OF_TABLE_ROW,
    };
    this.requestGetFaqsApi(params);
  }

  onWriteBtnClickCallback() {
    let { history } = this.props;
    history.push(`/admin/faq_write`);
  }

  onUpdateBtnClickCallback(e) {
    let checkedNodes = this.getCheckedNodes();

    if (checkedNodes.length === 0) {
      alert("수정할 FAQ 정보를 체크하세요!");
      return;
    } else if (checkedNodes.length > 1) {
      alert("수정할 FAQ 정보는 하나만 체크해주세요!");
      return;
    }

    let { history } = this.props;
    let faqId = checkedNodes[0].value;
    history.push(`/admin/faq_write?id=${faqId}`);
  }

  onDeleteBtnClickCallback() {
    let checkedNodes = this.getCheckedNodes();
    if (checkedNodes.length === 0) {
      alert("삭제할 홍보 정보를 체크하세요!");
      return;
    } else if (checkedNodes.length > 1) {
      alert("삭제할 FAQ 정보는 하나만 체크해주세요!");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      let id = checkedNodes[0].value;
      let pathVariables = {
        faqId: id,
      };

      this.requestDeleteFaqApi(pathVariables);
    }
  }

  requestDeleteFaqApi(pathVariables = null) {
    if (pathVariables === null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_DELETE_FAQ;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrer: "no-referrer",
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        alert("FAQ가 삭제되었습니다.");
        this.faqDeleteApiHandler();
      })
      .catch((err) => {
        alert("FAQ를 삭제하는데 문제가 발생하였습니다.");
      });
  }

  faqDeleteApiHandler() {
    let { totalFaqCount } = this.state;
    let maxPage = Math.ceil((totalFaqCount - 1) / this.MAX_NUM_OF_TABLE_ROW);

    if (maxPage < this.numOfCurrentPage) {
      let newEndPage = maxPage;
      let newStartPage =
        1 +
        this.MAX_NUM_OF_PAGE_BTN *
          (Math.ceil(newEndPage / this.MAX_NUM_OF_PAGE_BTN) - 1);

      this.numOfCurrentPage = this.numOfCurrentPage - 1;

      this.setState({
        startPage: newStartPage,
        endPage: newEndPage,
      });
    }

    let params = {
      start: (this.numOfCurrentPage - 1) * this.MAX_NUM_OF_TABLE_ROW,
    };
    this.requestGetFaqsApi(params);
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

  requestGetFaqDetailApi(pathVariables = null) {
    if (pathVariables === null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_FAQ;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        this.faqDetailGetApiHandler(json);
      })
      .catch((err) => {
        new Error("Faq API Error");
      });
  }

  faqDetailGetApiHandler(faqData) {
    let { modal } = this.state;
    let newModal = modal.set("isShow", true);
    newModal = newModal.set("title", faqData.title);
    newModal = newModal.set("content", faqData.answer);

    this.setState({
      modal: newModal,
    });
  }

  onTableRowClickCallback(dataId) {
    let pathVariables = {
      faqId: dataId,
    };
    this.requestGetFaqDetailApi(pathVariables);
  }

  onCloseModalPopupCallback() {
    let { modal } = this.state;
    let newModal = modal.set("isShow", false);

    this.setState({
      modal: newModal,
    });
  }

  render() {
    let { table, totalFaqCount, startPage, endPage, modal } = this.state;

    return (
      <div className="kohub-admin-container">
        <AdminNavContainer></AdminNavContainer>
        <div className="kohub-admin-content-container">
          <div className="kohub-admin-content-area">
            <header className="kohub-admin-header">
              <div className="kohub-admin-header-area">
                <AdminTitleContainer></AdminTitleContainer>
                <div className="kohub-admin-header__info">
                  <span>총질문수:{totalFaqCount}</span>
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
              image={false}
              onClosePopup={this.onCloseModalPopupCallback.bind(this)}
            ></ModalPopup>
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
