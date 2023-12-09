import React, { useContext , useState } from "react";
import { useEffect } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import { refreshToken, sendGetRequest } from "../../Helper/helper";
import styles from './Fees.module.scss';

const feesData = [
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Bitcoin(BTC)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ethereum(ETH)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
  {as : "Ripple(XRP)", wf : "0.00100000 BTC" , mda : "0.00100000 BTC" , mwa : "0.00100000 BTC" , mxwa : "N/L" , tf:"2.00 %" },
]

const Fees = () => {
    const { states } = useContext(Context);
    const [activeTab, setActiveTab] = useState("dandwf");
    const [data, setData] = useState();
    const [gpData, setGpData] = useState();
    const [gawfData, setGawfData] = useState();
    const dmode = states.dmode;

    useEffect(() => {
      (async()=>{
        const gawfres = await sendGetRequest("get-all-withdraw-fees");
        const gpres = await sendGetRequest("get-pairs");
        setGawfData(gawfres.data);
        setGpData(gpres.data)
        gawfres.refresh_token && refreshToken(gawfres.refresh_token);
      })()
    }, [])

    useEffect(() => {
      if(gpData && gawfData){
        activeTab === "tf" ? setData(gpData) : setData(gawfData);
      }
    }, [activeTab , gpData , gawfData])
  return (
    <div className={dmode ? styles.fees_d : styles.fees_l}>
    <Navbar />
    <h1 className={`${styles.note}`}>{"Note : - Drag right for all options >>>"}</h1>
    <div className={`${styles.tabs} flex-between`}>
      <button onClick={()=>setActiveTab("dandwf")} className={activeTab === "dandwf" ? styles.active : ""}  >DEPOSIT & WITHDRAW FEES</button>
      <button onClick={()=>setActiveTab("tf")} className={activeTab === "tf" ? styles.active : ""} >TRADING FEES</button>
    </div>
    <div className={styles.fees_wrapper}>
    {activeTab === "tf" ? <table>
        <thead>
          <tr>
          <th>Market Pair</th>
          <th>Minimum Trade</th>
          <th>Buy fees</th>
          <th>Sell fees</th>
          <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((value , i) => <tr key={i}>
            <td className={i%2 === 0 && i%3 !== 0 ? styles.second : i%3 === 0 ? styles.third : styles.first}><span>{value.pair?.replace("_","/")}</span></td>
            <td >{value.minimum_trade} {value.market_symbol}</td>
            <td>{value.buy_fee} %</td>
            <td>{value.sell_fee} %</td>
            <td style={{paddingLeft : 0}}>{value.status === "1" ? "Active" : "Inactive"}</td>
          </tr>)
          }
        </tbody>
      </table> : <table>
        <thead>
          <tr>
          <th>Assets</th>
          <th>Network</th>
          <th>Withdraw Fee</th>
          <th>Minimum Deposit Amount</th>
          <th>Minimum Withdraw Amount</th>
          <th>Maximum Withdraw Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((value , i) => <tr key={i}>
            <td className={i%2 === 0 && i%3 !== 0 ? styles.second : i%3 === 0 ? styles.third : styles.first}><span>{value.currency_symbol}</span></td>
            <td >{value.blockchain_type?.toUpperCase()}</td>
            <td >{value.fee} {value.currency_symbol}</td>
            <td>{"0.00100000"} {value.currency_symbol}</td>
            <td>{value.min_amount} {value.currency_symbol}</td>
            <td>{value.max_amount} {value.max_amount !== "N/L" && value.currency_symbol}</td>
          </tr>)
          }
        </tbody>
      </table>}
    </div>
    <Footer />
    </div>
  )
}

export default Fees