import React, { useContext , useState , useEffect } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import styles from './Refferal.module.scss';
import {AiTwotoneCopy} from 'react-icons/ai';
import nodata from '../../../Assets/nodata.jpg';
import { authRequestNb, refreshToken } from "../../../Helper/helper";
import CopyToClipboard from "react-copy-to-clipboard";

const rData = [];

const Refferal = () => {
  const [data, setData] = useState();
  const [levels, setLevels] = useState([]);
  const [copied, setCopied] = useState(false);
    const { states } = useContext(Context);

    const dmode = states.dmode;

    const copiedHandler = () =>{
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    useEffect(() => {
      (async () => {
        const res = await authRequestNb("referral");
        refreshToken(res.refresh_token)
        setData(res.data)
        let temp =[];
        for (const _level of Object.keys(res.data.rewards.rewards)) {
          temp.push([ _level , res.data.rewards.rewards[_level]])
        }
        setLevels(temp)
      })()
    }, [])
  return (
    <div className={dmode ? styles.reff_d : styles.reff_l}>
    <Navbar />
    <div className={`${styles.reff} container`}>
    <div className="flex-between">
        <div className={styles.impn}>
            <h1>Important Note:</h1>
            <p>20% of lifetime trading fee like BTC, ETH & BTRL etc.</p>
            <p>Refer And Earn Plan</p>
        </div>

        <div className={`${styles.il} flex-center column`}>
            <h1>Invite Link</h1>
            <h2 className="flex">{data?.self_details.url} <button className="flex-center">
            <CopyToClipboard
                text={data?.self_details.url}
                onCopy={copiedHandler}
              >
                <AiTwotoneCopy />
              </CopyToClipboard>
              {copied && <span>Copied!</span>}
            </button></h2>
        </div>
    </div>

    <h4>Reward of Referral Level Wise (IN {data?.rewards.reward_currency})</h4>

    <div className={styles.boxes}>
        {levels?.map((value ,i ) => <div key={i} className={styles.box}>
            <p>Level {value[0]}</p>
            <h1>{value[1]} {data?.rewards.reward_currency}</h1>
        </div>)}
    </div>

    <div className={`${styles.js} flex`}>
    <table>
  <thead>
    <tr>
    <th>#</th>
    <th>Joining</th>
    </tr>
  </thead>
  <tbody>
 <tr><td>Today</td><td>{data?.joining.todayJoining}</td></tr>
 <tr><td>KYC Completed</td><td>{data?.joining.todayComplete}</td></tr>
 <tr><td>KYC Pending</td><td>{data?.joining.todayPending}</td></tr>
 <tr><td>Total</td><td>{data?.joining.totalTeam}</td></tr>
  </tbody>
</table>

<div className={`${styles.spn} flex-center column`}>
    <h2>Sponser</h2>
    <h5>{data?.sponser_details.sponser_id} ({data?.sponser_details.name}, <span>{data?.sponser_details.mobile}</span>)</h5>
    <div className="flex-center">Referral ID - {data?.self_details.refferal_id}</div>
</div>
    </div>

       <div className={styles.table}>
       <table >
  <thead>
    <tr>
    <th>Name</th>
    <th>Email/Mobile</th>
    <th>Referral ID</th>
    <th>Level</th>
    <th>Joining Date</th>
    <th>{data?.rewards.reward_currency} Deposit Status</th>
    </tr>
  </thead>
  <tbody>
    { 
      data?.team.map((order , i) => <tr key={i}>
      <td>{order.name}</td>
      <td>{order.email}<br/>{order.mobile}</td>
      <td>{order.refferal_id}</td>
      <td>{order.level}</td>
      <td>{order.join_date}</td>
      <td>{order.deposit_status}</td>
    </tr>) 
    }
  </tbody>
</table>

       </div>
       {data?.team.length > 0 ? "" : <div className={`${styles.nodata} flex-center column`}>
  <img src={nodata} alt="nodata" />
  <h1>No data</h1>
</div>}
    </div>
    <Footer />
    </div>
  )
}

export default Refferal