/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time) {
  if (time) {
    return time.toString().slice(0, 16);
  }
}

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

// 指定小数点
export function numberFormat(value) {
  var v = parseInt(value); //强转Int，毕竟有可能返回是String类型的数字
  return v.toFixed(2);
}

export function isHKCard(code) {
  // 港澳居民来往内地通行证
  // 规则： H/M + 10位或6位数字
  // 样本： H1234567890
  var pass = true;
  var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
  if (reg.test(code) === false) {
    pass = false;
  } else {
    pass = true;
  }
  return pass;
}

export function isTWCard(code) {
  // 台湾居民来往大陆通行证
  // 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
  // 样本： 12345678 或 1234567890B
  var pass = true;
  var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
  if (reg.test(code) === false) {
    pass = false;
  } else {
    pass = true;
  }
  return pass;
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

// 身份证号加*
export function plusXing(str, frontLen, endLen) {
  var len = str.length - frontLen - endLen;
  var xing = "";
  for (var i = 0; i < len; i++) {
    xing += "*";
  }
  return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
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

export function IdentityCodeValid (code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外", 99: "香港" };
  var tip = "";
  var pass = true;
  //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  }

  else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  }
  else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      //最后一位不区分大小写
      if (code[17] == 'x') code[17] = code[17].toUpperCase();
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  // if(!pass) alert(tip);
  return pass;
}

export const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value);
