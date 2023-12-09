import React, { useContext , useEffect , useState } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import styles from "./Stack.module.scss";
import nodata from "../../../Assets/nodata.jpg";
import {authRequest, authRequestNb, refreshToken} from '../../../Helper/helper';
import swal from "sweetalert";

const rData = [];


const Stack = () => {
  const [Coins, setCoins] = useState();
  const [formData, setFormData] = useState({});
  const [stackingData, setStackingData] = useState();
  const [errorMessage, setErrorMessage] = useState({});
  const { states } = useContext(Context);

  const formDataHandler = (key , value) => {
    let change = formData;
    change[key] = value;
    setFormData({ ...change });
    errorHandler(key , "")
  }

  const errorHandler = (key , value) => {
    let change = errorMessage;
    change[key] = value;
    setErrorMessage({ ...change });
  }

  const earlyWithdraw = async (id) => {
    const res = await authRequest({stackingid : id} , "early-withdraw");
    const _swal = await swal(res.message)
   if(res.status === 200 && _swal){
    refreshToken(res.refresh_token)
    await autoData()
   }
  }


const submitStacking = async () => {
  if(formData.currency && formData.amount){
    const res = await authRequest({currency : formData.currency , amount : formData.amount} , "submit-stacking");
    if(res.status === 200){
      const _swal = swal(res.message)
      if(_swal){
        document.querySelector('form').reset();
        setFormData({})
        refreshToken(res.refresh_token)
        await autoData();
      }
    }
  }else{
    if(!formData.currency){
      errorHandler("currency" , "Please select Currency ")
    }
    if(!formData.amount){
      errorHandler("amount" , "Please enter Amount ")
    }
  }
}

  const dmode = states.dmode;

  const autoData = async () => {
    const resData = await authRequestNb("stacking");
    refreshToken(resData.refresh_token)
      setStackingData(resData)
  }

  useEffect(() => {
    (async () => {
      const res = await authRequestNb("stacking-currency");
      refreshToken(res.refresh_token)
      setCoins(res.data)
      await autoData()
    })()
  }, [])
  
  return (
    <div className={dmode ? styles.stack_d : styles.stack_l}>
      <Navbar />
      <div className={`${styles.stack} container`}>
          <div className={styles.impn}>
            <h1>Important Note:</h1>
            <h2>What is stacking?</h2>
            <h3>
              In our platform stacking is smarter way to increase you asset you
              having to put some asset for a locking time period and after end
              of locking time you receive extra asset without any loss.
            </h3>
            <p>Stacking time period: 1 Year.</p>
            <p>Stacking Interest for Coin/Tokens - 9.00% annually.</p>
            <p>Before said period panelty for Coin Tokens - 25.00%.</p>
            <p>Stacking Interest for IN - 18.00% annually.</p>
            <p>Before said period panelty for IN - 15.00%.</p>
          </div>

       

        <h4>Stack To Earn More</h4>

        <form className={`${styles.sca} flex`}>
            <div className={styles.sbox}>
            <select value={formData.currency} onChange={(e) => formDataHandler("currency" , e.target.value)}>
              <option value={""}>Select Currency *</option>
              {Coins?.map((coin, index) => {
                return <option key={index} value={coin.currency_symbol}>{coin.currency_symbol}</option>;
              })}
            </select>
            {errorMessage.currency && (
            <p className={styles.warning_note}>{errorMessage.currency}</p>
          )}
          </div>


          <div className={styles.ebox}>
          <input type="number" onChange={(e) => formDataHandler("amount" , e.target.value)} placeholder="Amount*" name="amount" />
          {errorMessage.amount && (
            <p className={styles.warning_note}>{errorMessage.amount}</p>
          )}
          </div>
          <button type="button" onClick={submitStacking} className="btn">Submit</button>
        </form>

        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Currency</th>
                <th>Interest%</th>
                <th>Panelty%</th>
                <th>Stacked Amount</th>
                <th>Total Return</th>
                <th>Date Of Joining</th>
                <th>Date Of Maturity</th>
                <th>Date Of Claim</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stackingData?.data.map((order, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{order.currency_symbol}</td>
                  <td>{order.interest}</td>
                  <td>{order.panelty}</td>
                  <td>{order.amount}</td>
                  <td>{order.totalReturn}</td>
                  <td>{order.dateofjoining}</td>
                  <td>{order.dateofmaturity}</td>
                  <td>{order.dateofclaim}</td>
                  <td>{order.claimstatus}</td>
                  <td>{order.claimstatus === "Ongoing" ? <button onClick={()=>earlyWithdraw(order.id)}>Early Withdraw</button> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {stackingData?.data.length > 0 ? (
            ""
          ) : (
            <div className={`${styles.nodata} flex-center column`}>
              <img src={nodata} alt="nodata" />
              <h1>No data</h1>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default Stack;
