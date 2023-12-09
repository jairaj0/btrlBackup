import jwt_decode from "jwt-decode";
import swal from "sweetalert";
// var WAValidator = require('multicoin-address-validator');

// var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');
// if(valid)
// 	console.log('This is a valid address');
// else
// 	console.log('Address INVALID');

// let logOut = JSON.parse(window.localStorage.getItem("logOutCount"));
// let reqSendCount = 0;
// let clickCount = 0;

export const refreshToken = async (_token) => {
  let token = `"${_token}"`;
  sessionStorage.setItem("user", token);
};

// const refreshTokenAutomatic = async () => {
//   const _rt = await authRequestNb("refresh-token");
//   if (_rt) {
//     if (_rt.refresh_token === false) {
//       window.alert("refresh token return False value");
//       userFuncion(false);
//       window.location.href = "/signin";
//       logOut = 0;
//       window.localStorage.setItem("logOutCount", 0);
//     }

//     refreshToken(_rt.refresh_token);
//     console.log(
//       "refreshTokenAutomatic",
//       _rt.refresh_token,
//       "Mouse Move",
//       reqSendCount,
//       "Time",
//       logOut,
//       "Click Count",
//       clickCount
//     );
//   }
//   // else {
//   //   window.alert("refresh token return error", _rt);
//   //   userFuncion(false);
//   //   window.location.href = "/signin";
//   //   logOut = 0;
//   //   window.localStorage.setItem("logOutCount", 0);
//   // }
// };

// window.addEventListener("mousemove", async () => {
//   window.localStorage.setItem("logOutCount", 0);
//   if (JSON.parse(localStorage.getItem("isLogin"))) {
//     logOut = 0;
//     reqSendCount++;
//     if (reqSendCount > 500) {
//       reqSendCount = 0;
//       clickCount = 0;
//       await refreshTokenAutomatic();
//     }
//   }
// });

setInterval(() => {
  if (JSON.parse(sessionStorage.getItem("isLogin"))) {
    const token = JSON.parse(sessionStorage.getItem("user"));
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 <= Date.now()) {
      swal("session expired  !");
      userFuncion(false);
      window.location.href = "/signin";
      // logOut = 0;
      // window.localStorage.setItem("logOutCount", 0);
    }
  }
}, 1000);

// window.addEventListener("click", async () => {
//   if (JSON.parse(localStorage.getItem("isLogin"))) {
//     clickCount++;
//     if (clickCount > 5) {
//       reqSendCount = 0;
//       clickCount = 0;
//       await refreshTokenAutomatic();
//     }
//   }
// });

export const sendRequest = async (data, _req) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const resp = await fetch("https://demo.btrlexchange.com/api/" + _req, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization:
        sessionStorage.getItem("isLogin") === "true"
          ? `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`
          : "",
      Cookie: "ci_session=9d575402035edfbb8df618ba3f668b47143df28b",
    },
    body: formBody,
  });
  return resp.json();
};

export const authRequestNb = async (_req) => {
  try {
    const resp = await fetch("https://demo.btrlexchange.com/api/" + _req, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
        Cookie: "ci_session=9d575402035edfbb8df618ba3f668b47143df28b",
      },
    });
    return resp.json();
  } catch (err) {
    if (err) {
      console.log(err.message);
    }
  }
};

export const authRequest = async (data, _req) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    const resp = await fetch("https://demo.btrlexchange.com/api/" + _req, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
        Cookie: "ci_session=9d575402035edfbb8df618ba3f668b47143df28b",
      },
      body: formBody,
    });
    return resp.json();
  } catch (err) {
    if (err) {
      console.log(err.message);
    }
  }
};

export const sendFileRequest = async (data, _req) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`
  );
  myHeaders.append(
    "Cookie",
    "ci_session=6777255e4b717ae7c32d79d8d3e04146ea6ae7b4"
  );

  var formdata = new FormData();

  for (let i = 0; i < Object.keys(data).length; i++) {
    const singleData = data[Object.keys(data)[i]];
    formdata.append(Object.keys(data)[i], singleData);
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const res = await fetch(
    `https://demo.btrlexchange.com/api/${_req}`,
    requestOptions
  );
  return res.json();
};

export const sendGetRequest = async (_req) => {
  const resp = await fetch("https://demo.btrlexchange.com/api/" + _req, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization:
        sessionStorage.getItem("isLogin") === "true"
          ? `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`
          : "",
      Cookie: "ci_session=9d575402035edfbb8df618ba3f668b47143df28b",
    },
  });
  return resp.json();
};

