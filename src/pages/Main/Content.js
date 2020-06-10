import React, { Component } from "react";
import "./Content.scss";
import { ContentList, LinkNavigator } from "../../components";
import { Record, List } from "immutable";

const NoticeData = Record({
  id: 0,
  title: "",
});

const FreeboardData = Record({
  id: 0,
  title: "",
});

const PartTimeData = Record({
  id: 0,
  title: "",
});

const RecruitData = Record({
  id: 0,
  title: "",
});

//컴포넌트로 빼지말고 Main page에
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeDatas: List([
        NoticeData({ id: 1, title: "Sample 게시물입니다." }),
        NoticeData({ id: 2, title: "Sample 게시물입니다." }),
        NoticeData({ id: 3, title: "Sample 게시물입니다." }),
        NoticeData({ id: 4, title: "Sample 게시물입니다." }),
        NoticeData({ id: 5, title: "Sample 게시물입니다." }),
      ]),
      freeboardDatas: List([
        FreeboardData({ id: 1, title: "Sample 게시물입니다." }),
        FreeboardData({ id: 2, title: "Sample 게시물입니다." }),
        FreeboardData({ id: 3, title: "Sample 게시물입니다." }),
        FreeboardData({ id: 4, title: "Sample 게시물입니다." }),
        FreeboardData({ id: 5, title: "Sample 게시물입니다." }),
      ]),

      partTimeDatas: List([
        PartTimeData({ id: 1, title: "Sample 게시물입니다." }),
        PartTimeData({ id: 2, title: "Sample 게시물입니다." }),
        PartTimeData({ id: 3, title: "Sample 게시물입니다." }),
        PartTimeData({ id: 4, title: "Sample 게시물입니다." }),
        PartTimeData({ id: 5, title: "Sample 게시물입니다." }),
      ]),

      recruitDatas: List([
        RecruitData({ id: 1, title: "Sample 게시물입니다." }),
        RecruitData({ id: 2, title: "Sample 게시물입니다." }),
        RecruitData({ id: 3, title: "Sample 게시물입니다." }),
        RecruitData({ id: 4, title: "Sample 게시물입니다." }),
        RecruitData({ id: 5, title: "Sample 게시물입니다." }),
      ]),
    };
  }

  render() {
    let {
      noticeDatas,
      freeboardDatas,
      partTimeDatas,
      recruitDatas,
    } = this.state;

    return (
      <main>
        <div className="container">
          <div className="content-area">
            <section className="kohub-main-board-container">
              <article className="kohub-main-first-board-area">
                <ContentList
                  title={"공지사항"}
                  contents={noticeDatas}
                ></ContentList>
              </article>

              <article className="kohub-main-second-board-area">
                <ContentList
                  title={"자유게시판"}
                  contents={freeboardDatas}
                ></ContentList>
              </article>
            </section>

            <section className="kohub-main-board-container">
              <article className="kohub-main-first-board-area">
                <ContentList
                  title={"아르바이트"}
                  contents={partTimeDatas}
                ></ContentList>
              </article>
              <article className="kohub-main-second-board-area">
                <ContentList
                  title={"팀원모집"}
                  contents={recruitDatas}
                ></ContentList>
              </article>
            </section>

            <section>
              <article>
                <h2>홍보공간</h2>
              </article>
              <article>
                <h2>오늘의 학식</h2>
              </article>
            </section>

            <h2>맛집추천</h2>
            <h2>매물추천</h2>
            <h2>외부광고</h2>
            <h2>중고장터</h2>
            <h2>분실물</h2>

            <aside className="kohub-main-link-nav">
              <LinkNavigator></LinkNavigator>
            </aside>
          </div>
        </div>
      </main>
    );
  }
}

export default Content;
