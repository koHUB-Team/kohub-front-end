//API 처리 관련 유틸 객체
const ApiUtil = {
  //객체를 인자로 받아서 객체의 프로퍼티명과 값을 쿼리스트링으로 변경해서 반환
  parseObjToQueryStr: function (obj) {
    let queryStr = Object.keys(obj).reduce((acc, cur, idx) => {
      if (idx !== 0) {
        acc += "&";
      }
      return acc + `${cur}=${obj[cur]}`;
    }, "?");
    return queryStr;
  },

  //객체와 url을 인자로 받아서 url에 {...}부분과 객체의 프로퍼티 명과 일치하는 부분을 찾아서
  //프로퍼티 값으로 치환해줌
  bindPathVariable: function (url, obj) {
    console.log(obj);
    return Object.keys(obj).reduce((acc, key) => {
      return acc.replace(`{${key}}`, obj[key]);
    }, url);
  },
};

//Dom 조작 관련 유틸 객체
const DomUtil = {
  //element가 인자로 받은 class를 가지고 있는지 검사
  hasClassByClassName(element, className) {
    let hasClass = false;
    let classList = element.classList;
    let filteredClassList = Object.values(classList).filter((_className) => {
      if (_className === className) {
        return _className;
      }
    });

    if (filteredClassList.length > 0) {
      hasClass = true;
    }
    return hasClass;
  },
};

export { ApiUtil, DomUtil };
