import React, { useContext } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import succ from '../../../Assets/success.png';
import styles from './Success.module.scss';

const Success = () => {
    const { states } = useContext(Context);

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.succ_d : styles.succ_l}>
        <Navbar />
        <div className={`${styles.succ} flex-center column`}>
        <h1>Account Verified</h1>
        <p>Congratulations! Your email address is verified! Now you can <a href="/signin">Login</a></p>
        <img src={succ} alt="Under Maintenance Mode" />
        </div>
        <Footer />
    </div>
  )
}

export default Success