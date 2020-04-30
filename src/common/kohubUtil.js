const ApiUtil = {
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

export { ApiUtil };
