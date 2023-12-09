import React, { useContext } from "react";
import styles from "./Hero.module.scss";
import Context from "../../../Context/Context";
import Navbar from "../Navbar/Navbar";
import Heroimage from "../Heroimage/Heroimage";
import HeroSlides from "../HeroSlides/HeroSlides";
import ListingAnnoucement from "../ListingAnnoucement/ListingAnnoucement";

const Hero = () => {
  const { states } = useContext(Context);

  const exchange = () => window.location.href = "/exchange";
  const contactUs = () => window.location.href = "/contact-us";

  const dmode = states.dmode;
  return (
    <div className={`${dmode ? styles.d_hero : styles.l_hero}`}>
      <Navbar />
      <div className={`${styles.hero_content} flex-between container`}>
        <div className={`${styles.heroleft} flex-start column`}>
          <p className="flex">
            <span className={styles.line}></span>Bitcoin Regular With Lowest Commission
          </p>
          <h1>The Easiest Way To Buy, Sell And Trade Crypto Currency Coins</h1>

          <div className="flex">
            <button onClick={contactUs} className="btn">Support</button>
            <button onClick={exchange} className="btn btns">Exchange</button>
          </div>
        </div>

        <div className={styles.hero_i}><Heroimage /></div>
      </div>

      <HeroSlides />

      <ListingAnnoucement />
    </div>
  );
};

export default Hero;
