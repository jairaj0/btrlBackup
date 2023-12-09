import React, { useContext } from "react";
import styles from "./Buysell.module.scss";
import { BsPerson } from "react-icons/bs";
import { FaExchangeAlt, FaCoins } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { MdFlightTakeoff } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Context from "../../../Context/Context";
import feature from "../../../Assets/featur.png";

const Buysell = () => {
  const { states } = useContext(Context);

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.d_buysell : styles.l_buysell}>
      <div className="container">
        <h1>
          Buy & Sell Digital <br /> Assets on BTRL
        </h1>
        <div className={`${styles.bs} flex-between`}>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <div className={`${styles.p_icon} flex-center`}>
                <BsPerson />
              </div>
              <div className={`${styles.inbox} flex-start column`}>
                <h2>Register / login</h2>
                <button>Visit now</button>
              </div>
            </div>

            <div className={styles.box1}>
              <div className={`${styles.p_icon} flex-center`}>
                <BiMoney />
              </div>
              <div className={`${styles.inbox} flex-start column`}>
                <h2>withdraw funds</h2>
                <button>Visit now</button>
              </div>
            </div>

            <div className={styles.box2}>
              <div className={`${styles.p_icon} flex-center`}>
                <AiOutlineAppstoreAdd />
              </div>
              <div className={`${styles.inbox} flex-start column`}>
                <h2>public api</h2>
                <button>Visit now</button>
              </div>
            </div>

            <div className={styles.box}>
              <div className={`${styles.p_icon} flex-center`}>
                <FaExchangeAlt />
              </div>
              <div className={`${styles.inbox} flex-start column`}>
                <h2>exchange</h2>
                <button>Visit now</button>
              </div>
            </div>

            <div className={styles.box}>
              <div className={`${styles.p_icon} flex-center`}>
                <FaCoins />
              </div>
              <div className={`${styles.inbox} flex-start column`}>
                <h2>Deposite Coins</h2>
                <button>Visit now</button>
              </div>
            </div>

            <div className={styles.box1}>
              <div className={`${styles.p_icon} flex-center`}>
                <MdFlightTakeoff />
              </div>
              <div className={`${styles.inbox} flex-start column`}>
                <h2>Trade</h2>
                <button>Visit now</button>
              </div>
            </div>
          </div>

          <div className={styles.bsimg}>
            <img src={feature} alt="feature" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buysell;
