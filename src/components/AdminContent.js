import React, { Component } from "react";
import "./AdminContent.scss";
import AdminHeader from "../containers/AdminHeader";
import { Table } from ".";
import { List, Record } from "immutable";
import moment from "moment";

const User = Record({
  id: null,
  email: "",
  name: "",
  auth: "",
  state: "",
  role: "",
  createDate: "",
  modifyDate: "",
});

const TableData = Record({
  heads: List(),
  datas: List(),
});

class AdminContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: TableData(),
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_KOHUB_API_URL_GET_ADMIN_USERS)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let userDatas = json.users;
        this.userApiHandler(userDatas);
      })
      .catch((err) => {
        new Error("User API Error");
      });
  }

  userApiHandler(userDatas) {
    let newHeads = List([
      "No",
      "Email",
      "Name",
      "Auth",
      "State",
      "Role",
      "CreateDate",
      "ModifyDate",
    ]);
    let newDatas = List(userDatas).map((userData) => {
      return User({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        auth: userData.auth ? "인증" : "미인증",
        state: userData.state,
        role: userData.role,
        createDate: userData.createDate,
        modifyDate: userData.modifyDate,
      });
    });
    let newTableData = TableData({
      heads: newHeads,
      datas: newDatas,
    });

    this.setState({
      table: newTableData,
    });
  }

  render() {
    let heads = this.state.table.heads;
    let datas = this.state.table.datas;

    return (
      <div className="kohub-admin-content-container">
        <div className="kohub-admin-content-area">
          <AdminHeader></AdminHeader>
          <Table heads={heads} datas={datas}></Table>
        </div>
      </div>
    );
  }
}

export default AdminContent;
