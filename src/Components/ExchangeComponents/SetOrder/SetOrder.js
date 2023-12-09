import React, { useState, useEffect, useMemo } from "react";
import styles from "./SetOrder.module.scss";
import { authRequest, refreshToken } from "../../../Helper/helper";
import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
import Swal from 'sweetalert2';

let rerender=0;

const SetOrder = ({
  userBalance,
  setOrder,
  dmode,
  buyTrade,
  setBuyTrade,
  tradeData,
  _isLogin,
  bid,
  setBid,
}) => {
  const [percent, setPercent] = useState();
  const [isMatch, setIsMatch] = useState(true);
  const [isTradable, setIsTradable] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [firstCheck, setFirstCheck] = useState(null);
  // const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    price: "",
    amount: "",
    total: "",
  });
  const [currentTrade, setCurrentTrade] = useState({});

  const navigate = useNavigate();

  const trade = (_trade) => {
    if (_trade === "sell") {
      setBuyTrade(false);
    } else {
      setBuyTrade(true);
    }
  };

  const errorHandler = (key, val) => {
    let change = errorMessage;
    change[key] = val;
    setErrorMessage({ ...change });
  };

  const submitHandler = async (e) => {
    if (_isLogin) {
      if (
        formData.price &&
        formData.amount &&
        formData.total &&
        currentTrade.balance > formData.total
      ) {
        const _formData = {
          market: currentTrade.market.toLowerCase(),
          currency: currentTrade.currency.toLowerCase(),
          price: formData.price,
          amount: formData.amount,
        }

        setOrder({..._formData , buyTrade : buyTrade })

        const res = await authRequest(
          _formData,
          buyTrade ? "buy":"sell"
        );

        res.refresh_token && refreshToken(res.refresh_token);
        let timerInterval
        res && Swal.fire({
          html: res.message,
          timer: 2000,
          timerProgressBar: true,
          position : "top-right",
          padding : "1rem",
          showConfirmButton : false,
          scrollbarPadding : false ,
          allowOutsideClick : false,
          backdrop : false,
          customClass : {
            timerProgressBar: 'tgb',
            popup: 'popup',
            htmlContainer : 'htmlContainer',
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
        // setMessage(res.message)
      }else{
        console.log(formData , errorMessage)
      }
    } else {
      navigate("/signin");
    }
  };

  const formHandler = (key, value) => {
    const change = formData;
    change[key] = value && parseFloat(value);
    if (
      (formData.price && formData.amount) ||
      (formData.price && formData.total)
    ) {
      if (key === "total") {
        if (formData.total) {
          change["amount"] = value && formData.price && value / formData.price;
        } else {
          change["amount"] = "";
          change["total"] = "";
        }
      }
      if (key === "amount") {
        if (formData.amount) {
          change["total"] = value && formData.price && value * formData.price;
        } else {
          change["total"] = "";
          change["amount"] = "";
        }
      }
      if (key === "price") {
        if (formData.price) {
          change["total"] = value && formData.price && value * formData.amount;
        } else {
          change["total"] = "";
          change["price"] = "";
        }
      }
    } else {
      change["total"] = "";
    }
    setFormData({ ...change });
  };

  useMemo(() => {
    setErrorMessage({});
    if (formData && currentTrade) {
      if (
        (parseFloat(currentTrade.balance) * parseFloat(percent)) / 100 ===
        formData.total
      ) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
        setPercent();
      }

      if (currentTrade.balance > 0) {
        errorHandler("balance","" );
        if (
          currentTrade.min_trade > formData.amount ||
          formData.total > currentTrade.balance
        ) {
          formData.total > currentTrade.balance &&
            currentTrade.balance &&
            errorHandler(
              "balance",
              `Insufficient balance ,  balance : ${currentTrade.balance}`
            );
          currentTrade.min_trade > formData.amount &&
            currentTrade.min_trade &&
            errorHandler(
              "min_trade",
              `minimum trade amount : ${currentTrade.min_trade}`
            );
          setIsTradable(false);
        } else {
          errorHandler(
            "min_trade",
            ``
          );
          setIsTradable(true);
        }
        if(formData.price === 0 || !formData.price){
          setIsTradable(false)
          !formData.price &&  errorHandler("price" , "Please enter price")
          formData.price === 0 &&  errorHandler("price" , "Please enter valid price")
        }else{
          formData.price > 0 &&  errorHandler("price" , "")
        }
      } else {
        currentTrade.balance !== undefined &&
          currentTrade?.balance === 0 &&
          errorHandler(
            "balance",
            `Insufficient balance ,  balance : ${currentTrade.balance}`
          );
        setIsTradable(false);
      }
    }
  }, [formData, currentTrade]);

  useMemo(() => {
if(currentTrade.balance){
  currentTrade.price &&
  formHandler("price", currentTrade?.price ? currentTrade?.price : 0);
currentTrade.min_trade &&
  formHandler(
    "amount",
    currentTrade?.min_trade ? currentTrade?.min_trade : 0
  );
currentTrade.min_trade &&
  currentTrade.price &&
  formHandler("total", currentTrade?.min_trade * currentTrade.price);
}
  }, [currentTrade]);



  const percentHandler = (per) => {
    setPercent(parseFloat(per));
    formData.price &&
      formHandler(
        "total",
        (parseFloat(currentTrade.balance) * parseFloat(per)) / 100
      );
  };

  useEffect(() => {
    !formData.price && setPercent("");
    if (
      (parseFloat(currentTrade.balance) * parseFloat(percent)) / 100 ===
      formData.total
    ) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
      setPercent();
    }
    setBid();
  }, [percent]);

  useEffect(() => {
    bid &&
      setFormData({
        price: parseFloat(bid.bid_price),
        amount: parseFloat(bid.qty),
        total: parseFloat(bid.total),
      });
  }, [bid]);


  useEffect(() => {
    if (_isLogin && tradeData && userBalance) {
      if (buyTrade) {
        setCurrentTrade({
          balance: userBalance.buy_balance && userBalance.buy_balance,
          fee: tradeData.buy_fee,
          currency: tradeData.currency_symbol,
          market: tradeData.market_symbol,
          price: parseFloat(tradeData.price),
          min_trade: parseFloat(tradeData.minimum_trade),
        });
      } else {
        setCurrentTrade({
          balance: userBalance.sell_balance && userBalance.sell_balance,
          fee: tradeData.sell_fee,
          currency: tradeData.currency_symbol,
          market: tradeData.market_symbol,
          price: parseFloat(tradeData.price),
          min_trade: parseFloat(tradeData.minimum_trade),
        });
      }
    }
    setFormData({
      price: "",
      amount: "",
      total: "",
    });
    setPercent();
  }, [firstCheck , buyTrade]);

//   useEffect(() => {
//  if(userBalance){
//   if(buyTrade){
//     !isNaN(userBalance.buy_balance) && setCurrentTrade({...currentTrade , balance: userBalance.buy_balance,})
//   }else{
//     !isNaN(userBalance.sell_balance) && setCurrentTrade({...currentTrade , balance: userBalance.sell_balance,})
//   }
//  }
//   }, [userBalance , buyTrade , rerender])
  
if(userBalance){
  if(buyTrade){
    if(currentTrade.balance !== userBalance.buy_balance){
      !isNaN(userBalance.buy_balance) && setCurrentTrade({...currentTrade , balance: userBalance.buy_balance,})
    }
  }else{
    if(currentTrade.balance !== userBalance.sell_balance){
    !isNaN(userBalance.sell_balance) && setCurrentTrade({...currentTrade , balance: userBalance.sell_balance,})
    }
  }
}

  useEffect(() => {
    if(firstCheck === null){
      if (_isLogin && tradeData && userBalance) {
      setFirstCheck(true);
      }
    }
  }, [buyTrade, _isLogin, tradeData, userBalance]);
  

  return (
    <section className={dmode ? styles.so_d : styles.so_l}>
      <div className={`${styles.trademode} flex-between`}>
        <button
          onClick={() => trade("buy")}
          className={buyTrade ? styles.buybtn : ""}
        >
          BUY {tradeData?.currency_symbol}
        </button>
        <button
          onClick={() => trade("sell")}
          className={buyTrade ? "" : styles.sellbtn}
        >
          SELL {tradeData?.currency_symbol}
        </button>
      </div>
      <h2>
        {buyTrade ? "BUY" : "SELL"} {currentTrade?.currency}
      </h2>
      <div className={`${styles.buy} flex-between`}>
        <input
          min={0}
          onChange={(e) => formHandler("price", e.target.value)}
          value={formData.price}
          type="number"
          placeholder="0.000000"
          name="_price"
        />{" "}
        <h4>
          Price <span>{tradeData?.market_symbol}</span>
        </h4>
        {errorMessage.price && (
          <p className={styles.warning_note}>{errorMessage.price}</p>
        )}
      </div>

      <div className={`${styles.amount} flex-between`}>
        <input
          min={0}
          onChange={(e) => formHandler("amount", e.target.value)}
          value={formData.amount}
          type="number"
          placeholder="0.000000"
          name="_amount"
        />{" "}
        <h4>
          Amount <span>{tradeData?.currency_symbol}</span>
        </h4>
        {errorMessage.min_trade && (
          <p className={styles.warning_note}>{errorMessage.min_trade}</p>
        )}
      </div>

      <div className={`${styles.percents} flex-around`}>
        <button
          disabled={
            currentTrade.balance && currentTrade.balance > 0 ? false : true
          }
          onClick={() => percentHandler(25)}
          className={percent === 25 && isMatch ? styles.active : ""}
        >
          25%
        </button>
        <button
          disabled={
            currentTrade.balance && currentTrade.balance > 0 ? false : true
          }
          onClick={() => percentHandler(50)}
          className={percent === 50 && isMatch ? styles.active : ""}
        >
          50%
        </button>
        <button
          disabled={
            currentTrade.balance && currentTrade.balance > 0 ? false : true
          }
          onClick={() => percentHandler(75)}
          className={percent === 75 && isMatch ? styles.active : ""}
        >
          75%
        </button>
        <button
          disabled={
            currentTrade.balance && currentTrade.balance > 0 ? false : true
          }
          onClick={() => percentHandler(100)}
          className={percent === 100 && isMatch ? styles.active : ""}
        >
          100%
        </button>
      </div>
      <div className={`${styles.total} flex-between`}>
        <span>Total</span>
        <input
          onChange={(e) => formHandler("total", e.target.value)}
          value={formData.total}
          min={0}
          type="number"
          placeholder="0.00000"
        />
        {errorMessage.balance && (
          <p className={styles.warning_note}>{errorMessage.balance}</p>
        )}
      </div>

      <div className="flex-between">
        <p>
          Fees ( {currentTrade?.fee} %) <br />
          {buyTrade ? currentTrade.market : currentTrade.currency} Bal.
        </p>
        <h3>{currentTrade?.balance ? currentTrade?.balance : ""}</h3>
      </div>
      <button
        disabled={_isLogin && !isTradable ? true : false}
        style={{ opacity: _isLogin && !isTradable ? "0.5" : "1" }}
        onClick={submitHandler}
        className={styles.si}
      >
        {_isLogin ? (buyTrade ? "Buy Now" : "Sell Now") : "Sign In"}
      </button>
    </section>
  );
};

export default SetOrder;
