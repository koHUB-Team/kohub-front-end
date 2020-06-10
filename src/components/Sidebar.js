import React, { Component } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { List, Record } from "immutable";

const SidebarData = Record({
  menu: "",
  submenu1: "",
  submenu2: "",
  submenu3: "",
  submenu4: "",
  submenu5: "",
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="kohub-sidebar">
        <div className="kohub-sidebar__title">
          <h3>koHUB</h3>
        </div>
        <div className="kohub-sidebar__hr">
          <hr></hr>
        </div>
        <div className="kohub-sidebar__content">
          <ul>
            <li>
              <Link to="/notice">
                <span>공지사항</span>
              </Link>
            </li>
            <li>
              <Link to="/faq">
                <span>FAQ</span>
              </Link>
            </li>
            <li>
              <Link to="/qna">
                <span>Q&amp;A</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span>자유게시판</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span>실험실</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
