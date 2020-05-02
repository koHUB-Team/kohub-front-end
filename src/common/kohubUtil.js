//API 처리 관련 유틸 객체
const ApiUtil = {
  //객체를 인자로 받아서 객체의 프로퍼티명과 값을 쿼리스트링으로 변경해서 반환
  parseObjToQueryStr: function (Obj) {
    let queryStr = Object.keys(Obj).reduce((acc, cur, idx) => {
      if (idx !== 0) {
        acc += "&";
      }
      return acc + `${cur}=${Obj[cur]}`;
    }, "?");
    return queryStr;
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
