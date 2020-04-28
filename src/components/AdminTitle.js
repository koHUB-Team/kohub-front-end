import React, { Component } from "react";
import "./AdminTitle.scss";
import { List, Record } from "immutable";

const Title = Record({
  adminMenuId: null,
  name: "",
});

class AdminTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: List([
        Title({
          adminMenuId: 1,
          name: "회원리스트",
        }),
        Title({
          adminMenuId: 2,
          name: "홍보신청 리스트",
        }),
        Title({
          adminMenuId: 3,
          name: "강의정보 등록",
        }),
        Title({
          adminMenuId: 4,
          name: "핫스팟 리스트",
        }),
        Title({
          adminMenuId: 5,
          name: "동아리 리스트",
        }),
        Title({
          adminMenuId: 6,
          name: "자치단체 리스트",
        }),
        Title({
          adminMenuId: 7,
          name: "주거정보 리스트",
        }),
        Title({
          adminMenuId: 8,
          name: "기숙사 리스트",
        }),
        Title({
          adminMenuId: 9,
          name: "FAQ",
        }),
        Title({
          adminMenuId: 10,
          name: "AD",
        }),
      ]),
    };
  }

  getTitle(selectedMenuId) {
    let { titles } = this.state;
    let title = titles
      .filter((titleRecord) => {
        if (Number(titleRecord.adminMenuId) === Number(selectedMenuId)) {
          return titleRecord;
        }
      })
      .get(0);

    return title.name;
  }

  render() {
    let title = this.getTitle(this.props.selectedMenuId);
    return (
      <div className="kohub-admin__title align-center-col">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default AdminTitle;
