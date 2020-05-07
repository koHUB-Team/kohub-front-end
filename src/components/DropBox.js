import React, { Component } from "react";
import "./DropBox.scss";
import { DomUtil } from "../common/kohubUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

//****Dropbox 컴포넌트****//
//props
//onMenuClick : Dropbox의 메뉴를 클릭했을 때, 실행할 콜백 메소드
//menus : Dropbox의 메뉴에 넣을 리스트 / type : Immutable.List

class DropBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedDropboxBtn: false,
    };
    this.DROP_MENU_SELECTOR = ".kohub-dropbox__menu";
    this.SELECT_RESULT_SELECTOR = "#selected-menu";
  }

  componentDidMount() {
    this.dropMenuNode = document.querySelector(this.DROP_MENU_SELECTOR);
    this.selectResultNode = document.querySelector(this.SELECT_RESULT_SELECTOR);
  }

  onDropboxBtnClickListener(e) {
    if (DomUtil.hasClassByClassName(this.dropMenuNode, "hide")) {
      this.showDropMenu();
      this.setState({
        isClickedDropboxBtn: true,
      });
    } else {
      this.hideDropMenu();
      this.setState({
        isClickedDropboxBtn: false,
      });
    }
  }

  onMenuClickListener(e) {
    let selectedMenuText = e.target.textContent;
    this.selectResultNode.textContent = selectedMenuText;

    this.hideDropMenu();
    this.setState({
      isClickedDropboxBtn: false,
    });
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
        <li key={idx} onClick={this.onMenuClickListener.bind(this)}>
          {menu}
        </li>,
      ]);
    }, []);

    return dropMenuList;
  }

  getDropboxIcon() {
    let { isClickedDropboxBtn } = this.state;

    if (isClickedDropboxBtn) {
      return <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>;
    }
    return <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>;
  }

  render() {
    let dropMenuList = this.getDropMenuList();
    let dropMenuIcon = this.getDropboxIcon();
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
        >
          {dropMenuIcon}
        </button>
        <div className="kohub-dropbox__menu hide">
          <ul>{dropMenuList}</ul>
        </div>
      </div>
    );
  }
}

export default DropBox;
