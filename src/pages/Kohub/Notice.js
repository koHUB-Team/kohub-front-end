import React, { Component } from "react";
import { Header, Footer } from "../../components";
import { MODE } from "../../store";
import {
  NoticeBoardContainer,
  NoticeDetailContainer,
  NoticeUpdateContainer,
  NoticeWriteContainer,
} from "../../containers";
class Notice extends Component {
  getArticle() {
    switch (this.props.mode) {
      case MODE.READ:
        return <NoticeBoardContainer></NoticeBoardContainer>;
      case MODE.CREATE:
        return <NoticeWriteContainer></NoticeWriteContainer>;
      case MODE.UPDATE:
        return <NoticeUpdateContainer></NoticeUpdateContainer>;
      case MODE.READ_DETAIL:
        return <NoticeDetailContainer></NoticeDetailContainer>;
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
