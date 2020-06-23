import React, { Component } from "react";
import "./Lab.scss";
import { Header, Footer, Sidebar } from "../../components";
import { Record, List } from "immutable";

const SidebarData = Record({
  menuName: "",
  menuUrl: "",
});

class Lab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarTitle: "koHUB",
      sidebarList: List([
        SidebarData({
          menuName: "공지사항",
          menuUrl: "/notice",
        }),
        SidebarData({
          menuName: "FAQ",
          menuUrl: "/faq",
        }),
        SidebarData({
          menuName: "Q&A",
          menuUrl: "/qna",
        }),
        SidebarData({
          menuName: "자유게시판",
          menuUrl: "/free",
        }),
        SidebarData({
          menuName: "실험실",
          menuUrl: "/lab",
        }),
      ]),
    };
  }
  render() {
    let { sidebarList, sidebarTitle } = this.state;
    return (
      <div>
        <Header></Header>
        <div className="container">
          <div className="content-area kohub-lab">
            <Sidebar sidebarTitle={sidebarTitle} datas={sidebarList}></Sidebar>
            <div className="kohub-lab__content">
              <div className="kohub-lab__header">
                <h2>실험실</h2>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Lab;
