import React, { Component } from "react";
import "./DropBox.scss";
import { DomUtil } from "../common/kohubUtil";

//****Dropbox 컴포넌트****//

class DropBox extends Component {
  constructor(props) {
    super(props);
    this.DROP_MENU_SELECTOR = ".kohub-dropbox__menu";
    this.SELECT_RESULT_SELECTOR = "#selected-menu";
  }

  componentDidMount() {
    this.dropMenuNode = document.querySelector(this.DROP_MENU_SELECTOR);
    this.selectResultNode = document.querySelector(this.SELECT_RESULT_SELECTOR);

    this.initEvent();
  }

  initEvent() {
    this.dropMenuNode.addEventListener(
      "mouseout",
      this.onDropMenuMouseoutListener.bind(this)
    );
  }

  onDropMenuMouseoutListener(e) {
    let isEventTarget = false;
    switch (e.target.tagName.toLowerCase()) {
      case "ul":
        isEventTarget = true;
        break;
    }
    if (isEventTarget) {
      this.hideDropMenu();
    }
  }

  onDropMenuMouseoverListener(e) {
    let isEventTarget = false;
    switch (e.target.tagName.toLowerCase()) {
      case "li":
        isEventTarget = true;
        break;
    }
    if (isEventTarget) {
      this.showDropMenu();
    }
  }

  onDropboxBtnClickListener(e) {
    if (DomUtil.hasClassByClassName(this.dropMenuNode, "hide")) {
      this.showDropMenu();
    } else {
      this.hideDropMenu();
    }
  }

  onMenuClickListener(e) {
    let selectedMenuText = e.target.textContent;
    this.selectResultNode.textContent = selectedMenuText;

    this.hideDropMenu();
    this.props.onMenuClick(selectedMenuText);
  }

  hideDropMenu() {
    this.dropMenuNode.classList.add("hide");
  }

  showDropMenu() {
    this.dropMenuNode.classList.remove("hide");
  }

  getDropMenuList() {
    let { menus } = this.props;
    let dropMenuList = menus.reduce((acc, menu, idx) => {
      return acc.concat([
        <li
          key={idx}
          onClick={this.onMenuClickListener.bind(this)}
          onMouseOver={this.onDropMenuMouseoverListener.bind(this)}
        >
          {menu}
        </li>,
      ]);
    }, []);

    return dropMenuList;
  }

  render() {
    let dropMenuList = this.getDropMenuList();
    return (
      <div className="kohub-dropbox-area">
        <div className="kohub-dropbox__selected-menu">
          <span id="selected-menu" className="align-center-col">
            선택
          </span>
        </div>
        <button
          className="kohub-dropbox__btn align-center-col"
          onClick={this.onDropboxBtnClickListener.bind(this)}
        ></button>
        <div className="kohub-dropbox__menu hide">
          <ul>{dropMenuList}</ul>
        </div>
      </div>
    );
  }
}

export default DropBox;
