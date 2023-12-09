import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BuyOrderChart from "../../Components/ExchangeComponents/BuyOrderChart/BuyOrderChart";
import MarketChart from "../../Components/ExchangeComponents/MarketChart/MarketChart";
import MarketHistory from "../../Components/ExchangeComponents/MarketHistory/MarketHistory";
import News from "../../Components/ExchangeComponents/News/News";
import OpenOrder from "../../Components/ExchangeComponents/OpenOrder/OpenOrder";
import SearchCurrency from "../../Components/ExchangeComponents/SearchCurrency/SearchCurrency";
import SellOrderChart from "../../Components/ExchangeComponents/SellOrderChart/SellOrderChart";
import SetOrder from "../../Components/ExchangeComponents/SetOrder/SetOrder";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import {
  authRequest,
  refreshToken,
  sendRequest,
  trade,
} from "../../Helper/helper";
import styles from "./Exchange.module.scss";

const Exchange = ({
  orderByWs,
  ticker,
  cancelOrder,
  balance,
  marketHistory,
  tradeHistory,
  openOrder,
}) => {
  const { states } = useContext(Context);
  const [minimdata, setMinimdata] = useState();
  const [buyTrade, setBuyTrade] = useState(true);
  const [buyOrderData, setBuyOrderData] = useState([]);
  const [sellOrderData, setSellOrderData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [bid, setBid] = useState();
  const [order, setOrder] = useState();
  const [userBalance, setUserBalance] = useState();
  const dmode = states.dmode;
  const isLogin = states.isLogin;

  const navigate = useNavigate();

  const setTrade = (pair) => {
    const [cs, ms] = pair.split("_");
    navigate(`/exchange/${cs}/${ms}`);
  };

  useEffect(() => {
    (async () => {
      const res = await sendRequest(
        {
          currency: minimdata?.currency_symbol,
          market: minimdata?.market_symbol,
        },
        "buy-orders"
      );
      res.data ? setBuyOrderData(res.data.reverse()) : setBuyOrderData([]);
      const ressell = await sendRequest(
        {
          currency: minimdata?.currency_symbol,
          market: minimdata?.market_symbol,
        },
        "sell-orders"
      );
      ressell.data
        ? setSellOrderData(ressell.data.reverse())
        : setSellOrderData([]);
      res.refresh_token && refreshToken(res.refresh_token);
    })();
  }, [minimdata]);

  // useEffect(() => {
  //   if(order){
  //     trade(order, buyOrderData, setBuyOrderData, sellOrderData, setSellOrderData)
  //   }
  // }, [order])

  useEffect(() => {
    (async () => {
      if (isLogin && minimdata) {
        const mres = await authRequest(
          { currency: minimdata.market_symbol },
          "balance"
        );
        const cres = await authRequest(
          { currency: minimdata.currency_symbol },
          "balance"
        );
        cres.refresh_token && refreshToken(cres.refresh_token);
        setUserBalance({
          buy_balance: parseFloat(mres.data[0].available_balance),
          sell_balance: parseFloat(cres.data[0].available_balance),
        });
      }
    })();
    if (orderByWs) {
      if (
        orderByWs.market.toUpperCase() === minimdata.market_symbol &&
        orderByWs.currency.toUpperCase() === minimdata.currency_symbol
      ) {
        trade(
          orderByWs,
          buyOrderData,
          setBuyOrderData,
          sellOrderData,
          setSellOrderData
        );
      }
    }
  }, [orderByWs, minimdata]);

  useEffect(() => {
    // {type: 'Buy', price: '4', qty: '50', market_symbol: 'inr', currency_symbol: 'btrl'} cancleOrder
    // {market: 'inr', currency: 'btrl', price: 4, amount: 50, buyTrade: true} new Order
    if (cancelOrder) {
      const order = {
        market: cancelOrder.market_symbol,
        currency: cancelOrder.currency_symbol,
        price: parseFloat(cancelOrder.price),
        amount: parseFloat(cancelOrder.qty),
        buyTrade: cancelOrder.type === "Buy" ? false : true,
      };
      trade(
        order,
        buyOrderData,
        setBuyOrderData,
        sellOrderData,
        setSellOrderData
      );
    }
  }, [cancelOrder]);


  useMemo(() => {
    if(balance[1] && minimdata){
      const _userBalance = userBalance;
      _userBalance.buy_balance = balance[1][minimdata?.market_symbol].available_balance
      _userBalance.sell_balance = balance[1][minimdata?.currency_symbol].available_balance
      setUserBalance(_userBalance)
    }
  }, [balance[0] , minimdata])


  useEffect(() => {
    if(ticker && minimdata){
      setMinimdata({...minimdata,...ticker,
        market_symbol : ticker.market_symbol.toUpperCase(),
        currency_symbol : ticker.currency_symbol.toUpperCase(),
      })
    }
  }, [ticker])

  return (
    <section className={dmode ? styles.exchange_d : styles.exchange_l}>
      <Navbar />
      <div className={styles.exchange_grids}>
        <SearchCurrency
          dmode={dmode}
          ticker={ticker}
          tradeChange={setTrade}
          smdata={setMinimdata}
          popup={popup}
          setPopup={setPopup}
        />
        <MarketChart
          miniData={minimdata}
          dmode={dmode}
          popup={popup}
          setPopup={setPopup}
        />
        <BuyOrderChart
          bdata={buyOrderData}
          buyTrade={buyTrade}
          trade={minimdata}
          setBid={setBid}
          dmode={dmode}
        />
        <SetOrder
          userBalance={userBalance}
          setOrder={setOrder}
          bid={bid}
          setBid={setBid}
          buyTrade={buyTrade}
          setBuyTrade={setBuyTrade}
          dmode={dmode}
          tradeData={minimdata}
          _isLogin={isLogin}
        />
        <SellOrderChart
          sdata={sellOrderData}
          buyTrade={buyTrade}
          trade={minimdata}
          setBid={setBid}
          dmode={dmode}
        />
        <MarketHistory
          trade={minimdata}
          marketHistory={marketHistory}
          dmode={dmode}
        />
        <OpenOrder
          trade={minimdata}
          tradeHistory={tradeHistory}
          openOrder={openOrder}
          dmode={dmode}
          _isLogin={isLogin}
        />
        <News dmode={dmode} />
      </div>
      <Footer />
    </section>
  );
};

export default Exchange;
