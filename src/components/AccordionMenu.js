import React, { Component } from "react";
import { DomUtil } from "../common/kohubUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./AccordionMenu.scss";

class AccordionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDataList() {
    let { datas } = this.props;
    let dataList = [];

    if (datas !== undefined && datas.size > 0) {
      dataList = datas.reduce((acc, data, idx) => {
        return acc.concat([
          <li key={idx}>
            <div
              data-id={data.id}
              className="accordion"
              onClick={this.onAccordionBtnClickListener.bind(this)}
            >
              <div className="accordion__title">
                <p>{data.title}</p>
              </div>

              <span>
                <FontAwesomeIcon icon={faAngleDown} flip="horizontal" />
              </span>
            </div>
            <div
              className="panel hide"
              dangerouslySetInnerHTML={{ __html: data.answer }}
            ></div>
          </li>,
        ]);
      }, dataList);
    }

    return dataList;
  }

  onAccordionBtnClickListener(e) {
    let isEventTarget = false;
    let panel;
    let spanNode;
    let accordionAreaNode;
    let svgNode;
    let pathNode;
    let pNode;

    switch (e.target.tagName.toLowerCase()) {
      case "p":
        pNode = e.target;
        accordionAreaNode = pNode.parentElement.parentElement;
        panel = accordionAreaNode.nextElementSibling;

        isEventTarget = true;
        break;

      case "div":
        accordionAreaNode = e.target;
        panel = accordionAreaNode.nextElementSibling;

        isEventTarget = true;
        break;

      case "span":
        spanNode = e.target;
        svgNode = spanNode.firstElementChild;
        accordionAreaNode = spanNode.parentElement;
        panel = accordionAreaNode.nextElementSibling;

        isEventTarget = true;
        break;
      case "svg":
        svgNode = e.target;
        spanNode = svgNode.parentElement;
        accordionAreaNode = spanNode.parentElement;
        panel = accordionAreaNode.nextElementSibling;

        isEventTarget = true;
        break;
      case "path":
        pathNode = e.target;
        svgNode = pathNode.parentElement;
        spanNode = svgNode.parentElement;
        accordionAreaNode = spanNode.parentElement;
        panel = accordionAreaNode.nextElementSibling;

        isEventTarget = true;
        break;
      default:
        break;
    }

    if (isEventTarget) {
      if (DomUtil.hasClassByClassName(panel, "hide")) {
        this.showPanel(panel, accordionAreaNode);
      } else {
        this.hidePanel(panel, accordionAreaNode);
      }
    }
  }

  hidePanel(panel, svgNode) {
    svgNode.classList.remove("clicked");
    panel.classList.add("hide");
  }

  showPanel(panel, svgNode) {
    svgNode.classList.add("clicked");
    panel.classList.remove("hide");
  }

  render() {
    let dataList = this.getDataList();

    return (
      <div className="kohub-accordion">
        <ul>{dataList}</ul>
      </div>
    );
  }
}

export default AccordionMenu;
