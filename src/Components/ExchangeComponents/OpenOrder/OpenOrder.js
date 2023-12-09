import React, { useState, useEffect } from "react";
import styles from "./OpenOrder.module.scss";
import nodata from "../../../Assets/nodata.jpg";
import { authRequest, openOrderDataHandler, refreshToken } from "../../../Helper/helper";
import swal from "sweetalert";
import Swal from "sweetalert2";

const OpenOrder = ({ dmode, _isLogin, trade , tradeHistory , openOrder}) => {
  const [openOrderSection, setOpenOrderSection] = useState(true);
  const [ooData, setOoData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [cancelNo, setCancelNo] = useState();
  const [moh, setMoh] = useState();
  const [searchData, setSearchData] = useState([]);

  const isLogin = _isLogin;

  const ooSearchHandler = (e) => {
    const _search = e.target.value.toUpperCase();
    setSearchQuery(_search)
    const result = [];
    ooData?.map((value) => {
      value.reference_no.search(_search) !== -1 && result.push(value);
    });
    setSearchData(result);
  };

  const mohSearchHandler = (e) => {
    const _search = e.target.value.toUpperCase();
    setSearchQuery(_search)
    const result = [];
    moh?.map((value) => {
      value.reference_no.search(_search) !== -1 && result.push(value);
    });
    setSearchData(result);
  };

  const cancelOrder = async (_id) => {
    setCancelNo(_id);
    const res = await authRequest({ orderid: _id }, "cancel-order");
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
  };

  useEffect(() => {
    isLogin &&
      trade &&
      (async () => {
        const res = await authRequest(
          {
            currency: trade.currency_symbol,
            market: trade.market_symbol,
            limit: "10",
            start: "0",
          },
          "inorder"
        );
        const resmoh = await authRequest(
          {
            currency: trade.currency_symbol,
            market: trade.market_symbol,
            limit: "10",
            start: "0",
          },
          "order-history"
        );
        refreshToken(res.refresh_token);
        refreshToken(resmoh.refresh_token);
        setOoData(res.data);
        setMoh(resmoh.data);
      })();
  }, [isLogin, trade]);

  useEffect(() => {
    if(cancelNo){
      if(ooData && ooData.length >=2){
        setOoData(ooData.filter(obj => parseInt(obj.tradeID) !== parseInt(cancelNo)))
      }else{
        setOoData([])
      }
    }
  }, [cancelNo])
  

  useEffect(() => {
    setSearchData([]);
    setSearchQuery("")
  }, [openOrderSection]);

  useEffect(() => {
    if(tradeHistory && moh){
      setMoh([tradeHistory , ...moh])
    }
  }, [tradeHistory ])

  useEffect(() => {
    if(openOrder){
      openOrderDataHandler(ooData , openOrder , setOoData)
    }
  }, [openOrder])
  

  return (
    <section className={dmode ? styles.oo_d : styles.oo_l}>
      <div className="flex-between">
        <div className="flex">
          <button
            onClick={() => setOpenOrderSection(true)}
            className={openOrderSection ? styles.active : ""}
          >
            Open Orders
          </button>
          <button
            onClick={() => setOpenOrderSection(false)}
            className={openOrderSection ? "" : styles.active}
          >
            My Order History
          </button>
        </div>
        <input
          type="search"
          onChange={openOrderSection ? ooSearchHandler : mohSearchHandler}
          value={searchQuery}
          placeholder="Search By Refference No , TrasactonSearch By Refference No,Transaction Type Or Requested At"
          name="searchOrder"
        />
      </div>

      <div className={styles.tableBox}>
        {isLogin && openOrderSection && ooData?.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Reference No</th>
                <th>Price</th>
                <th>Amount/Pending</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(searchData?.length === 0 || !searchData) &&
                ooData?.map((order, i) => (
                  <tr
                    style={{
                      color: order.type === "Sell" ? "crimson" : "green",
                    }}
                    key={i}
                  >
                    <td>{order.reference_no}</td>
                    <td>{order.price}</td>
                    <td>
                      {order.qty}/{order.remaining}
                    </td>
                    <td>{order.price * order.qty}</td>
                    <td>
                      <button onClick={() => cancelOrder(order.tradeID)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              {searchData?.map((order, i) => (
                <tr
                  style={{ color: order.type === "Sell" ? "crimson" : "green" }}
                  key={i}
                >
                  <td>{order.reference_no}</td>
                  <td>{order.price}</td>
                  <td>
                    {order.qty}/{order.remaining}
                  </td>
                  <td>{order.price * order.qty}</td>
                  <td>
                    <button onClick={() => cancelOrder(order.tradeID)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isLogin && !openOrderSection && moh?.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Reference No</th>
                <th>Price</th>
                <th>Amount/Pending</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(searchData?.length === 0 || !searchData) &&
                moh?.map((order, i) => (
                  <tr
                    style={{
                      color: order.type === "Sell" ? "crimson" : "green",
                    }}
                    key={i}
                  >
                    <td>{order.reference_no}</td>
                    <td>{order.price}</td>
                    <td>
                      {order.qty}/{order.remaining}
                    </td>
                    <td>{order.price * order.qty}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              {searchData?.map((order, i) => (
                <tr
                  style={{ color: order.type === "Sell" ? "crimson" : "green" }}
                  key={i}
                >
                  <td>{order.reference_no}</td>
                  <td>{order.price}</td>
                  <td>
                    {order.qty}/{order.remaining}
                  </td>
                  <td>{order.price * order.qty}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!isLogin && (
        <div className={`${styles.nodata} flex-center column`}>
          <img src={nodata} alt="nodata" />
          <h1>No data</h1>
        </div>
      )}
      {isLogin && ooData?.length === 0 && openOrderSection && (
        <div className={`${styles.nodata} flex-center column`}>
          <img src={nodata} alt="nodata" />
          <h1>No data</h1>
        </div>
      )}
      {isLogin && moh?.length === 0 && !openOrderSection && (
        <div className={`${styles.nodata} flex-center column`}>
          <img src={nodata} alt="nodata" />
          <h1>No data</h1>
        </div>
      )}
    </section>
  );
};

export default OpenOrder;
