import React, { useContext } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import ummi from '../../../Assets/undermaintenance.png';
import styles from './UnderMaintenance.module.scss';

const UnderMaintenance = () => {
    const { states } = useContext(Context);

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.umm_d : styles.umm_l}>
        <Navbar />
        <div className={`${styles.umm} flex-center column`}>
        <h1>Under Maintenance Mode</h1>
        <img src={ummi} alt="Under Maintenance Mode" />
        </div>
        <Footer />
    </div>
  )
}

export default UnderMaintenance