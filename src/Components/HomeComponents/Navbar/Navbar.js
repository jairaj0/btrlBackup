import React, { useState, useContext, useEffect } from "react";
import styles from "./Navbar.module.scss";
import logo from "../../../Assets/logo.png";
import { NavLink as Link } from "react-router-dom";
import Context from "../../../Context/Context";
import { FaRegLightbulb, FaWhatsapp } from "react-icons/fa";
import Menubar from "../Menubar/Menubar";
import DropDownMenu from "./DropDownMenu";
import jwt_decode from "jwt-decode";
import { sendGetRequest, userFuncion, userLogin } from "../../../Helper/helper";

const Navbar = () => {
  const { states, changeState } = useContext(Context);
  const [dmode, setDmode] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [exchangeUrl, setExchangeUrl] = useState("/exchange");
  const modeChange = () => (dmode ? changeState(false , states.swidth , states.stokenbtn , states.buyTrade , states.isLogin) : changeState(true , states.swidth , states.stokenbtn , states.buyTrade , states.isLogin));

  localStorage.setItem("dmode", dmode);

  const signin = () => (window.location.href = "/signin");
  const signup = () => (window.location.href = "/signup");

  useEffect(() => {
    toggle
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
    window.addEventListener("resize", () => {
      setToggle(false);
      if (states.stokenbtn) {
        changeState(states.dmode, window.innerWidth, false);
      }
    });
  }, [toggle]);



  const getUser = sessionStorage.getItem("user");
  const isLogin = states.isLogin

  useEffect(() => {
    if (getUser !== "" && getUser!=="false") {
      try {
        const DecodedUser = jwt_decode(getUser);
        if (DecodedUser) {
          userLogin(true);
          changeState(states.dmode, window.innerWidth, states.stokenbtn , states.buyTrade , true)
        } else {
          changeState(states.dmode, window.innerWidth, states.stokenbtn , states.buyTrade , false)
          userLogin(false);
        }
      } catch (e) {
        if(e){
          userFuncion(false) 
          changeState(states.dmode, window.innerWidth, states.stokenbtn , states.buyTrade , false) ;
        }
      }
    } else {
      changeState(states.dmode, window.innerWidth, states.stokenbtn , states.buyTrade , false)
      userFuncion(false)
    }

  }, [getUser]);

  useEffect(() => {
    setDmode(states.dmode);
  }, [states.dmode]);
  return (
    <nav className={`${dmode ? styles.d_nav : styles.nav} flex`}>
      {isLogin ? (
        <div className={`${styles.loginNav} container flex-between`}>
          <div className="flex">
            <a href="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </a>
            <div className={`${styles.navlinks} flex`}>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/"
              >
                Home
              </Link>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to={exchangeUrl}
              >
                Exchange
              </Link>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/news"
              >
                News
              </Link>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/contact-us"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className={`${styles.rightnav} flex`}>
            <Link
              className={({ isActive }) =>
                isActive
                  ? [styles.navlink, styles.active_nav_link].join(" ")
                  : styles.navlink
              }
              to="/balance"
            >
              Balance
            </Link>
            <Link
              className={({ isActive }) =>
                isActive
                  ? [styles.navlink, styles.active_nav_link].join(" ")
                  : styles.navlink
              }
              to="/history"
            >
              History
            </Link>
            <Link
              className={({ isActive }) =>
                isActive
                  ? [styles.navlink, styles.active_nav_link].join(" ")
                  : styles.navlink
              }
              to="/stack"
            >
              Stacking
            </Link>
            <Link
              className={({ isActive }) =>
                isActive
                  ? [styles.navlink, styles.active_nav_link].join(" ")
                  : styles.navlink
              }
              to="/refferal"
            >
              Reffer & Earn
            </Link>

            <DropDownMenu />

            <button
              onClick={modeChange}
              type="button"
              className={`${styles.mode} flex-center`}
            >
              <FaRegLightbulb />
            </button>

            <div
              className={
                toggle
                  ? [styles.menubar, styles.open].join(" ")
                  : styles.menubar
              }
              onClick={() => (toggle ? setToggle(false) : setToggle(true))}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <Menubar toggle={toggle} changeToggle={setToggle} />

            <a
              href="https://wa.me/+919714826176"
              target="_blank"
              rel="noreferrer"
              className={`${styles.wts} flex-between`}
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      ) : (
        <div className="container flex-between">
          <div className="flex">
            <a href="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </a>
            <div className={`${styles.navlinks} flex`}>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/"
              >
                Home
              </Link>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/exchange"
              >
                Exchange
              </Link>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/news"
              >
                News
              </Link>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? [styles.navlink, styles.active_nav_link].join(" ")
                    : styles.navlink
                }
                to="/contact-us"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className={`${styles.rightnav} flex`}>
            <button onClick={signin} className="btn">
              Sign In
            </button>
            <button onClick={signup} className="btn btns">
              Sign Up
            </button>

            <button
              onClick={modeChange}
              type="button"
              className={`${styles.mode} flex-center`}
            >
              <FaRegLightbulb />
            </button>

            <div
              className={
                toggle
                  ? [styles.menubar, styles.open].join(" ")
                  : styles.menubar
              }
              onClick={() => (toggle ? setToggle(false) : setToggle(true))}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <Menubar toggle={toggle} />

            <a
              href="https://wa.me/+919714826176"
              target="_blank"
              rel="noreferrer"
              className={`${styles.wts} flex-between`}
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
