import React,{useContext} from "react";
import Context from "../../../Context/Context";
import styles from "./Secured.module.scss";
import insi from '../../../Assets/Wallet.png';
import cloud from '../../../Assets/Cloud.png';
import supp from '../../../Assets/about-icon-2.png';
import line from '../../../Assets/line.svg';
import shape1 from '../../../Assets/shape1.svg';
import shape2 from '../../../Assets/shape2.png';

const Secured = () => {
  const { states } = useContext(Context);

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.d_secured : styles.l_secured}>

<img className={styles.shape1} src={shape1} alt="shape1" />
<img className={styles.shape2} src={shape2} alt="shape1" />
    <h1 className="container">Your Asset is Secured with BTRL</h1>
    <div className={styles.circle}></div>
    <div className={`${styles.d_list_s} container`}>
    <div className={`${styles.s_d} flex-center column`}>
      <img src={insi} alt="insured" />
      <h3>INSURED</h3>
      <p>Crypto assets on our platform are covered by insurance</p>
    </div>
    <div className="flex-center"><img src={line} width={"100%"} alt="line" /></div>
    <div className={`${styles.s_d} flex-center column`}>
      <img src={cloud} alt="insured" />
      <h3>SECURED</h3>
      <p>Significant portion of digital assets in cold wallet</p>
    </div>
    <div className="flex-center"><img src={line} width={"100%"}  alt="line" /></div>
    <div className={`${styles.s_d} flex-center column`}>
      <img src={supp} alt="insured" />
      <h3>SUPPORTIVE</h3>
      <p>24/7 online custome service</p>
    </div>
    </div>
    </div>
  )
}

export default Secured