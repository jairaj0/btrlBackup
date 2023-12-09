import React, { useContext } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import app from '../../../Assets/approved.png';
import styles from './Approved.module.scss';

const Approved = () => {
    const { states } = useContext(Context); 

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.app_d : styles.app_l}>
        <Navbar />
        <div className={`${styles.app} flex-center column`}>
        <h1>Already Approved</h1>
        <p>Your Account Already Approved <a href="/signin">Sign in</a></p>
        <img src={app} alt="approved" />
        </div>
        <Footer />
    </div>
  )
}

export default Approved