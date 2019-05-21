function stampToDate (timestamp) {
  let _date = new Date (+timestamp);
  return `${_date.getFullYear ()}-${_date.getMonth () + 1}-${_date.getDay ()}`;
}

function getTimeStamp () {
  let _date = new Date ();
  return _date.getTime ();
}
//时间戳转真实时间
//获取当前时间戳
export {stampToDate, getTimeStamp};
