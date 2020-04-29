import React, { Component } from "react";
import "./Table.scss";
import { List, Record } from "immutable";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //props로 값을 주입해도록 함.
  getHeadList() {
    let { heads } = this.props;
    let headList = heads.reduce((acc, head, idx) => {
      return acc.concat([<th key={idx}>{head}</th>]);
    }, []);

    return headList;
  }

  getDataList() {
    let { datas } = this.props;
    let dataList = datas.reduce((acc, data, idx) => {
      return acc.concat([<tr key={idx}>{this.getDataValueList(data)}</tr>]);
    }, []);

    return dataList;
  }

  getDataValueList(data) {
    data = data.toJS();
    let dataValueList = Object.values(data).reduce((acc, value, idx) => {
      return acc.concat([<td key={idx}>{value}</td>]);
    }, []);

    return dataValueList;
  }

  render() {
    let headList = this.getHeadList();
    let dataList = this.getDataList();

    return (
      <table className="kohub-table table--admin">
        <thead className="kohub-table__head">
          <tr>{headList}</tr>
        </thead>
        <tbody className="kohub-table__body">{dataList}</tbody>
      </table>
    );
  }
}

export default Table;
