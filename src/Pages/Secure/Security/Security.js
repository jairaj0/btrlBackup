import React, { useContext, useState } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import styles from "./Security.module.scss";
import twov from "../../../Assets/twov.svg";
import backup from "../../../Assets/backup.svg";
import dis from "../../../Assets/disabled.svg";
import login from "../../../Assets/login.svg";
import { MdSecurity } from "react-icons/md";
import { BsPersonCheckFill , BsPrinter } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import QRCode from "react-qr-code";

const Step1 = () => {
  return (
    <div className={`${styles._container} flex-between`}>
      <h1 className={`${styles.title} flex`}>
        <MdSecurity />
        <span>GOOGLE AUTHENTICATION</span>
      </h1>
      <div className={styles.box}>
        <p className={styles.note}>
          * Please download and install Google authenticate app on your
          phone, and scan following QR code to configure your device.
        </p>

        <div className="flex-center column">
          <div className={`${styles.qrcode} flex-center`}>
            <QRCode value="jai rawat" />
          </div>
          <p className={styles.n2}>
            Manually Enter the Code In Your Google Authenticator App.
          </p>
          <h4>16 Digit Key : P5DT5SDBQS34F2UF</h4>

          <input type="text" placeholder="6 Digit code" />
          <button className="flex-center"><BsPersonCheckFill /><span>Validate</span></button>
        </div>
      </div>
      <img className={styles.twov} src={twov} alt="two way verification" />
    </div>
  );
};
const Step2 = () => {
  return (
    <div className={`${styles._container} flex-between`}>
      <h1 className={`${styles.title} flex`}>
        <MdSecurity />
        <span>GOOGLE AUTHENTICATION</span>
      </h1>
      <div className={styles.box}>
        <h1 className={styles.title2}>BTRL Exchange Backup Code</h1>
        <p className={styles.note}>
         * If your phone is lost, stolen, or erased you'll need to
          restore vour authenticator application from this backup. Please store
          it in a safe place. <br/>
         * This code changes each time you enable 2FA. If you disable
          2FA, this code will no longer be valid.
        </p>
        <div className="flex-center column">
          <div className={`${styles.qrcode} flex-center`}>
            <QRCode value="jai rawat" />
          </div>
          <p className={styles.n2}>
            Manually Enter the Code In Your Google Authenticator App.
          </p>
          <h4>16 Digit Key : P5DT5SDBQS34F2UF</h4>
          <div className={`${styles.twobtns} flex-between`}>
          <button className="flex-center"><BsPrinter /><span>Print QR Code</span></button>
          <button className="flex-center"><AiOutlineDownload /><span>Download QR Code Pdf</span></button>
          </div>
        </div>
      </div>
      <img className={styles.twov} src={backup} alt="backup" />
    </div>
  );
};
const Step3 = () => {
  return (
    <div className={`${styles._container} flex-between`}>
      <h1 className={`${styles.title} flex`}>
        <MdSecurity />
        <span>GOOGLE AUTHENTICATION</span>
      </h1>
      <div className={styles.box}>
        <h1 className={styles.title2}>Disable Two Factor Authentication</h1>
        <p className={styles.note}>
          * Once you disable this. Your previous 2FA backup is useless <br/>
          * This feature is disabled from your login.
        </p>
 
        <div className="flex-center column">
          <input type="text" placeholder="6 Digit code" />
          <button className="flex-center"><BsPersonCheckFill /><span>Validate</span></button>
        </div>
      </div>
      <img className={styles.twov} src={dis} alt="backup" />
    </div>
  );
};
const Step4 = () => {
  return (
    <div className={`${styles._container} flex-between`}>
      <h1 className={`${styles.title} flex`}>
        <MdSecurity />
        <span>GOOGLE AUTHENTICATION</span>
      </h1>
      <div className={styles.box}>
        <h1 className={styles.title2}>BTRL Exchange - Verify 2FA Code</h1>
 
        <div className="flex-center column">
          <input type="text" placeholder="Google Authentication Code" />
          <button className="flex-center"><BsPersonCheckFill /><span>Validate</span></button>
        </div>
      </div>
      <img className={styles.twov} src={login} alt="backup" />
    </div>
  );
};

const Security = () => {
  const { states } = useContext(Context);
  const All = [<Step1 />, <Step2 /> , <Step3 /> , <Step4 />]

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.secu_d : styles.secu_l}>
      <Navbar />
      <div className="container">
      <div className={`${styles.secu}`}>
        {All[3]}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Security;
