import React, { useContext, useState, useEffect } from "react";
import Deposit from "../../../Components/BalanceComponent/Deposit";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import { AiOutlineClose } from "react-icons/ai";
import {
  authRequest,
  authRequestNb,
  refreshToken,
} from "../../../Helper/helper";
import styles from "./Balance.module.scss";
import Withdraw from "../../../Components/BalanceComponent/Withdraw/Withdraw";

const Balance = () => {
  const { states } = useContext(Context);
  const [dpstatus, setDpstatus] = useState(false);
  const [coinBalance, setCoinBalance] = useState();
  const [wtstatus, setWtstatus] = useState(false);
  const [slectedCoin, setSlectedCoin] = useState();
  const [Filters, setFilters] = useState();
  const [filter, setFilter] = useState("");
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem("hideZero"))
  );
  const [data, setData] = useState();

  const togglef = async () => {
    toggle ? setToggle(false) : setToggle(true);
    const toggleRes = await authRequest(
      { status: toggle ? 0 : 1 },
      "hide-zero"
    );
    refreshToken(toggleRes.refresh_token);
    setToggle(toggleRes.data);
    localStorage.setItem("hideZero", !toggle);
  };

  const dmode = states.dmode;

  const getAutoData = async () => {
    const res = await authRequestNb("all-balance");
    refreshToken(res.refresh_token);
    setFilters(Object.keys(res.data));
    const _data = [];
    for (const coin of Object.keys(res.data)) {
      _data.push(res.data[coin]);
    }
    return _data;
  };

  useEffect(() => {
    (async () => {
      const _data = await getAutoData();

      if (toggle) {
        let hideZeroList = [];
        let filterList = [];
        for (const coin of _data) {
          if (coin.total_balance !== "0") {
            filterList.push(coin.currency_symbol);
            if (filter === "") {
              hideZeroList.push(coin);
            } else if (coin.currency_symbol === filter) {
              hideZeroList = coin;
            }
          }
        }
        setFilters(filterList);
        setData(hideZeroList);
      } else {
        let hideZeroList = [];
        let filterList = [];
        for (const coin of _data) {
          filterList.push(coin.currency_symbol);
          if (filter === "") {
            hideZeroList.push(coin);
          } else if (coin.currency_symbol === filter) {
            hideZeroList = coin;
          }
        }
        setFilters(filterList);
        setData(hideZeroList);
      }
    })();
  }, [filter, toggle]);


  const dandwHandler = async(_selectedcoin , loc) =>{
    if(loc==="dep"){
      setDpstatus(true);
      setWtstatus(false);
    } else{
      const resBal = await authRequest({ currency: _selectedcoin }, "balance");
      setCoinBalance(resBal.data[0].available_balance);
      refreshToken(resBal.refresh_token);
      setWtstatus(true);
      setDpstatus(false);
    }
    setSlectedCoin(_selectedcoin)
  }
  
  useEffect(() => {
    dpstatus ? (document.body.style.overflowY = "hidden") : (document.body.style.overflowY = "auto");
  }, [dpstatus]);

  return (
    <div className={dmode ? styles.bal_d : styles.bal_l}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={`${styles.note}`}>
          {"Note : - Drag right for all options >>>"}
        </h1>
        <div className={`${styles.bal}`}>
          <div className="flex-between">
            <div></div>
            <div className={`${styles.filters} flex`}>
              <div className="flex">
                <h3>Hide Zero Balance:</h3>
                <div
                  onClick={togglef}
                  className={`${toggle ? styles.tru_tg_c : styles.tg_c} flex`}
                >
                  <div className={toggle ? styles.tru : styles.tg_sc}></div>
                </div>
              </div>

              {dpstatus && <div
                className={styles.depositBox}
              >
                <div className={`${styles._nav} flex-between`}>
                  <h1>Deposit {slectedCoin}</h1>
                  <button
                    className={styles.close}
                    onClick={() => setDpstatus(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                {slectedCoin && <Deposit coin={slectedCoin} dmode={dmode} />}
              </div>}

              {wtstatus && <div
                className={styles.widthdrawBox}
              >
                <div className={`${styles._nav} flex-between`}>
                  <h1>Withdraw {coinBalance} {slectedCoin}</h1>
                  <button
                    className={styles.close}
                    onClick={() => setWtstatus(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                {slectedCoin && <Withdraw coin={slectedCoin} availableBalance={coinBalance} dmode={dmode} />}
              </div>}

              <div className="flex">
                <h3>Filter By:</h3>
                <div className={styles.sbox}>
                  <select
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                  >
                    <option value={""}>All Coins</option>
                    {Filters?.map((option, index) => {
                      return (
                        <option value={option.toUpperCase()} key={index}>
                          {option.toUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bal_wrapper}>
            <table>
              <thead>
                <tr>
                  <th>Currency Symbol</th>
                  <th>Currency Name</th>
                  <th>Total Balance</th>
                  <th>Available Balance</th>
                  <th>Open Order Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filter === "" ? (
                  data &&
                  data.length > 0 &&
                  data?.map((coin, i) => (
                    <tr key={i}>
                      <td className="flex">
                        <img src={coin.image} alt={coin.image} />
                        {coin.currency_symbol}
                      </td>
                      <td>{coin.name}</td>
                      <td>{coin.total_balance}</td>
                      <td>{coin.available_balance}</td>
                      <td>{coin.open_orders}</td>
                      {coin.total_balance && (
                        <td>
                          <button onClick={() => dandwHandler(coin.currency_symbol , "dep")}>
                            Deposit
                          </button>{" "}
                          <button onClick={() => dandwHandler(coin.currency_symbol)}>Withdraw</button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="flex">
                      <img src={data.image} alt={data.image} />
                      {data.currency_symbol}
                    </td>
                    <td>{data.name}</td>
                    <td>{data.total_balance}</td>
                    <td>{data.available_balance}</td>
                    <td>{data.open_orders}</td>
                    {data.total_balance && (
                      <td>
                      <button onClick={() => dandwHandler(data.currency_symbol , "dep")}>
                          Deposit
                        </button>{" "}
                        <button onClick={() => dandwHandler(data.currency_symbol)}>Withdraw</button>
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Balance;
