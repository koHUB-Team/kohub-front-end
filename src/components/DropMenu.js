import React, { Component } from "react";
import "./DropMenu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

//****SearchBar 컴포넌트****//
//props
//value : dropmenu 버튼에 표시할 텍스트 / type : String
//menus : dropmenu 버튼 클릭시 나타나는 서브메뉴 리스트 / type : Immutable.List

//menus 는 record로 이루어짐.
//data = Record({
//menu : 메뉴이름
//menuType : 필요하면 지정. menu Click시 인자로 전달됨.
//menuValue : 필요하면 지정. menu Click시 인자로 전달됨.
//})

class DropMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropBtnClicked: false,
      clickedDropMenuId: null,
    };
  }

  onDropBtnClickListener(e) {
    let buttonNode;
    switch (e.target.tagName.toLowerCase()) {
      case "button":
        buttonNode = e.target;
        this.dropMenuContainerNode = buttonNode.nextElementSibling;
        break;
      case "svg":
        buttonNode = e.target.parentElement;
        this.dropMenuContainerNode = buttonNode.nextElementSibling;
        break;
    }

    let { isDropBtnClicked } = this.state;
    let newIsDropBtnClicked;

    if (isDropBtnClicked) {
      this.hideDropMenu();
      newIsDropBtnClicked = false;
    } else {
      this.showDropMenu();
      newIsDropBtnClicked = true;
    }

    this.setState({
      isDropBtnClicked: newIsDropBtnClicked,
    });
    e.nativeEvent.stopImmediatePropagation();
  }

  onMenuClickListener(e) {
    e.preventDefault();

    let isEventTaget = false;
    let liNode;
    switch (e.target.tagName.toLowerCase()) {
      case "li":
        isEventTaget = true;
        liNode = e.target;
        this.dropMenuContainerNode = liNode.parentElement;
        break;
      case "a":
        isEventTaget = true;
        liNode = e.target.parentElement;
        this.dropMenuContainerNode = liNode.parentElement;
        break;
    }

    if (isEventTaget) {
      this.hideDropMenu();
      this.setState({
        isDropBtnClicked: false,
        clickedDropMenuId: Number(liNode.dataset.id),
      });

      let type = liNode.dataset.type;
      let value = liNode.dataset.value;

      let { onDropMenuClick } = this.props;
      if (onDropMenuClick !== undefined) {
        onDropMenuClick(type, value);
      }

      e.nativeEvent.stopImmediatePropagation();
    }
  }

  hideDropMenu() {
    this.dropMenuContainerNode.classList.add("hide");
  }

  showDropMenu() {
    this.dropMenuContainerNode.classList.remove("hide");
  }

  getDropMenuIcon() {
    let { isDropBtnClicked } = this.state;
    let faIcon = faCaretDown;

    if (isDropBtnClicked) {
      faIcon = faCaretUp;
    }

    return <FontAwesomeIcon icon={faIcon}></FontAwesomeIcon>;
  }

  getMenuList() {
    let { menus } = this.props;
    let menuList = [];

    if (menus !== undefined) {
      menuList = menus.reduce((acc, cur, idx) => {
        let _className = "";
        let { clickedDropMenuId } = this.state;
        if (idx === clickedDropMenuId) {
          _className = "checked";
        }

        return acc.concat([
          <li
            className={_className}
            key={idx}
            data-id={idx}
            data-type={cur.menuType}
            data-value={cur.menuValue}
          >
            <a href="#">
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              {cur.menu}
            </a>
          </li>,
        ]);
      }, menuList);
    }

    return menuList;
  }

  render() {
    let menuList = this.getMenuList();
    let dropMenuIcon = this.getDropMenuIcon();

    return (
      <div className="kohub-dropmenu-container">
        <button
          className="kohub-dropmenu__btn"
          onClick={this.onDropBtnClickListener.bind(this)}
        >
          {this.props.value} {dropMenuIcon}
        </button>
        <ul
          onClick={this.onMenuClickListener.bind(this)}
          className="kohub-dropmenu__menu hide"
        >
          {menuList}
        </ul>
      </div>
    );
  }
}

export default DropMenu;
