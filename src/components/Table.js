import React, { Component } from "react";
import "./Table.scss";
import { List, Record } from "immutable";

//****Table 컴포넌트****//
//props정보
//heads : 테이블의 각 컬럼의 제목 문자열 리스트 / type : Immutable.List
//datas : 테이블 각 행의 정보를 가진 레코드 리스트 / type : Immutable.List
//checked : 테이블 행에 체크박스 추가 / type : boolean

class Table extends Component {
  constructor(props) {
    super(props);
    this.CHECK_BOX_SELECTOR = ".kohub-table-check";
    this.CHECK_ALL_BOX_SELECTOR = ".kohub-table-check-all";
  }

  componentDidUpdate() {
    let { checked } = this.props;
    if (checked !== undefined && checked === true) {
      let checkAllBoxNode = document.querySelector(this.CHECK_ALL_BOX_SELECTOR);
      let checkBoxNodes = document.querySelectorAll(this.CHECK_BOX_SELECTOR);

      checkAllBoxNode.checked = false;
      Object.values(checkBoxNodes).forEach((checkBox) => {
        checkBox.checked = false;
      });
    }
  }

  onAllCheckboxChangeListener(e) {
    console.log("Check All!");
    let checkBoxNodes = document.querySelectorAll(this.CHECK_BOX_SELECTOR);

    let checkBox = e.target;
    if (checkBox.checked) {
      Object.values(checkBoxNodes).forEach((checkBox) => {
        checkBox.checked = true;
      });
    } else {
      Object.values(checkBoxNodes).forEach((checkBox) => {
        checkBox.checked = false;
      });
    }
  }
  onTableRowClickListener(e) {
    e.preventDefault();

    let isEventTarget = false;
    let trNode;
    switch (e.target.tagName.toLowerCase()) {
      case "tr":
        isEventTarget = true;
        trNode = e.target;
        break;
      case "td":
        isEventTarget = true;
        trNode = e.target.parentElement;
        break;
      default:
        break;
    }

    if (isEventTarget) {
      let { onTableRowClick } = this.props;

      if (onTableRowClick !== undefined) {
        let boardId = trNode.dataset.id;
        onTableRowClick(boardId);
      }
    }
  }

  //테이블 제목 리스트 반환 함수
  getHeadList() {
    let { heads, checked } = this.props;
    let headList = [];

    if (heads === undefined) {
      return headList;
    }

    if (checked === true) {
      headList = headList.concat([
        <th key={heads.toJS().length}>
          <input
            type="checkbox"
            onChange={this.onAllCheckboxChangeListener.bind(this)}
            className="kohub-table-check-all"
          ></input>
        </th>,
      ]);
    }

    headList = heads.reduce((acc, head, idx) => {
      return acc.concat([<th key={idx}>{head}</th>]);
    }, headList);

    return headList;
  }

  //테이블 각 행의 리스트 반환 함수
  getDataList() {
    let { datas } = this.props;

    if (datas === undefined) {
      return [];
    }

    let dataList = datas.reduce((acc, data, idx) => {
      return acc.concat([
        <tr
          data-id={data.id}
          key={idx}
          onClick={this.onTableRowClickListener.bind(this)}
        >
          {this.getDataValueList(data)}
        </tr>,
      ]);
    }, []);

    return dataList;
  }

  //datas를 JS형식으로 바꾼후 행에 출력할 데이터의 리스트를 반환하는 함수
  getDataValueList(data) {
    data = data.toJS();

    let { checked } = this.props;
    let dataValueList = [];
    if (checked === true) {
      dataValueList = dataValueList.concat([
        <td key={Object.values(data).length}>
          <input
            className="kohub-table-check"
            type="checkbox"
            value={data.id}
          ></input>
        </td>,
      ]);
    }

    dataValueList = Object.values(data).reduce((acc, value, idx) => {
      return acc.concat([<td key={idx}>{value}</td>]);
    }, dataValueList);

    return dataValueList;
  }

  getColgroup() {
    let { colgroupDatas } = this.props;
    let colgroupList = [];
    if (colgroupDatas === undefined) {
      return colgroupList;
    }
    colgroupList = colgroupDatas.reduce((acc, cur, idx) => {
      return acc.concat([
        <col key={idx} span={cur.span} className={cur.class}></col>,
      ]);
    }, colgroupList);

    return colgroupList;
  }

  render() {
    let colgroup = this.getColgroup();
    let headList = this.getHeadList();
    let dataList = this.getDataList();

    return (
      <table className="kohub-table table--admin">
        <colgroup>{colgroup}</colgroup>
        <thead className="kohub-table__head">
          <tr>{headList}</tr>
        </thead>
        <tbody className="kohub-table__body">{dataList}</tbody>
      </table>
    );
  }
}

export default Table;
