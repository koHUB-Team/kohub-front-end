import React, { Component } from "react";
import { Header, Footer } from "../../components";
import { FreeWrite } from "./";
import {
  FreeBoardContainer,
  FreeDetailContainer,
  FreeWriteContainer,
} from "../../containers";
import { MODE } from "../../store";
class Free extends Component {
  getArticle() {
    switch (this.props.mode) {
      case MODE.READ:
        return <FreeBoardContainer></FreeBoardContainer>;
      case MODE.CREATE:
        return <FreeWriteContainer></FreeWriteContainer>;
      case MODE.UPDATE:
        return <FreeWriteContainer></FreeWriteContainer>;
      case MODE.READ_DETAIL:
        return <FreeDetailContainer></FreeDetailContainer>;
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

export default Free;
