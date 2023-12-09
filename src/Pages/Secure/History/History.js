import React, { useContext, useState, useEffect } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import styles from "./History.module.scss";
import { BiTransfer, BiSortUp } from "react-icons/bi";
import { ImUpload3, ImDownload3 } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import {
  authRequest,
  authRequestNb,
  deposit_history_headers,
  open_order_history_headers,
  refreshToken,
  trade_history_headers,
  withdraw_history_headers,
} from "../../../Helper/helper";
import Table from "./Table";
typeof localStorage.getItem("history") !== "string" && localStorage.setItem("history", "deposit_history")


const History = () => {
  const [svalue, setSvalue] = useState(4);
  const [activeValue, setActiveValue] = useState(localStorage.getItem("history"));
  const [currencyFilters, setCurrencyFilters] = useState();
  const [pairsFilters, setPairsFilters] = useState();
  const [data, setData] = useState({});
  const [allFiters, setAllFiters] = useState({deposit_history: '', trade_history: '', withdraw_history: '', open_order_history: ''});
  const [allPagesData, setAllPagesData] = useState(JSON.parse(localStorage.getItem("Pages")) ? JSON.parse(localStorage.getItem("Pages")) : {deposit_history: 1, trade_history: 1, withdraw_history: 1, open_order_history: 1})
  // const [allPagesData, setAllPagesData] = useState({deposit_history: 1, trade_history: 1, withdraw_history: 1, open_order_history: 1})
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const { states } = useContext(Context);

  const setFilters = (key, val) => {
    let change = allFiters;
    change[key] = val;
    setAllFiters({ ...change });
  };

  const onOptionChangeHandler = async(event) => {
    setFilters(activeValue , event.target.value)
    if(activeValue === "deposit_history"){
      const dhres = await authRequest({
        currency : event.target.value,
        start : '0',
        limit : '10',
      },"deposit-history")
      refreshToken(dhres.refresh_token)
      setDataFunc("deposit_history",dhres)
    }else if(activeValue === "trade_history"){
      const etv = event.target.value.split(",");
      const thres = await authRequest({
        currency : etv[0],
        market : etv[1] ? etv[1] : "",
        start : '0',
        limit : '10',
      },"order-history")
      refreshToken(thres.refresh_token)
      setDataFunc("trade_history",thres)
    }else if(activeValue === "withdraw_history"){
      const thres = await authRequest({
        currency : event.target.value,
        start : '0',
        limit : '10',
      },"withdraw-history")
      refreshToken(thres.refresh_token)
      setDataFunc("withdraw_history",thres)
    }else if(activeValue === "open_order_history"){
      const etv = event.target.value.split(",");
      const thres = await authRequest({
        currency : etv[0],
        market : etv[1] ? etv[1] : "",
        start : '0',
        limit : '10',
      },"inorder")
      refreshToken(thres.refresh_token)
      setDataFunc("open_order_history",thres)
    }
  }


  const dmode = states.dmode;

  const setFunc = () => {
    const ssize = window.innerWidth;
    if (ssize >= 1192) {
      setSvalue(4);
    }
    if (ssize <= 1176) {
      setSvalue(3);
    }
    if (ssize <= 999) {
      setSvalue(2);
    }
    if (ssize <= 800) {
      setSvalue(1);
    }
    if (ssize <= 590) {
      setSvalue(2);
    }
    if (ssize <= 500) {
      setSvalue(1);
    }
  };

  const setDataFunc = (key, val) => {
    let change = data;
    change[key] = val;
    setData({ ...change });
  };

  useEffect(() => {
    setFunc();
    window.addEventListener("resize", setFunc);
    
    (async () => {
      try {
      const thres = await authRequestNb("order-history" );
      const oohres = await authRequestNb("inorder" );
        const dhres = await authRequestNb("deposit-history" );
      const whres = await authRequestNb("withdraw-history");
      // console.log(
      //   "trading-history",
      //   thres,
      //   "open-order-history",
      //   oohres,
      //   "deposite-history",
      //   dhres,
      //   "withdraw-history",
      //   whres
      // );

      refreshToken(thres.refresh_token);
      refreshToken(oohres.refresh_token);
      refreshToken(dhres.refresh_token);
      refreshToken(whres.refresh_token);

      setDataFunc("deposit_history",dhres)
      setDataFunc("trade_history",thres)
      setDataFunc("withdraw_history",whres)
      setDataFunc("open_order_history",oohres)
    } catch (e) {
      e && console.log(e)
    }
    })();
  }, []);

useEffect(() => {
  (async()=>{
    try {
      const currencyFilterRes = await authRequest({type : "filter"},"get-currency")
      const pairsFilterRes = await authRequest({type : "filter"},"get-pairs")
      setCurrencyFilters(currencyFilterRes.data)
      setPairsFilters(pairsFilterRes.data)
      refreshToken(currencyFilterRes.refresh_token)
      refreshToken(pairsFilterRes.refresh_token)
    } catch (error) {
      error && console.log(error)
    }
  })()
}, [])



useEffect(() => {
  localStorage.setItem("history" , activeValue)
}, [activeValue])


  
  return (
    <div className={dmode ? styles.his_d : styles.his_l}>
      <Navbar />
      <div className={styles.his_wrapper}>
        <h1 className={`${styles.note}`}>
          {"Note : - Drag right for all options >>>"}
        </h1>
        <div className={`${styles.his}`}>
          <div className={`${styles.sf} flex-between`}>
            <div className={styles.slider}>
              <div
                style={{ display: svalue === 4 ? "none" : "flex" }}
                className={`${styles.nevi} flex-center`}
                ref={(node) => setPrevEl(node)}
              >
                <AiOutlineLeft />
              </div>
              <Swiper
                slidesPerView={svalue}
                slidesPerGroup={1}
                loop={svalue > 3 ? false : true}
                navigation={{ prevEl, nextEl }}
                modules={[Navigation]}
                className={styles.options}
              >
                <SwiperSlide
                  style={{ height: "50px" }}
                  className={svalue < 4 ? "flex-center" : styles.start}
                >
                  <button
                    onClick={() => setActiveValue("deposit_history")}
                    className={`${
                      activeValue === "deposit_history"
                        ? styles.active
                        : styles.btno
                    } btn`}
                  >
                    <span>
                      <ImDownload3 />
                    </span>
                    Deposit History
                  </button>
                </SwiperSlide>
                <SwiperSlide
                  style={{ height: "50px" }}
                  className={svalue < 4 ? "flex-center" : styles.start}
                >
                  <button
                    onClick={() => setActiveValue("trade_history")}
                    className={`${
                      activeValue === "trade_history"
                        ? styles.active
                        : styles.btno
                    } btn`}
                  >
                    <span>
                      <BiTransfer />
                    </span>
                    Trade History
                  </button>
                </SwiperSlide>
                <SwiperSlide
                  style={{ height: "50px" }}
                  className={svalue < 4 ? "flex-center" : styles.start}
                >
                  <button
                    onClick={() => setActiveValue("withdraw_history")}
                    className={`${
                      activeValue === "withdraw_history"
                        ? styles.active
                        : styles.btno
                    } btn`}
                  >
                    <span>
                      <ImUpload3 />
                    </span>
                    Withdraw History
                  </button>
                </SwiperSlide>
                <SwiperSlide
                  style={{ height: "50px" }}
                  className={svalue < 4 ? "flex-center" : styles.start}
                >
                  <button
                    onClick={() => setActiveValue("open_order_history")}
                    className={`${
                      activeValue === "open_order_history"
                        ? styles.active
                        : styles.btno
                    } btn`}
                  >
                    <span>
                      <BiSortUp />
                    </span>
                    Open Order
                  </button>
                </SwiperSlide>
              </Swiper>
              <div
                style={{ display: svalue === 4 ? "none" : "flex" }}
                className={`${styles.nevi} flex-center`}
                ref={(node) => setNextEl(node)}
              >
                <AiOutlineRight />
              </div>
            </div>

            <div className={`${styles.filters} flex`}>
              <h3>Filter By:</h3>
              <div className={styles.sbox}>

                {
                  activeValue && activeValue === "deposit_history" ? <select value={allFiters.deposit_history} onChange={onOptionChangeHandler}>
                  <option value={""} >Currency</option>
                  {
                    currencyFilters?.map((option , index) =>  <option value={option.currency_symbol} key={index}>{option.currency_symbol}</option>)
                  }
                  </select> : activeValue === "withdraw_history" ? <select value={allFiters.withdraw_history} onChange={onOptionChangeHandler}>
                  <option value={""} >Currency</option>
                  {
                    currencyFilters?.map((option , index) =>  <option value={option.currency_symbol} key={index}>{option.currency_symbol}</option>)
                  }
                  </select> : activeValue === "trade_history" ? <select value={allFiters.trade_history}  onChange={onOptionChangeHandler}>
                  <option value={""} >Pairs</option>
                  {
                    pairsFilters?.map((option, index) => <option value={[option.currency_symbol , option.market_symbol]} key={index}>{option.pair}</option>)
                  }
                  </select> : <select value={allFiters.open_order_history} onChange={onOptionChangeHandler}>
                  <option value={""} >Pairs</option>
                  {
                    pairsFilters?.map((option, index) => <option value={[option.currency_symbol , option.market_symbol]} key={index}>{option.pair}</option>)
                  }
                  </select>
                }
              </div>
            </div>
          </div>
          {activeValue === "trade_history" && (
            <Table _activeValue={activeValue} _filterData={allFiters} allPagesData={allPagesData} setAllPagesData={setAllPagesData} headers={trade_history_headers} data={data.trade_history} />
          )}
          {activeValue === "deposit_history" && (
            <Table _activeValue={activeValue} _filterData={allFiters} allPagesData={allPagesData} setAllPagesData={setAllPagesData}  headers={deposit_history_headers} data={data.deposit_history} />
          )}
          {activeValue === "withdraw_history" && (
            <Table _activeValue={activeValue} _filterData={allFiters} allPagesData={allPagesData} setAllPagesData={setAllPagesData}  headers={withdraw_history_headers} data={data.withdraw_history} />
          )}
          {activeValue === "open_order_history" && (
            <Table _activeValue={activeValue} _filterData={allFiters} allPagesData={allPagesData} setAllPagesData={setAllPagesData}  headers={open_order_history_headers} data={data.open_order_history} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;
