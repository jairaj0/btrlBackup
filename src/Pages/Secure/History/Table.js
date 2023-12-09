import React, { useState, useEffect } from "react";
import { authRequest, refreshToken, shorter } from "../../../Helper/helper";
import styles from "./History.module.scss";
import nodata from "../../../Assets/nodata.jpg";
import PaginationBox from "../../../Components/HistoryComponents/PaginationBox/PaginationBox";

const Table = ({
  headers,
  data,
  _activeValue,
  _filterData,
  allPagesData,
  setAllPagesData,
}) => {
  const [allData, setAllData] = useState();
  const activePage = allPagesData[_activeValue];

  useEffect(() => {
    (async () => {
      if (_activeValue === "deposit_history") {
        const dhres = await authRequest(
          {
            currency:
              _filterData.deposit_history?.length > 0
                ? _filterData.deposit_history
                : "",
            start: activePage > 1 ? activePage * 10 - 10 : "",
            limit: "10",
          },
          "deposit-history"
        );
        refreshToken(dhres.refresh_token);
        setAllData(dhres.data);
      } else if (_activeValue === "trade_history") {
        const etv = _filterData.trade_history.split(",");
        const thres = await authRequest(
          {
            currency: etv[0],
            market: etv[1] ? etv[1] : "",
            start: activePage > 1 ? activePage * 10 - 10 : "",
            limit: "10",
          },
          "order-history"
        );
        refreshToken(thres.refresh_token);
        setAllData(thres.data);
      } else if (_activeValue === "withdraw_history") {
        const whres = await authRequest(
          {
            currency: _filterData.withdraw_history,
            start: activePage > 1 ? activePage * 10 - 10 : "",
            limit: "10",
          },
          "withdraw-history"
        );
        refreshToken(whres.refresh_token);
        setAllData(whres.data);
      } else if (_activeValue === "open_order_history") {
        const etv = _filterData.open_order_history.split(",");
        const oohres = await authRequest(
          {
            currency: etv[0],
            market: etv[1] ? etv[1] : "",
            start: activePage > 1 ? activePage * 10 - 10 : "",
            limit: "10",
          },
          "inorder"
        );
        refreshToken(oohres.refresh_token);
        setAllData(oohres.data);
      }
    })();
  }, [activePage, _filterData, _activeValue]);

  return allData?.length > 0 ? (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              {headers.map((value, i) => (
                <th key={i}>{value[0]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allData?.map((coin, bi) => (
              <tr key={bi}>
                {headers?.map((h, i) =>
                  coin[h[1]] !== null && coin[h[1]].length > 25 ? (
                    <td key={i}>{shorter(coin[h[1]])}</td>
                  ) : (
                    <td key={i}>
                      {coin[h[1]] === null ? "" : h[1] === "currency_symbol" || h[1] === "market_symbol" ?  coin[h[1]].toUpperCase() : coin[h[1]]}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${styles.pages} flex-between`}>
        <div></div>
        <div className={styles.pagesArea}>
          {data && (
            <PaginationBox
              loc={_activeValue}
              allPagesData={allPagesData}
              setAllPagesData={setAllPagesData}
              _totalPage={data.totalRecords}
            />
          )}
        </div>
      </div>
    </>
  ) : allData?.length === 0 ? (
    <div className={`${styles.nodata} flex-center column`}>
      <img src={nodata} alt="nodata" />
      <h1>No data found !</h1>
    </div>
  ) : (
    <div style={{ height: "50vh" }}></div>
  );
};

export default Table;
