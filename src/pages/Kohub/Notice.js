import React, { Component } from "react";
import { Header, Footer } from "../../components";
import { NoticeWrite } from "./";
import { MODE } from "../../store";

class Notice extends Component {
  getArticle() {
    switch (this.props.mode) {
      case MODE.READ:
        return <h1>read</h1>;
      case MODE.CREATE:
        return <NoticeWrite></NoticeWrite>;
    }
  }

  render() {
    let article = this.getArticle();

    return (
      <div>
        <Header></Header>
        {article}
        <Footer></Footer>
      </div>
    );
  }
}

export default Notice;
