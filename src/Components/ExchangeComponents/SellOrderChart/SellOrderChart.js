import React, { useState, useEffect } from "react";
import { refreshToken, sendRequest } from "../../../Helper/helper";
import styles from "./SellOrder.module.scss";

const SellOrderChart = ({ sdata , trade, dmode , buyTrade , setBid }) => {
  const [ssize, setSsize] = useState(window.innerWidth);

  useEffect(() => {
    (async () => {
      window.addEventListener("resize", () => setSsize(window.innerWidth));
    })();
  }, [trade]);
  return (
    <section
      style={{
        display: !buyTrade && ssize <= 750 ? "none" : "block",
        gridArea:
          !buyTrade && ssize <= 1050 && ssize > 750 ? "3/1/4/2" : "",
      }}
      className={dmode ? styles.soc_d : styles.soc_l}
    >
      <h1 className={styles.title}>Sell Order</h1>
      <div className={styles.c_table}>
        <div className={styles.thead}>
          <div>Amount<span>({trade?.currency_symbol})</span></div>
          <div>Price<span>({trade?.market_symbol})</span></div>
          <div>Total<span>({trade?.market_symbol})</span></div>
        </div>
        <div className={styles.tbody}>
        {
      sdata && sdata?.map((selld , i) => <div onClick={()=>setBid(buyTrade ? selld : undefined)} key={i} className={styles.tr} >
      <p>{selld.qty}</p>
      <p className={styles.price}>{selld.bid_price}</p>
      <p>{selld.total}</p>
    </div>)
    }
        </div>
      </div>
    </section>
  );
};

export default SellOrderChart;