export const allLetter = (inputtxt) => {
  var letters = /^[a-zA-Z '.-]*$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const vpassword = (inputtxt) => {
  var letters =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{10,9999999}$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
};
export const alphanumeric = (inputtxt) => {
  var letters = /^[A-Z0-9_]*$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const vpancard = (inputtxt) => {
  var letters = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const vadhar = (inputtxt) => {
  if (inputtxt.length === 12) {
    return true;
  } else {
    return false;
  }
};

export const vphone = (inputtxt) => {
  var letters = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const vcpassword = (p, inputtxt) => {
  if (p) {
    if (vpassword(p) && p.indexOf(inputtxt) >= 0 && p === inputtxt) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const userLogin = (_value) => {
  _value === false && sessionStorage.setItem("user", "");
  sessionStorage.setItem("isLogin", _value);
};

export const userFuncion = (_value) => {
  _value === false && sessionStorage.setItem("user", "");
  sessionStorage.setItem("isLogin", _value);
  window.dispatchEvent(new Event("storage"));
};

// setInterval(async () => {
//   if (JSON.parse(localStorage.getItem("isLogin"))) {
//     logOut++;
//     logOut === 2 && (await refreshTokenAutomatic());
//     if (logOut > 1800) {
//       window.alert("Time out !");
//       userFuncion(false);
//       window.location.href = "/signin";
//       logOut = 0;
//       window.localStorage.setItem("logOutCount", 0);
//     }
//   }
// }, 1000);

export const shorter = (num) => {
  const firstAddressPart = shortener(num, 0, 6);
  const lastAddressPart = shortener(num, 36, 42);
  return `${firstAddressPart}...${lastAddressPart}`;
};

const shortener = (_data, _start, _end) => {
  let result = "";
  for (let i = _start; i < _end; i++) result = [...result, _data[i]];
  return result.join("");
};

export const contactPhoneCheck = (_no) => {
  if (_no.length > 6) {
    return true;
  } else {
    return false;
  }
};

export const mandsCheck = (_text) => {
  var letters = /^[a-zA-Z0-9 .,@]+$/;
  if (_text.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const deposit_history_headers = [
  ["Reference No.", "reference_no"],
  ["UTR No.", "utr_no"],
  ["Currency", "currency_symbol"],
  ["Quantity", "amount"],
  ["Deposited By", "deposited_by"],
  ["Confirmation", "confirmation"],
  ["Status", "status"],
  ["Remark", "remark"],
  ["Time", "created_at"],
];

export const trade_history_headers = [
  ["Reference No.", "reference_no"],
  ["Market", "market_symbol"],
  ["Currency", "currency_symbol"],
  ["Type", "type"],
  ["Quantity", "qty"],
  ["Price", "price"],
  ["Total", "total_amount"],
  ["Status", "status"],
  ["Time", "created_at"],
];

export const open_order_history_headers = [
  ["Reference No.", "reference_no"],
  ["Market", "market_symbol"],
  ["Currency", "currency_symbol"],
  ["Type.", "type"],
  ["Quantity", "qty"],
  ["Price", "price"],
  ["Total", "total_amount"],
  ["Status", "status"],
  ["Time", "created_at"],
];

export const withdraw_history_headers = [
  ["Reference No.", "reference_no"],
  ["Transaction Id", "transaction_id"],
  ["Address", "address"],
  ["Currency", "currency_symbol"],
  ["Quantity", "amount"],
  ["Fee", "fee"],
  ["Total", "total_amount"],
  ["Time", "created_at"],
];

let data = {};
let previousComparison = true;

export const isMax = (name, value) => {
  if (data.hasOwnProperty(name)) {
    if (data[name].length > 4) {
      data[name].shift();
    }
    let previousValue = data[name][data[name].length - 1];
    if (value > previousValue || value < previousValue) {
      let comparison = value > previousValue ? true : false;
      previousComparison = comparison;
      data[name].push(value);
      return comparison;
    } else {
      return previousComparison;
    }
  } else {
    data[name] = [value];
    return true;
  }
};

// {bid_price: '9', qty: '50', total: '450'} sample data
// {market: 'inr', currency: 'btrl', price: 10, amount: 50, buyTrade: true} sample order

export const trade = (order, buyData, setBuy, sellData, setSell) => {
    let buy = buyData.map((obj) => {
    Object.keys(obj).forEach((key) => {
      obj[key] = parseFloat(obj[key]);
    });
    return obj;
  });

  let sell = sellData.map((obj) => {
    Object.keys(obj).forEach((key) => {
      obj[key] = parseFloat(obj[key]);
    });
    return obj;
  });

  const edit = (newObject , old, get, set, buy) => {
    const change = get.map((obj) => {
      if (obj === old) {
        return newObject;
      } else {
        return obj;
      }
    });

    add(false, change, set, buy);
  };

  const remove = (toRemove, get, set, buy) => {
    let index = get.findIndex((obj) => obj === toRemove);
    delete get[index];
    add(false, get, set, buy);
  };

  const add = (addObject, get, set, buy) => {
    const _temp = addObject ? [addObject, ...get] : get;

    let temp = _temp.reduce(function(acc, obj) {
      let existingObj = acc.find(function(existingObj) {
          return existingObj.bid_price === obj.bid_price;
      });
      if (existingObj) {
          existingObj.qty += obj.qty;
          existingObj.total += obj.total;
      } else {
          acc.push(obj);
      }
      return acc;
  }, []);
    if (buy) {
      set(temp.sort((a, b) => (a.bid_price < b.bid_price ? 1 : -1)));
    } else {
      set(temp.sort((a, b) => (a.bid_price > b.bid_price ? 1 : -1)));
    }
  };

  sell =  sell.filter(item => !(item === undefined || item === {}));
  buy =  buy.filter(item => !(item === undefined || item === {}));

  // console.log("Order" , order)

  if(order.buyTrade){
    // when buy click
    let index = sell?.length !== 0  ? sell?.findIndex(obj => obj.bid_price <= order.price) : -1;
    if(sell[index]){
      if(sell[index].qty === order.amount){
        remove(sell[index] , sell , setSell , false)
      }else if(sell[index].qty > order.amount){
        edit({qty : sell[index].qty - order.amount , bid_price : sell[index].bid_price , total : (sell[index].qty - order.amount) * order.price} ,sell[index],sell ,setSell , false)
      }else if(sell[index].qty < order.amount){
        const _order = {...order , amount: order.amount - sell[index].qty, buyTrade: true} 
        remove(sell[index] , sell , setSell , false)
        trade(_order , buy, setBuy, sell, setSell)
      }
    }else{
      add({qty : order.amount , bid_price : order.price , total : order.amount * order.price} , buy , setBuy , true)
    }
  }else{
    // when sell click
    let index = buy?.length !== 0 ? buy?.findIndex(obj => obj.bid_price >= order.price) : -1;
    if(buy[index]){
      if(buy[index].qty === order.amount){
        remove(buy[index] , buy , setBuy , true)
      }else if(buy[index].qty > order.amount){
        edit({qty : buy[index].qty - order.amount , bid_price : buy[index].bid_price , total : (buy[index].qty - order.amount) * order.price} ,buy[index],buy ,setBuy , true)
      }else if(buy[index].qty < order.amount){
        const _order = {...order , amount: order.amount - buy[index].qty, buyTrade: false};
        remove(buy[index] , buy , setBuy , true)
        trade(_order , buy, setBuy, sell, setSell)
      }
    }else{
      add({qty : order.amount , bid_price : order.price , total : order.amount * order.price} , sell , setSell , false)
    }
  }
}

export const usernoCheck = (no) =>{
  const decoded = jwt_decode(sessionStorage.getItem('user'));
  return decoded.user === no;
}

export const openOrderDataHandler = (_old , current , set) => {
  if(_old){
    const old =  _old.filter(item => !(item === undefined || item === {}));
    const index = old?.findIndex(obj => parseInt(obj.tradeID) === parseInt(current.tradeID))
    if(old[index]){
      if(current.remaining === 0 ){
        set(old.filter(obj => parseInt(obj.tradeID) !== parseInt(current.tradeID)))
      }else{
        old[index] = current;
      set(old)
      }
    }else{
      current.remaining !== 0 && set([current , ...old])
    }
  }else{
    current.remaining !== 0 && set([current , ..._old])
  }
}

// export const openOrderDataHandler = (_old , current , set) => {
//   console.log(current)
//   if(_old){
//     const old =  _old.filter(item => !(item === undefined || item === {}));
//     const index = old?.findIndex(obj => obj.tradeID === current.tradeID)
//     old[index] && console.log(old[index])
//   if(old[index]){
//     // console.log(old[index])
//     if(old[index].remaining === 0){
//       set(old.filter(obj => obj.tradeID !== current.tradeID))
//     }else if(old[index].remaining !== 0){
//       old[index] = current;
//       set(old)
//     }
//   }else{
//     current.remaining !== 0 && set([current , ...old])
//   }
//   }else{
//     current.remaining !== 0 && set([current , ..._old])
//   }
// }
