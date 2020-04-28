import React, { Component } from "react";
import "./AdminNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrin } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Record, List } from "immutable";

const Menu = Record({
  id: null,
  title: "",
});

class AdminNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: List(),
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_KOHUB_API_URL_GET_ADMIN_MENUS)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let menuDatas = json.menus;
        this.adminMenuApiHandler(menuDatas);
      })
      .catch((err) => {
        new Error("AdminMenu API Error");
      });
  }

  adminMenuApiHandler(menuDatas) {
    let newMenus = this.getNewMenuData(menuDatas);

    this.setState({
      menus: newMenus,
    });
  }

  getNewMenuData(menuDatas) {
    let newMenus = List();
    Object.values(menuDatas).forEach((menuData) => {
      newMenus = newMenus.push(
        Menu({
          id: menuData.id,
          title: menuData.title,
        })
      );
    });

    return newMenus;
  }

  getMenuList() {
    let { menus } = this.state;
    let menuList = menus.reduce((acc, menu) => {
      return acc.concat([
        <li key={menu.id}>
          <Link to={"/admin/" + menu.title.toLowerCase()}>
            <h2>
              <span data-id={menu.id}>{menu.title}</span>
            </h2>
          </Link>
        </li>,
      ]);
    }, []);

    return menuList;
  }

  menuClickListener(e) {
    let isEventTargetTag = false;
    let spanTag = null;

    switch (e.target.tagName.toLowerCase()) {
      case "span":
        isEventTargetTag = true;
        spanTag = e.target;
        break;
    }

    if (isEventTargetTag) {
      let clickedMenuId = spanTag.dataset.id;
      this.props.onClick(clickedMenuId);
    }
  }

  render() {
    let menuList = this.getMenuList();

    return (
      <div className="kohub-admin-nav-area">
        <div className="kohub-admin-nav__top">
          <div className="kohub-admin-nav__title">
            <h1>koHUB Manage</h1>
          </div>
          <div className="kohub-admin-nav__user-info">
            <FontAwesomeIcon icon={faGrin}></FontAwesomeIcon>
            <span className="kohub-admin-nav__user-info__email">
              koHubManager@gmail.com
            </span>
          </div>
          <div className="kohub-admin-nav__user-menu">
            <button className="kohub-admin-nav-btn--logout">Logout</button>
          </div>
        </div>

        <div className="kohub-adming-nav__menu-area align-center-col">
          <div className="kohub-adming-nav__menu">
            <nav>
              <ul onClick={this.menuClickListener.bind(this)}>{menuList}</ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminNav;
