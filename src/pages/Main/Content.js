import React, { Component } from "react";
import "./Content.scss";
import {
  ContentList,
  LinkNavigator,
  Slider,
  VideoSlider,
  ModalPopup,
} from "../../components";
import { Record, List } from "immutable";
import { ApiUtil } from "../../common/kohubUtil";
import moment from "moment";

const NoticeData = Record({
  id: 0,
  title: "",
  date: "0000.00.00",
});

const FreeboardData = Record({
  id: 0,
  title: "",
  date: "0000.00.00",
});

const PartTimeData = Record({
  id: 0,
  title: "",
  date: "0000.00.00",
});

const RecruitData = Record({
  id: 0,
  title: "",
  date: "0000.00.00",
});

const PromotionData = Record({
  id: 0,
  title: "",
  content: "",
  promotionImageId: 0,
});

//썸네일과 메인이미지를 분리해서 저장.
const PromotionThumbImageData = Record({
  id: 0,
  url: "",
  promotionId: 0,
});

const PromotionMainImageData = Record({
  id: 0,
  promotionId: 0,
});

const ModalData = Record({
  isShow: false,
  title: "",
  content: "",
  imageUrl: "",
});

//컴포넌트로 빼지말고 Main page에
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeDatas: List([
        NoticeData({
          id: 1,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        NoticeData({
          id: 2,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        NoticeData({
          id: 3,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        NoticeData({
          id: 4,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        NoticeData({
          id: 5,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
      ]),
      freeboardDatas: List([
        FreeboardData({
          id: 1,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        FreeboardData({
          id: 2,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        FreeboardData({
          id: 3,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        FreeboardData({
          id: 4,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        FreeboardData({
          id: 5,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
      ]),

      partTimeDatas: List([
        PartTimeData({
          id: 1,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        PartTimeData({
          id: 2,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        PartTimeData({
          id: 3,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        PartTimeData({
          id: 4,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        PartTimeData({
          id: 5,
          title: "Sample 게시물입니다.",
          date: "0000.00.00",
        }),
      ]),

      recruitDatas: List([
        RecruitData({
          id: 1,
          title:
            "Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        RecruitData({
          id: 2,
          title:
            "Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        RecruitData({
          id: 3,
          title:
            "Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        RecruitData({
          id: 4,
          title:
            "Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.",
          date: "0000.00.00",
        }),
        RecruitData({
          id: 5,
          title:
            "Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.Sample 게시물입니다.",
          date: "0000.00.00",
        }),
      ]),

      promotionDatas: List(),
      promotionThumbImageDatas: List(),
      promotionMainImageDatas: List(),
      modal: ModalData(),
    };
  }

  componentDidMount() {
    let params = {
      orderType: "CREATE_DATE",
      orderOption: "ASC",
      filterType: "STATE",
      filterValue: "PROMOTING",
    };
    this.requestGetPromotionApi(params);
    this.requestGetNoticeApi();
  }

  requestGetNoticeApi(params = null) {
    let url = process.env.REACT_APP_KOHUB_API_URL_GET_NOTICES;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let noticeDatas = json.items;
        this.noticeApiHandler(noticeDatas);
      })
      .catch((err) => {
        new Error("Notice API Error");
      });
  }

  noticeApiHandler(noticeDatas) {
    let newNoticeDatas = noticeDatas.reduce((acc, data, idx) => {
      if (idx < 5) {
        return acc.push(
          NoticeData({
            id: data.id,
            title: data.title,
            date: moment(data.createDate).format("YYYY.MM.DD"),
          })
        );
      } else {
        return acc;
      }
    }, List());

    this.setState({
      noticeDatas: newNoticeDatas,
    });
  }

  requestGetPromotionApi(params = null) {
    if (params === null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_GET_PROMOTIONS;
    if (params !== null) {
      let queryStr = ApiUtil.parseObjToQueryStr(params);
      url += queryStr;
    }

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        let promotionDatas = json.promotions;
        console.log(promotionDatas);

        let promotionImages = json.promotionImages;
        console.log(promotionImages);

        this.promotionApiHandler(promotionDatas, promotionImages);
      })
      .catch((err) => {
        new Error("Promotion API Error");
      });
  }

  promotionApiHandler(promotionDatas, promotionImages) {
    let thumbImages = promotionImages.filter((image) => {
      if (image.type === "th") {
        return image;
      }
    });

    thumbImages.forEach((image) => {
      let pathVariables = {
        promotionImageId: image.id,
      };
      this.requestDownloadPromotionImageApi(pathVariables);
    });

    let newPromotionDatas = thumbImages.reduce((acc, image, idx) => {
      let promoData = promotionDatas.filter((data) => {
        if (image.promotionId === data.id) {
          return data;
        }
      })[0];
      return acc.push(
        PromotionData({
          id: promoData.id,
          title: promoData.title,
          content: promoData.content,
          promotionImageId: image.id,
        })
      );
    }, List());

    let mainImages = promotionImages.filter((image) => {
      if (image.type === "ma") {
        return image;
      }
    });

    let newPromotionMainImageDatas = mainImages.reduce((acc, image, idx) => {
      return acc.push(
        PromotionMainImageData({
          id: image.id,
          promotionId: image.promotionId,
        })
      );
    }, List());

    this.setState({
      promotionDatas: newPromotionDatas,
      promotionMainImageDatas: newPromotionMainImageDatas,
    });
  }

  requestDownloadPromotionImageApi(pathVariables = null, isMain = false) {
    if (pathVariables == null) {
      return;
    }

    let url = process.env.REACT_APP_KOHUB_API_URL_DOWNLOAD_PROMOTION;
    url = ApiUtil.bindPathVariable(url, pathVariables);

    fetch(url)
      .then((result) => {
        return result.blob();
      })
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);

        if (isMain) {
          this.downloadMainImageHandler(objectURL);
        } else {
          this.downloadThumbImageHandler(
            pathVariables.promotionImageId,
            objectURL
          );
        }
      })
      .catch((err) => {
        new Error("Promotion Image Api Error!");
      });
  }

  downloadThumbImageHandler(imageId, imageUrl, promoId) {
    let { promotionThumbImageDatas } = this.state;
    let newPromotionThumbImageDatas = promotionThumbImageDatas.push(
      PromotionThumbImageData({
        id: imageId,
        url: imageUrl,
      })
    );

    this.setState({
      promotionThumbImageDatas: newPromotionThumbImageDatas,
    });
  }

  downloadMainImageHandler(imageUrl) {
    let { modal } = this.state;
    let newModal = modal.set("imageUrl", imageUrl);

    this.setState({
      modal: newModal,
    });
  }

  onCloseModalPopupCallback() {
    let { modal } = this.state;
    let newModal = modal.set("isShow", false);

    this.setState({
      modal: newModal,
    });
  }

  onSlideImageClickCallback(promotionImgId) {
    let { promotionDatas, promotionMainImageDatas } = this.state;

    let data = promotionDatas
      .filter((data) => {
        if (Number(promotionImgId) === Number(data.promotionImageId)) {
          return data;
        }
      })
      .get(0);

    let mainImage = promotionMainImageDatas
      .filter((image) => {
        if (data.id === image.promotionId) {
          return image;
        }
      })
      .get(0);

    let pathVariables = {
      promotionImageId: mainImage.id,
    };

    this.requestDownloadPromotionImageApi(pathVariables, true);

    this.setState({
      modal: ModalData({
        isShow: true,
        title: data.title,
        content: data.content,
      }),
    });
  }

  render() {
    let {
      noticeDatas,
      freeboardDatas,
      partTimeDatas,
      recruitDatas,
      promotionThumbImageDatas,
      modal,
    } = this.state;

    return (
      <main>
        <div className="container">
          <div className="content-area">
            <section className="kohub-main-board-container">
              <article className="kohub-main-first-board-area">
                <ContentList
                  title="공지사항"
                  contents={noticeDatas}
                  link="/notice"
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

            <section className="kohub-main-promotion-container">
              <article className="kohub-main-first-promotion-area">
                <Slider
                  title="홍보공간"
                  src={promotionThumbImageDatas}
                  onSlideImageClick={this.onSlideImageClickCallback.bind(this)}
                ></Slider>
              </article>
              <article className="kohub-main-second-promotion-area">
                <VideoSlider></VideoSlider>
              </article>
            </section>

            <h2>맛집추천</h2>
            <h2>매물추천</h2>
            <h2>외부광고</h2>
            <h2>중고장터</h2>
            <h2>분실물</h2>

            <ModalPopup
              isShow={modal.isShow}
              title={modal.title}
              content={modal.content}
              imageUrl={modal.imageUrl}
              onClosePopup={this.onCloseModalPopupCallback.bind(this)}
            ></ModalPopup>

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
