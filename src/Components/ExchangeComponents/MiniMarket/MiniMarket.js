import React, { useContext, useEffect , useState } from "react";
import Context from "../../../Context/Context";
import styles from "./MiniMarket.module.scss";
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';

const MiniMarket = ({ miniData , dmode , popup , setPopup }) => {
  const { states } = useContext(Context);
  const [cs, setCs] = useState();
  const [ms, setMs] = useState();

  const scF = () => {
    if (window.innerWidth <= 1050) {
      if(states.stokenbtn){
        setPopup(false)
      }else{
        setPopup(true)
      }
    }
  };

  useEffect(() => {
    if(miniData){
      let [a , b] = miniData?.pair.split("_")
      setCs(a)
      setMs(b)
    } 
  }, [miniData])



  

  return (
    <div className={dmode ? styles.mm_d : styles.mm_l}>
      <div className={styles.grids}>
        <div className={styles.grid_c}>
          <button onClick={scF} className="flex-center">
            {/* <img
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg"
              alt="btc"
            /> */}
            <div className={`flex-start column`}>
              {/* <h1>BITCOIN</h1> */}
              <h1>{`${cs}/${ms}`}</h1>
            </div>
            <div className={`${styles.arrow} flex-center`}>{popup ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
          </button>
        </div>
        <div className={styles.grid_v}>
        <h2>Volume : {parseFloat(miniData?.quote).toFixed(9 - miniData?.quote.length)} {miniData?.currency_symbol} /{parseFloat(miniData?.base).toFixed(9 - miniData?.base.length)} {miniData?.market_symbol}</h2>
          {/* ****** price and value ****** */}
          <div className={`${styles.respv} flex-between`}>
          <div className={`${styles.pandc} flex-start column`}>
          
          <div className="flex"><h5>Last price : </h5> <p>{parseFloat(miniData?.price).toFixed(9 - miniData?.price.length)}</p></div>
          <div className="flex"><h5>%Change : </h5><p>{parseFloat(miniData?.percent_change).toFixed(2)}%</p></div>
          </div>
          <div className={styles.resv}>
            <h5>VOLUME</h5>
            <p>{parseFloat(miniData?.quote).toFixed(9 - miniData?.quote.length)} {miniData?.currency_symbol} /{parseFloat(miniData?.base).toFixed(9 - miniData?.base.length)} {miniData?.market_symbol}</p> 
          </div>
          </div>
          {/* ****** price and value ****** */}
        </div>

        <div className={`${styles.rows} flex-start column`}>
          <h5>Last Price</h5>
          <p>{parseFloat(miniData?.price).toFixed(9 - miniData?.price.length)}</p>
        </div>
        <div className={`${styles.rows} flex-start column`}>
          <h5>%Change</h5>
          <p>{parseFloat(miniData?.percent_change).toFixed(2)}%</p>
        </div>
        <div className={`${styles.rows} flex-start column`}>
          <h5>High</h5>
          <p>{parseFloat(miniData?.high).toFixed(9 - miniData?.high.length)}</p>
        </div>
        <div className={`${styles.rows} flex-start column`}>
          <h5>Low</h5>
          <p>{parseFloat(miniData?.low).toFixed(9 - miniData?.low.length)}</p>
        </div>
        <div className={`${styles.rows} flex-start column`}>
          <h5>Open</h5>
          <p>{parseFloat(miniData?.open).toFixed(9 - miniData?.open.length)}</p>
        </div>
        <div className={`${styles.rows} flex-start column`}>
          <h5>Close</h5>
          <p>{parseFloat(miniData?.close).toFixed(9 - miniData?.close.length)}</p>
        </div>

      </div>

        {/* ******** tab mode ****** */}
        <div className={styles.tmmm}>
        <div className={`flex-start column`}>
          <h5>High</h5>
          <p>1699150.00000000</p>
        </div>
        <div className={`flex-start column`}>
          <h5>Low</h5>
          <p>1699150.00000000</p>
        </div>
        <div className={`flex-start column`}>
          <h5>Highest Ask</h5>
          <p>1699150.00000000</p>
        </div>
        <div className={`flex-start column`}>
          <h5>Low Bid</h5>
          <p>1699150.00000000</p>
        </div>
        </div>
        {/* ******** tab mode ****** */}
    </div>
  );
};

export default MiniMarket;
