import React, { Component } from "react";
import { List, Record } from "immutable";
import { Link } from "react-router-dom";
import "./Header.scss";

const Menu = Record({
  id: null,
  title: null,
});

const SubMenu = Record({
  menuId: null,
  subMenuItems: List(),
});

const SubMenuItem = Record({
  subMenuId: null,
  title: null,
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: List(),
      subMenus: List(),
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_KOHUB_API_URL_GET_MENUS)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let menuDatas = json.menus;
        this.menuApiHandler(menuDatas);
      })
      .catch((err) => {
        new Error("Menu API Error");
      });
  }

  menuApiHandler(menuDatas) {
    let newMenus = this.getNewMenuData(menuDatas);
    let newSubMenus = this.getNewSubMenuData(menuDatas);

    this.setState({
      menus: newMenus,
      subMenus: newSubMenus,
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

  getNewSubMenuData(menuDatas) {
    let newSubMenus = List();
    Object.values(menuDatas).forEach((menuData) => {
      let submenuDatas = menuData.submenus;
      let newSubMenuItems = List();
      submenuDatas.forEach((submenuData) => {
        newSubMenuItems = newSubMenuItems.push(
          SubMenuItem({
            subMenuId: submenuData.id,
            title: submenuData.title,
          })
        );
      });

      newSubMenus = newSubMenus.push(
        SubMenu({
          menuId: menuData.id,
          subMenuItems: newSubMenuItems,
        })
      );
    });

    return newSubMenus;
  }

  getMenuList() {
    let { menus } = this.state;
    let menuList = menus.reduce((acc, menu) => {
      return acc.concat([
        <li key={menu.id}>
          <div className="align-center-col">
            <Link to="">
              <span>{menu.title}</span>
            </Link>
          </div>
        </li>,
      ]);
    }, []);

    return menuList;
  }

  getSubMenuList() {
    let { menus } = this.state;
    let subMenuList = menus.reduce((acc, menu) => {
      let subMenuItemList = this.getSubMenuItemList(menu.id);
      return acc.concat([<ul key={menu.id}>{subMenuItemList}</ul>]);
    }, []);

    return subMenuList;
  }

  getSubMenuItemList(menuId) {
    let { subMenus } = this.state;
    let subMenu = subMenus
      .filter((subMenu) => subMenu.menuId === menuId)
      .get(0);

    let { subMenuItems } = subMenu;
    let subMenuItemList = subMenuItems.reduce((acc, subMenuItem) => {
      return acc.concat([
        <li key={subMenuItem.subMenuId}>
          <Link to="">
            <span>{subMenuItem.title}</span>
          </Link>
        </li>,
      ]);
    }, []);

    return subMenuItemList;
  }

  render() {
    let menuList = this.getMenuList();
    let subMenuList = this.getSubMenuList();

    return (
      <header>
        <div className="kohub-header">
          <div className="header-area">
            <div className="kohub-header__logo align-center-col">
              <h1>
                <Link to="">
                  <span className="kohub-logo blind">koHUB</span>
                </Link>
              </h1>
            </div>

            <nav className="kohub-header__nav">
              <ul>{menuList}</ul>
            </nav>

            <div className="kohub-header__login align-center-col">
              <span className="kohub-login__icon blind">koHUB 로그인</span>
              <div className="kohub-login__menu">
                <div className="">
                  <Link to="">
                    <span>Login</span>
                  </Link>
                  /
                  <Link to="">
                    <span>SignUp</span>
                  </Link>
                </div>

                <div className="hide">
                  <Link to="">
                    <span>Logout</span>
                  </Link>
                  /
                  <Link to="">
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="kohub-header__submenu">
          <div className="submenu-area">
            <nav>{subMenuList}</nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
