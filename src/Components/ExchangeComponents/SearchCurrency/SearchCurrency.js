import React, { useState, useEffect, useMemo } from "react";
import styles from "./Search.module.scss";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { refreshToken, sendGetRequest } from "../../../Helper/helper";

const SearchCurrency = ({ dmode , ticker, tradeChange, smdata, popup, setPopup }) => {
  const [filter, setFilter] = useState({
    market: "",
    coin: "",
    price: "",
    vol: "dic",
    chg: "",
  });
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [marketSymbolArray, setMarketSymbolArray] = useState([
    "",
    " ",
    "  ",
    "    ",
  ]);
  const [searchData, setSearchData] = useState();
  const [ssize, setSsize] = useState(window.innerWidth);
  const [msas, setMsas] = useState(ssize && ssize > 380 ? 4 : 3);

  let perSection = ssize && ssize > 380 ? 4 : 3;
  const setCoin = (_coin) => {
    if (_coin !== filter.market) {
      filterHandler("market", _coin);
    } else {
      filterHandler("market", "");
    }
  };

  const tradeChangeHandler = (pair) => {
    tradeChange(pair);
    data?.map((value) => value.pair === pair && smdata(value));
    // setPopup(false);
  };

  const searchHandler = (e) => {
    const _search = e.target.value.toUpperCase();
    const result = [];
    updatedData?.map((value) => {
      value.currency_symbol.search(_search) !== -1 && result.push(value);
    });
    setSearchData(result);
  };


  const filterHandler = (key, value) => {
    let change = filter;
    if (key === "coin" || key === "price" || key === "vol" || key === "chg") {
      if (key === "coin") {
        change.coin = value;
        change.price = "";
        change.vol = "";
        change.chg = "";
      }
      if (key === "price") {
        change.price = value;
        change.coin = "";
        change.vol = "";
        change.chg = "";
      }
      if (key === "vol") {
        change.price = "";
        change.coin = "";
        change.vol = value;
        change.chg = "";
      }
      if (key === "chg") {
        change.price = "";
        change.coin = "";
        change.vol = "";
        change.chg = value;
      }
    } else {
      change[key] = value;
    }

    setFilter({ ...change });
  };

  const coinFilter = () => {
    if (filter.coin === "") {
      filterHandler("coin", "alpharev");
    }
    if (filter.coin === "alpharev") {
      filterHandler("coin", "alpha");
    } else if (filter.coin === "alpha") {
      filterHandler("coin", "alpharev");
    }
  };

  const numFilter = (value) => {
    if (filter[value] === "") {
      filterHandler(value, "asc");
    }
    if (filter[value] === "asc") {
      filterHandler(value, "dic");
    } else if (filter[value] === "dic") {
      filterHandler(value, "asc");
    }
  };

  useMemo(() => {
    if (filter.market) {
      const temp = data?.filter((a) => a.market_symbol === filter.market);
      if (filter.coin === "alpha") {
        const _temp = temp?.sort((a, b) => {
          const _a = a.currency_symbol;
          const _b = b.currency_symbol;
          return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.coin === "alpharev") {
        const _temp = temp?.sort((a, b) => {
          const _a = a.currency_symbol;
          const _b = b.currency_symbol;
          return _a > _b ? -1 : _a < _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.vol === "dic") {
        const _temp = temp?.sort((a, b) => {
          const _a = parseFloat(a.base);
          const _b = parseFloat(b.base);
          return _a > _b ? -1 : _a < _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.chg === "dic") {
        const _temp = temp?.sort((a, b) => {
          const _a = parseFloat(a.percent_change);
          const _b = parseFloat(b.percent_change);
          return _a > _b ? -1 : _a < _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.price === "dic") {
        const _temp = temp?.sort((a, b) => {
          const _a = parseFloat(a.price);
          const _b = parseFloat(b.price);
          return _a > _b ? -1 : _a < _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.vol === "asc") {
        const _temp = temp?.sort((a, b) => {
          const _a = parseFloat(a.base);
          const _b = parseFloat(b.base);
          return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.chg === "asc") {
        const _temp = temp?.sort((a, b) => {
          const _a = parseFloat(a.percent_change);
          const _b = parseFloat(b.percent_change);
          return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
      if (filter.price === "asc") {
        const _temp = temp?.sort((a, b) => {
          const _a = parseFloat(a.price);
          const _b = parseFloat(b.price);
          return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        setUpdatedData(_temp);
      }
    } else {
      setUpdatedData(data);
    }
  }, [filter, data]);

  useEffect(() => {
    (async () => {
      setUpdatedData(data);
      const resGlobal = await sendGetRequest("global");
      const temp = [];
      data?.map(
        (value) =>
          temp.indexOf(value.market_symbol) === -1 &&
          temp.push(value.market_symbol)
      );
      setMarketSymbolArray(temp);
      const trade = await resGlobal.data.landing_page.toUpperCase().split("/");
      filterHandler("market", trade[1]);
      // data && tradeChangeHandler(resGlobal.data.landing_page.toUpperCase().replace("/","_"));
    })();
  }, [data]);

  const path = window.location.pathname;

  useEffect(() => {
    (async () => {
      const res = await sendGetRequest("global");
      const currency = path.split("/")[2]?.toUpperCase();
      const market = path.split("/")[3]?.toUpperCase();
      if (updatedData && currency && market) {
        let pair;
        for (let i = 0; i < data.length; i++) {
          const value = data[i];
          if (value.pair === `${currency}_${market}`) {
            pair = value.pair;
          }
          if (i === data.length - 1) {
            if (pair) {
              tradeChangeHandler(pair);
            }else{
              console.log(pair)
              tradeChangeHandler(
                res.data.landing_page.toUpperCase().replace("/", "_")
              );
            }
          }
        }
      } else {
        tradeChangeHandler(
          res.data.landing_page.toUpperCase().replace("/", "_")
        );
      }
    })();
  }, [path, updatedData]);

  useEffect(() => {
    (async () => {
      window.addEventListener("resize", () => setSsize(window.innerWidth));
      const res = await sendGetRequest("get-pairs");
      res.refresh_token && refreshToken(res.refresh_token);
      setData(res.data);
    })();
  }, []);

  useEffect(() => {
  if(ticker && updatedData){
    const temp = updatedData;
    const index = temp.findIndex(obj => obj.pair === `${ticker.currency_symbol.toUpperCase()}_${ticker.market_symbol.toUpperCase()}`)
    temp[index] = {...temp[index] , ...ticker , currency_symbol : ticker.currency_symbol.toUpperCase() , market_symbol : ticker.market_symbol.toUpperCase() };
    setUpdatedData(temp)
  }
  }, [ticker , updatedData])
  
  return (
    <section
      style={{ display: popup || ssize > 1050 ? "block" : "none" }}
      className={dmode ? styles.searchcurreny_d : styles.searchcurreny_l}
    >
      <div
        onClick={() => setPopup(false)}
        style={{ display: popup ? "block" : "none" }}
        className={styles.cover}
      ></div>
      <div className={`${styles.coins}`}>
        <button
          className={`${styles.navigate} flex-center`}
          onClick={() =>
            setMsas((msas) => (msas > perSection ? msas - perSection : marketSymbolArray.length))
          }
        >
          {"<"}
        </button>
        {marketSymbolArray
          .slice(msas > perSection ? msas - perSection : 0, msas > perSection ? msas : perSection)
          ?.map((value, key) => (
            <button
              className={filter.market === value ? styles.active : ""}
              onClick={() => setCoin(value)}
              key={key}
            >
              {value}
            </button>
          ))}
        <button
          className={`${styles.navigate} flex-center`}
          onClick={() =>
            setMsas((msas) =>
              marketSymbolArray.length < msas + perSection
                ? marketSymbolArray.length !== msas
                  ? marketSymbolArray.length
                  : perSection
                : msas + perSection
            )
          }
        >
          {">"}
        </button>
      </div>

      <input
        type="input"
        placeholder="Search by Currency Name"
        className={styles.coinSearch}
        onChange={searchHandler}
      />

      <div className={styles.c_table}>
        <div className={styles.thead}>
          <div onClick={coinFilter} className="flex">
            <span className="flex-center column">
              <AiFillCaretUp
                className={filter.coin === "alpha" && styles.active}
              />
              <AiFillCaretDown
                className={filter.coin === "alpharev" && styles.active}
              />
            </span>{" "}
            Coin
          </div>
          <div onClick={() => numFilter("price")} className="flex">
            <span className="flex-center column">
              <AiFillCaretUp
                className={filter.price === "dic" && styles.active}
              />
              <AiFillCaretDown
                className={filter.price === "asc" && styles.active}
              />
            </span>{" "}
            Price
          </div>
          <div onClick={() => numFilter("vol")} className="flex">
            <span className={`flex-center column`}>
              <AiFillCaretUp
                className={filter.vol === "dic" && styles.active}
              />
              <AiFillCaretDown
                className={filter.vol === "asc" && styles.active}
              />
            </span>{" "}
            Vol
          </div>
          <div onClick={() => numFilter("chg")} className="flex">
            <span className="flex-center column">
              <AiFillCaretUp
                className={filter.chg === "dic" && styles.active}
              />
              <AiFillCaretDown
                className={filter.chg === "asc" && styles.active}
              />
            </span>{" "}
            CHG
          </div>
        </div>
        <div className={styles.tbody}>
          {(searchData?.length === 0 || !searchData) &&
            updatedData?.map((coin, i) => (
              <div
                onClick={() => {
                  tradeChangeHandler(coin.pair)
                  setPopup(false);
                  }}
                className={styles.tr}
                key={i}
              >
                <p>{coin.pair?.replace("_", "/")}</p>
                <p>{parseFloat(coin.price).toFixed(9 - coin.price.length)}</p>
                <p>{parseFloat(coin.base).toFixed(9 - coin.base.length)}</p>
                <p className={coin.status === "neg" ? styles.neg : styles.pos}>
                  {parseFloat(coin.percent_change).toFixed(2)}%
                </p>
              </div>
            ))}
          {searchData?.map((coin, i) => (
            <div
              onClick={() => {
                  tradeChangeHandler(coin.pair)
                  setPopup(false);
                  }}
              className={styles.tr}
              key={i}
            >
              <p>{coin.pair?.replace("_", "/")}</p>
              <p>{parseFloat(coin.price).toFixed(9 - coin.price.length)}</p>
              <p>{parseFloat(coin.base).toFixed(9 - coin.base.length)}</p>
              <p className={coin.status === "neg" ? styles.neg : styles.pos}>
                {parseFloat(coin.percent_change).toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchCurrency;
