import React,{useState , useEffect , useRef} from 'react';
import Context from './Context/Context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Exchange from './Pages/Exchange/Exchange';
import Register from './Pages/Register/Register';
import ContactUs from './Pages/ContactUs/ContactUs';
import News from './Pages/News/News';
import Fees from './Pages/Fees/Fees';
import UnderMaintenance from './Pages/InfoPages/UnderMaintenance/UnderMaintenance';
import SignIn from './Pages/SignIn/SignIn';
import Coininfo from './Pages/Coininfo/Coininfo';
import NoteFound from './Pages/InfoPages/NotFound/NotFound';
import Approved from './Pages/InfoPages/Approved/Approved';
import BankDetails from './Pages/Secure/BankDetails/BankDetails';
import Balance from './Pages/Secure/Balance/Balance';
import Refferal from './Pages/Secure/Refferal/Refferal';
import History from './Pages/Secure/History/History';
// import PersonalInfo from './Pages/Secure/PersonalInfo/PersonalInfo';
import Stack from './Pages/Secure/Stack/Stack';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import NewsDetails from './Pages/NewsDetails/NewsDetails';

import About from './Pages/Information/About';
import Refundpolicy from './Pages/Information/Refundpolicy';
import Termscondition from './Pages/Information/Termscondition';
import Privacypolicy from './Pages/Information/Privacypolicy';
import Riskstatement from './Pages/Information/Riskstatement';
import Security from './Pages/Secure/Security/Security';
import { usernoCheck } from './Helper/helper';




function App() {
  const [states , updateChanges] = useState({
    "dmode" : JSON.parse(localStorage.getItem("dmode")) ,
    "swidth": window.innerWidth,
    "stokenbtn":false,
    "buyTrade":true,
    "isLogin":JSON.parse(sessionStorage.getItem("isLogin")),
  })
  function changeState( a , b , c , d , e , f) {
    updateChanges({
      "dmode" : a ,
      "swidth": b,
      "stokenbtn":c,
      "buyTrade":d,
      "isLogin":e,
    })
  }
  const [orderByWs, setOrderByWs] = useState();
  const [balance, setBalance] = useState();
  const [marketHistory, setMarketHistory] = useState();
  const [tradeHistory, setTradeHistory] = useState();
  const [openOrder, setOpenOrder] = useState();
  const [cancelOrder, setCancelOrder] = useState();



  const socketAddress = "wss://echo.btrlexchange.com:8089/";
  const ws = useRef(null);

  const onOpenWebsocket = (evt) => {
    // console.log('BINANCE onopen evt => ', evt);
 }
 
 
 const balanceObj = {};

 const onMessageWebsocket = (evt) => {
  if(evt.data && JSON.parse(evt.data).btrl){
    const data = JSON.parse(evt.data).btrl;

    let tradeData = null;

  
  if(data){
    console.log(data)
    try {
      if(Object.keys(data)[0] === 'trade'){
        tradeData = data.trade;
        const order = {market: tradeData.market, currency: tradeData.currency, price: parseFloat(tradeData.price), amount: parseFloat(tradeData.amount), buyTrade: tradeData.type === "Buy" ? true : false}
      setOrderByWs(order)
      }else if(Object.keys(data)[0] === 'balance' &&  usernoCheck(data.balance.users)){
        // balanceObj[data.balance.currency_symbol.toUpperCase()] = data.balance.balance
        setBalance(balanceObj)
      }else if(Object.keys(data)[0] === "market_history"){
        setMarketHistory(data.market_history)
      }else if(Object.keys(data)[0] === "trade_history" &&  usernoCheck(data.trade_history.users)){
        setTradeHistory(data.trade_history)
      }else if(Object.keys(data)[0] === "open_order" &&  usernoCheck(data.open_order.users)){
        setOpenOrder(data.open_order)
      }else if(Object.keys(data)[0] === "order_cancel"){
        setCancelOrder(data.order_cancel);
      }
    } catch (err) {
      err && console.log(err.message)
    }
  }
  }
 }




 
 const onCloseWebsocket = (evt) => {
    // console.log('BINANCE onclose evt => ', evt)
 }
 
 const onErrorWebsocket = (evt) => {
    // console.log('BINANCE onerror evt => ', evt)
 }

useEffect(()=>{
          ws.current = new WebSocket(socketAddress);
          ws.current.onopen = onOpenWebsocket;
          ws.current.onmessage = onMessageWebsocket;
          ws.current.onclose = onCloseWebsocket;
          ws.current.onerror = onErrorWebsocket;
    },[socketAddress])


  return (
    <Context.Provider value={{states , changeState}}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/exchange/*" exact element={<Exchange openOrder={openOrder} orderByWs={orderByWs} balance={balance} tradeHistory={tradeHistory} marketHistory={marketHistory} />} />
          <Route path="/contact-us" exact element={<ContactUs />} />
          <Route path="/news" exact element={<News />} />
          <Route path="/news/*" exact element={<NewsDetails />} />
          <Route path="/fees" exact element={<Fees />} />
          <Route path="/coininfo" exact element={<Coininfo />} />

          {/* *********** Secure ********** */}

            <Route path='/bank-details' exact element={states.isLogin ?<BankDetails /> : <SignIn _redirect='bank-details' />} />
          <Route path='/balance' exact element={states.isLogin ?<Balance /> : <SignIn _redirect='balance' />} />
          <Route path='/refferal' exact element={states.isLogin ?<Refferal /> : <SignIn _redirect='refferal' />} />
          <Route path='/history' exact element={states.isLogin ? <History /> : <SignIn _redirect='history' />} />
          {/* <Route path='/personal-information' exact element={states.isLogin ?<PersonalInfo /> : <SignIn _redirect='personal-information' />} /> */}
          <Route path='/stack' exact element={states.isLogin ?<Stack /> : <SignIn _redirect='stack' />} />
          <Route path="/security" exact element={states.isLogin ? <Security /> : <NoteFound />} />
          <Route path="/change-password" exact element={states.isLogin ? <ChangePassword /> : <NoteFound />} />

          <Route path="/signup" exact element={!states.isLogin ? <Register /> : <NoteFound />} />
          <Route path="/signin" exact element={!states.isLogin ? <SignIn /> : <NoteFound />} />
          <Route path="/forget-password" exact element={!states.isLogin ? <ForgetPassword /> : <NoteFound />} />
          <Route path="/reset-password/*" exact element={!states.isLogin ? <ResetPassword /> : <NoteFound />} />
          {/* *********** Secure ********** */}

          <Route path="/under-maintenance" exact element={<UnderMaintenance />} />
          <Route path="/*" exact element={<NoteFound />} />
          <Route path="/verify-email/*" exact element={<VerifyEmail />} />
          <Route path="/approved" exact element={<Approved />} />

          <Route path="/about" exact element={<About />} />
          <Route path="/refund-policy" exact element={<Refundpolicy />} />
          <Route path="/terms-and-conditions" exact element={<Termscondition />} />
          <Route path="/privacy-policy" exact element={<Privacypolicy />} />
          <Route path="/risk-statement" exact element={<Riskstatement />} />

        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
