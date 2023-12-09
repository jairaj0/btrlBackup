import React, { useContext, useState, useEffect } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import styles from "./Coininfo.module.scss";
import "./Coininfo.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { refreshToken, sendGetRequest } from "../../Helper/helper";



const Coininfo = () => {
  const [coins, setCoins] = useState();
  const [data, setData] = useState();
  const [_data, set_data] = useState();
  const [svalue, setSvalue] = useState(5);
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [activeToken, setActiveToken] = useState("ETH (Ethereum)");
  const { states } = useContext(Context);

  const dmode = states.dmode;

  const setFunc = () => {
    const ssize = window.innerWidth;
    if (ssize >= 1192) {
      setSvalue(5);
    }
    if (ssize <= 1192) {
      setSvalue(4);
    }
    if (ssize <= 1020) {
      setSvalue(3);
    }
    if (ssize <= 770) {
      setSvalue(2);
    }
    if (ssize <= 570) {
      setSvalue(1);
    }
  };
  useEffect(() => {
    setFunc()
    window.addEventListener("resize", setFunc);
    (async ()=> {
      const res = await sendGetRequest("get-coin-info");
      res.refresh_token && refreshToken(res.refresh_token);
      const _coins = [];
      set_data(res.data)
      res.data.map(value => _coins.push(`${value.currency_symbol} (${value.name})`));
      setCoins(_coins)
    })()
  }, []);

  useEffect(() => {
      _data?.map(value => {
        const aToken = activeToken.split(" ")[0]
        return value.currency_symbol === aToken && setData(value.coin_info);
    });
  }, [activeToken, _data])
  


  return (
    <div className={dmode ? styles.coininfo_d : styles.coininfo_l}>
      <Navbar />
      <div className={`${styles.coininfo} container`}>
        <div className="flex-center">
          <div
            className={`${styles.nevi} flex-center`}
            ref={(node) => setPrevEl(node)}
          >
            <AiOutlineLeft />
          </div>
          <Swiper
            slidesPerView={svalue}
            slidesPerGroup={svalue}
            // loop={true}
            navigation={{ prevEl, nextEl }}
            modules={[Navigation]}
            className={styles.mySwiper}
          >
            {coins?.map((coin, i) => (
              <SwiperSlide key={i}>
                <button
                  onClick={() => setActiveToken(coin)}
                  className={coin === activeToken ? styles.active : ""}
                >
                  {coin}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`${styles.nevi} flex-center`}
            ref={(node) => setNextEl(node)}
          >
            <AiOutlineRight />
          </div>
        </div>

        <div className={styles.tokenInfo}>
          {/* <h1>What is Ethereum?</h1>
          <p>
            Ethereum is a decentralized platform that runs smart contracts:
            applications that run exactly as programmed without any possibility
            of downtime, censorship, fraud or third party interference. These
            apps run on a custom built blockchain, an enormously powerful shared
            global infrastructure that can move value around and represent the
            ownership of property. This enables developers to create markets,
            store registries of debts or promises, move funds in accordance with
            instructions given long in the past (like a will or a futures
            contract) and many other things that have not been invented yet, all
            without a middle man or counterparty risk. The project was
            bootstrapped via an ether presale in August 2014 by fans all around
            the world. It is developed by the Ethereum Foundation, a Swiss
            nonprofit, with contributions from great minds across the globe. The
            intent of Ethereum is to create an alternative protocol for building
            decentralized applications, providing a different set of tradeoffs
            that we believe will be very useful for a large class of
            decentralized applications, with particular emphasis on situations
            where rapid development time, security for small and rarely used
            applications, and the ability of different applications to very
            efficiently interact, are important. Ethereum does this by building
            what is essentially the ultimate abstract foundational layer: a
            blockchain with a built-in Turing-complete programming language,
            allowing anyone to write smart contracts and decentralized
            applications where they can create their own arbitrary rules for
            ownership, transaction formats and state transition functions. A
            bare-bones version of Namecoin can be written in two lines of code,
            and other protocols like currencies and reputation systems can be
            built in under twenty. Smart contracts, cryptographic "boxes" that
            contain value and only unlock it if certain conditions are met, can
            also be built on top of the platform, with vastly more power than
            that offered by Bitcoin scripting because of the added powers of
            Turing completeness, value-awareness, blockchain-awareness and
            state.
          </p> */}

          <div
          dangerouslySetInnerHTML={{
            __html: data
          }}
          className={dmode ? "imported_d" : 'imported'}
        ></div>

          {/* <h1>Useful Links:</h1>
          <h5>
            Official website :{" "}
            <a href="/https://ethereum.org/en/">https://ethereum.org/en/</a>
          </h5>
          <h5>
            Official website :{" "}
            <a href="/https://etherscan.io/">https://etherscan.io/</a>
          </h5> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Coininfo;
