import React, { useContext } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import failed from "../../../Assets/failed.png";
import styles from "./Failed.module.scss";
import { sendRequest } from "../../../Helper/helper";
import swal from "sweetalert";

const Failed = () => {
  const { states } = useContext(Context);

  const dmode = states.dmode;

  const resend = async () => {
    const hash = window.location.pathname.split("/")[2];
    const res = await sendRequest(
      { email_verify_hash: hash },
      "resend-verification",
      "post"
    );
    console.log(res);
 if (res.status === 400) {
      window.location.href = "/approved";
    } else {
      const _swal = await swal(res.message);
      if(_swal){
        window.location.href = "/signin";
      }
    }
  };
  return (
    <div className={dmode ? styles.fail_d : styles.fail_l}>
      <Navbar />
      <div className={`${styles.fail} flex-center column`}>
        <h1>Confirmation Failed</h1>
        <p>
          Confirmation link has been expired.{" "}
          <span onClick={resend}>Resend</span>
        </p>
        <img src={failed} alt="failed" />
      </div>
      <Footer />
    </div>
  );
};

export default Failed;
