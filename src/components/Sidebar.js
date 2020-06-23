import React, { Component } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { List, Record } from "immutable";

const SidebarData = Record({
  menuName: "",
  menuUrl: "",
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSidebar() {
    let { datas } = this.props;
    console.log(datas);

    if (datas === undefined) {
      return [];
    }
    let dataList = datas.reduce((acc, data, idx) => {
      return acc.concat([
        <li key={idx}>
          <Link to={data.menuUrl}>
            <span>{data.menuName}</span>
          </Link>
        </li>,
      ]);
    }, []);

    return dataList;
  }
  render() {
    let { sidebarTitle } = this.props;
    let sidebarList = this.getSidebar();
    return (
      <div className="kohub-sidebar">
        <div className="kohub-sidebar__title">
          <h3>{sidebarTitle}</h3>
        </div>
        <div className="kohub-sidebar__hr">
          <hr></hr>
        </div>
        <div className="kohub-sidebar__content">
          <ul>{sidebarList}</ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
