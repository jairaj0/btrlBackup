import React,{useContext} from 'react';
import styles from './Ourpatners.module.scss';
import Context from '../../../Context/Context';
import coinmarketcap from '../../../Assets/coinmarketcap.svg';
import coinmarketcap1 from '../../../Assets/coinmarketcap.png';
import athcoinindex from '../../../Assets/athcoinindex.png';
import coingecko from '../../../Assets/coingecko.png';
import cryptocoinworld from '../../../Assets/cryptocoinworld.png';

const Ourpatners = () => {
    const {states} = useContext(Context)

    const dmode = states.dmode;
  return (
    <div className={dmode ? styles.d_patners : styles.l_patners}>
    <div className="container">
        <h1>Our Patners</h1>

        <div className={`${styles.patner_box}`}>
            <a href="/"><img src={coinmarketcap} alt="coinmarketcap" /></a>
            <a href="/"><img src={coinmarketcap1} alt="coinmarketcap1" /></a>
            <a href="/"><img src={athcoinindex} alt="athcoinindex" /></a>
            <a href="/"><img src={coingecko} alt="coingecko" /></a>
            <a href="/"><img src={cryptocoinworld} alt="cryptocoinworld" /></a>
        </div>

        <div className={`${styles.trading} flex-center column`}>
            <h3>Start Trading Now</h3>
            <p>BTRL is the easiest, safest, and fastes way to buy & sell crypto asset exchange</p>
            <div className="flex">
                <button>register now</button>
                <button>trade now</button>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Ourpatners