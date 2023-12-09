import React, { useContext } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import error from '../../../Assets/404.png';
import styles from './NotFound.module.scss';

const NoteFound = () => {
    const { states } = useContext(Context);

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.nf_d : styles.nf_l}>
        <Navbar />
        <div className={`${styles.nf} flex-center column`}>
        <h1>404</h1>
        <p>Page Not Found
         {/* <a href="/">Home</a> */}
         </p>
        <img src={error} alt="page not found" />
        </div>
        <Footer />
    </div>
  )
}

export default NoteFound