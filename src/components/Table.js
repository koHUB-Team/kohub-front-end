import React, { Component } from "react";
import "./Table.scss";
import { List, Record } from "immutable";

//****Table 컴포넌트****//
//props정보
//heads : 테이블의 각 컬럼의 제목 문자열 리스트 / type : Immutable.List
//datas : 테이블 각 행의 정보를 가진 레코드 리스트 / type : Immutable.List

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //테이블 제목 리스트 반환 함수
  getHeadList() {
    let { heads } = this.props;
    let headList = heads.reduce((acc, head, idx) => {
      return acc.concat([<th key={idx}>{head}</th>]);
    }, []);

    return headList;
  }

  //테이블 각 행의 리스트 반환 함수
  getDataList() {
    let { datas } = this.props;
    let dataList = datas.reduce((acc, data, idx) => {
      return acc.concat([<tr key={idx}>{this.getDataValueList(data)}</tr>]);
    }, []);

    return dataList;
  }

  //datas를 JS형식으로 바꾼후 행에 출력할 데이터의 리스트를 반환하는 함수
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
