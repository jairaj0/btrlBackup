import React,{useState , useEffect} from 'react';
import { isMax, refreshToken, sendRequest } from '../../../Helper/helper';
import styles from './MarketHistory.module.scss';

// const marketData = [
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "neg"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "neg"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "neg"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "neg"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "neg"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
//   {amount : "0.00717553" , price : "0.00986547" , total : "0.98673625",status : "pos"},
// ];

const MarketHistory = ({dmode , trade , marketHistory}) => {
  const [data, setData] = useState([]);
  const [newMarket, setNewMarket] = useState([]);

  useEffect(() => {
    if(data){
      const newMarket = [];
      data.reverse().map((value , i) => {
        newMarket.unshift(<div key={i} className={styles.tr} >
          <p className={isMax("market_history" , parseFloat(value.price)) ? styles.pos : styles.neg}>{value.price}</p>
          <p>{value.amount}</p>
          <p>{value.time}</p>
        </div>)
      })
      setNewMarket(newMarket)
    }
  }, [data])
  
  useEffect(() => {
    (async () => {
      const res = await sendRequest(
        { currency: trade?.currency_symbol, market: trade?.market_symbol },
        "market-history"
      );
      setData(res.data);
      res.refresh_token && refreshToken(res.refresh_token);
    })();
  }, [trade]);

  useEffect(() => {
    if(marketHistory && data){
      if(marketHistory.currency_symbol.toUpperCase() === trade.currency_symbol && marketHistory.market_symbol.toUpperCase() === trade.market_symbol){
        setData([marketHistory,...data.reverse()])
      }
    }
  }, [marketHistory])
  
  return (
    <section className={dmode ? styles.mh_d : styles.mh_l }>
      <h1 className={styles.title}>Market History</h1>
<div className={styles.c_table}>
        <div className={styles.thead}>
        <div>Price<span>({trade?.market_symbol})</span></div>
          <div>Amount<span>({trade?.currency_symbol})</span></div>
          <div>Time</div>
        </div>
        <div className={styles.tbody}>
        {
          newMarket?.map((value , i) => value)
        }
        </div>
      </div>
    </section>
  )
}

export default MarketHistory