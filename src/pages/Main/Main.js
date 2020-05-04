import React, { Component } from "react";
import { Header, Footer } from "../../components";
import { Content } from "./";
// import "./Main.scss";

class Main extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </div>
    );
  }
}

export default Main;
