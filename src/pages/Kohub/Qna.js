import React, { Component } from "react";
import { Header, Footer } from "../../components";
import { MODE } from "../../store";
import { QnaWrite } from "./";
import {
  QnaBoardContainer,
  QnaDetailContainer,
  QnaWriteContainer,
} from "../../containers";
class Qna extends Component {
  getArticle() {
    switch (this.props.mode) {
      case MODE.READ:
        return <QnaBoardContainer></QnaBoardContainer>;
      case MODE.CREATE:
        return <QnaWriteContainer></QnaWriteContainer>;
      case MODE.READ_DETAIL:
        return <QnaDetailContainer></QnaDetailContainer>;
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

export default Qna;
