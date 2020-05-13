import React, { Component } from "react";
import "./NoticeDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class NoticeDetail extends Component {
  render() {
    return (
      <div className="kohub-noticedetail container">
        <div className="kohub-noticedetail__content content-area">
          <div className="kohub-noticedetail__header">
            <h2>공지사항</h2>
            <div className="kohub-noticedetail__manage">
              <Link to="/">
                <span>
                  <FontAwesomeIcon icon={faEdit} flip="horizontal" /> {""}수정
                </span>
              </Link>
              |
              <Link to="/">
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faTrashAlt} flip="horizontal" /> {""}
                  삭제
                </span>
              </Link>
            </div>
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticedetail__title-area ">
            <div className="kohub-noticedetail__title align-center-col">
              <span>게시글 제목입니다.</span>
            </div>
            <div className="kohub-noticedetail__user-info align-center-col">
              <span>작성자 : 닉네임</span>
              <br></br>
              <span>2020.00.00 HH:MM:SS</span>
            </div>
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
          <div className="kohub-noticedetail__article">
            <p>
              가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며
              얼마나 아름다우냐? 이것을 얼음 속에서 불러 내는 것이 따뜻한
              봄바람이다 인생에 따뜻한 봄바람을 불어 보내는 것은 청춘의 끓는
              피다 청춘의 피가 뜨거운지라 인간의 동산에는 사랑의 풀이 돋고
              이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다사랑의 풀이
              없으면 인간은 사막이다 오아이스도 없는 사막이다 보이는 끝까지
              찾아다녀도 목숨이 있는 때까지 방황하여도 보이는 것은 거친 모래뿐일
              것이다 이상의 꽃이 없으면 쓸쓸한 인간에 남는 것은 영락과 부패
              뿐이다 낙원을 장식하는 천자만홍이 어디 있으며 인생을 풍부하게 하는
              온갖 과실이 어디 있으랴? 그들의 이상은 아름답고 소담스러운 열매를
              맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을 ! 그들의 몸이
              얼마나 튼튼하며 그들의 피부가 얼마나 생생하며 그들의 눈에 무엇이
              타오르고 있는가? 우리 눈이 그것을 보는 때에 우리의 귀는 생의
              찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에
              스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서
              구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직
              우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 황금시대다
              우리는 이 황금시대의 가치를 충분히 발휘하기 위하여 이 황금시대를
              영원히 붙잡아 두기 위하여 힘차게 노래하며
            </p>
            <p>
              가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며
              얼마나 아름다우냐? 이것을 얼음 속에서 불러 내는 것이 따뜻한
              봄바람이다 인생에 따뜻한 봄바람을 불어 보내는 것은 청춘의 끓는
              피다 청춘의 피가 뜨거운지라 인간의 동산에는 사랑의 풀이 돋고
              이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다사랑의 풀이
              없으면 인간은 사막이다 오아이스도 없는 사막이다 보이는 끝까지
              찾아다녀도 목숨이 있는 때까지 방황하여도 보이는 것은 거친 모래뿐일
              것이다 이상의 꽃이 없으면 쓸쓸한 인간에 남는 것은 영락과 부패
              뿐이다 낙원을 장식하는 천자만홍이 어디 있으며 인생을 풍부하게 하는
              온갖 과실이 어디 있으랴? 그들의 이상은 아름답고 소담스러운 열매를
              맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을 ! 그들의 몸이
              얼마나 튼튼하며 그들의 피부가 얼마나 생생하며 그들의 눈에 무엇이
              타오르고 있는가? 우리 눈이 그것을 보는 때에 우리의 귀는 생의
              찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에
              스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서
              구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직
              우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 황금시대다
              우리는 이 황금시대의 가치를 충분히 발휘하기 위하여 이 황금시대를
              영원히 붙잡아 두기 위하여 힘차게 노래하며
            </p>
            <p>
              가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며
              얼마나 아름다우냐? 이것을 얼음 속에서 불러 내는 것이 따뜻한
              봄바람이다 인생에 따뜻한 봄바람을 불어 보내는 것은 청춘의 끓는
              피다 청춘의 피가 뜨거운지라 인간의 동산에는 사랑의 풀이 돋고
              이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다사랑의 풀이
              없으면 인간은 사막이다 오아이스도 없는 사막이다 보이는 끝까지
              찾아다녀도 목숨이 있는 때까지 방황하여도 보이는 것은 거친 모래뿐일
              것이다 이상의 꽃이 없으면 쓸쓸한 인간에 남는 것은 영락과 부패
              뿐이다 낙원을 장식하는 천자만홍이 어디 있으며 인생을 풍부하게 하는
              온갖 과실이 어디 있으랴? 그들의 이상은 아름답고 소담스러운 열매를
              맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을 ! 그들의 몸이
              얼마나 튼튼하며 그들의 피부가 얼마나 생생하며 그들의 눈에 무엇이
              타오르고 있는가? 우리 눈이 그것을 보는 때에 우리의 귀는 생의
              찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에
              스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서
              구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직
              우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 황금시대다
              우리는 이 황금시대의 가치를 충분히 발휘하기 위하여 이 황금시대를
              영원히 붙잡아 두기 위하여 힘차게 노래하며
            </p>
          </div>
          <div className="kohub-noticedetail__hr">
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
