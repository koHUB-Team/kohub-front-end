import React, { Component } from "react";
import { BoardWrite, Header, Footer } from "../components";

class Write extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <BoardWrite></BoardWrite>
        <Footer></Footer>
      </div>
    );
  }
}

export default Write;
