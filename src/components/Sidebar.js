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
        <h1>koHUB</h1>
        <div className="kohub-sidebar__hr">
          <hr></hr>
        </div>
        <ul>
          <li>
            <Link to="/notice">
              <span>공지사항</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span>FAQ</span>
            </Link>
          </li>
          <li>
            <Link to="/">
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
    );
  }
}

export default Sidebar;
