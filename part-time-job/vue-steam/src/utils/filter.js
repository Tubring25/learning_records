
// localStorage存储
export function saveLocal(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}
export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function removeLocal(key) {
  return localStorage.removeItem(key);
}

// 去掉空格
export function removeAllSpace(str) {
  return str.replace(/\s+/g, "");
}

// 校验电话号码
export function validatePhoneNumber(str) {
  const reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/;
  return reg.test(str);
}

// 判断时间范围
export function time_range(beginTime, endTime, targetTime) {
  let strb = beginTime.split(":");
  let stre = endTime.split(":");
  let strn = targetTime.split(":");
  var b = new Date();
  var e = new Date();
  var n = new Date();

  b.setHours(strb[0]);
  b.setMinutes(strb[1]);
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);
  n.setHours(strn[0]);
  n.setMinutes(strn[1]);

  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
    return true;
  } else {
    return false;
  }
}

export const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value);
