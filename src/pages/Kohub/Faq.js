import React, { Component } from "react";
import "./Faq.scss";
import {
  Header,
  Footer,
  BoardHeader,
  Sidebar,
  Pagination,
} from "../../components";
import { Record, List } from "immutable";
import { DomUtil, ApiUtil } from "../../common/kohubUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const FaqData = Record({
  id: null,
  title: "",
  answer: "",
});

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: List([]),
      startPage: 1,
      endPage: 0,
      totalFaqCount: 0,
    };
    this.MAX_NUM_OF_PAGE_BTN = 5;
    this.MIN_PAGE_NUM = 1;
    this.MAX_NUM_OF_ROW = 5;
    this.numOfCurrentPage = null;
  }

  componentDidMount() {
    this.requestFaqApi();
  }

  requestFaqApi(params = null) {
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
        this.faqApiHandler(faqs, totalFaqCount);
      })
      .catch((err) => {
        new Error("FAQ Error");
      });
  }

  faqApiHandler(faqDatas, totalFaqCount) {
    let newDatas = List([]);
    Object.values(faqDatas).forEach((faqData, idx) => {
      newDatas = newDatas.set(
        idx,
        FaqData({
          id: faqData.id,
          title: faqData.title,
          answer: faqData.answer,
        })
      );
    });

    let { endPage } = this.state;
    let newEndPage;
    if (endPage === 0) {
      newEndPage = Math.ceil(totalFaqCount / 5);
      if (newEndPage > this.MAX_NUM_OF_PAGE_BTN) {
        newEndPage = this.MAX_NUM_OF_PAGE_BTN;
      }
    } else {
      newEndPage = endPage;
    }
    this.setState({
      datas: newDatas,
      totalFaqCount: totalFaqCount,
      endPage: newEndPage,
    });
  }

  getDataList() {
    let { datas } = this.state;

    let dataList = datas.reduce((acc, data, idx) => {
      return acc.concat([
        <div key={idx}>
          <button data-id={data.id} className="accordion">
            {data.title}
            <span>
              <FontAwesomeIcon icon={faAngleDown} flip="horizontal" />
            </span>
          </button>
          <div className="panel hide">
            <p>{data.answer}</p>
          </div>
        </div>,
      ]);
    }, []);

    return dataList;
  }

  onAccordionBtnClickListener(e) {
    let isEventTarget = false;
    let panel;
    let spanNode;
    let buttonNode;
    let svgNode;
    let pathNode;
    switch (e.target.tagName.toLowerCase()) {
      case "button":
        buttonNode = e.target;
        panel = buttonNode.nextElementSibling;

        isEventTarget = true;
        break;
      case "span":
        spanNode = e.target;
        buttonNode = spanNode.parentElement;
        panel = buttonNode.nextElementSibling;

        isEventTarget = true;
        break;
      case "svg":
        svgNode = e.target;
        spanNode = svgNode.parentElement;
        buttonNode = spanNode.parentElement;
        panel = buttonNode.nextElementSibling;

        isEventTarget = true;
        break;
      case "path":
        pathNode = e.target;
        svgNode = pathNode.parentElement;
        spanNode = svgNode.parentElement;
        buttonNode = spanNode.parentElement;
        panel = buttonNode.nextElementSibling;

        isEventTarget = true;
        break;
      default:
        break;
    }

    if (isEventTarget) {
      if (DomUtil.hasClassByClassName(panel, "hide")) {
        this.showPanel(panel);
      } else {
        this.hidePanel(panel);
      }
    }
  }

  hidePanel(panel) {
    panel.classList.add("hide");
  }

  showPanel(panel) {
    panel.classList.remove("hide");
  }

  initiatePanel() {
    let panelNodes = document.querySelectorAll(".panel");
    panelNodes.forEach((panelNode) => {
      if (!DomUtil.hasClassByClassName(panelNode, "hide")) {
        this.hidePanel(panelNode);
      }
    });
  }

  onPageBtnClickCallback(pageNum) {
    this.initiatePanel();

    this.numOfCurrentPage = pageNum;
    let params = {
      start: (pageNum - 1) * this.MAX_NUM_OF_ROW,
    };
    this.requestFaqApi(params);
  }

  onNextBtnClickCallback() {
    this.initiatePanel();

    let { startPage, endPage, totalFaqCount } = this.state;
    let maxPage = Math.ceil(totalFaqCount / 5);

    if (endPage < maxPage) {
      let newStartPage = startPage + this.MAX_NUM_OF_PAGE_BTN;
      let newEndPage = endPage + this.MAX_NUM_OF_PAGE_BTN;
      if (newEndPage > maxPage) {
        newEndPage = maxPage;
      }
      console.log(newStartPage);

      this.setState({
        startPage: newStartPage,
        endPage: newEndPage,
      });

      this.numOfCurrentPage = newStartPage;

      let params = {
        start: (newStartPage - 1) * this.MAX_NUM_OF_ROW,
      };
      this.requestFaqApi(params);
    }
  }

  onPrevBtnClickCallback() {
    this.initiatePanel();

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
        start: (newStartPage - 1) * this.MAX_NUM_OF_ROW,
      };

      this.requestFaqApi(params);
    }
  }

  render() {
    let dataList = this.getDataList();
    let { startPage, endPage } = this.state;
    return (
      <div>
        <Header></Header>
        <div className="container">
          <div className="content-area kohub-faq">
            <Sidebar></Sidebar>
            <div className="kohub-faq__content">
              <BoardHeader value={"FAQ"}></BoardHeader>
              <div
                className="kohub-faq-accordion"
                onClick={this.onAccordionBtnClickListener.bind(this)}
              >
                {dataList}
              </div>
              <div className="kohub-faq-content__bottom-area">
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
export default Faq;
