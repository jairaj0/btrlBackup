import React, { useContext, useEffect } from "react";
import styles from "./Menubar.module.scss";
import Context from "../../../Context/Context";
import { NavLink as Link } from "react-router-dom";
import DropDownMenu from "../Navbar/DropDownMenu";
import { userFuncion } from "../../../Helper/helper";

const Menubar = ({ toggle, changeToggle }) => {
  const { states, changeState } = useContext(Context);

  const signin = () => (window.location.href = "/signin");
  const signup = () => (window.location.href = "/signup");

  const dmode = states.dmode;
  const isLogin = sessionStorage.getItem("isLogin") === "false" ? false : true;
  useEffect(() => {
    toggle
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [toggle]);

  return (
    <div
      style={{ right: toggle ? "0" : "-120%" }}
      className={dmode ? styles.d_menu : styles.l_menu}
    >
      {isLogin ? (
        <div className={`${styles.login_m_navlinks} flex-start column`}>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/exchange"
          >
            Exchange
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/news"
          >
            News
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/contact-us"
          >
            Contact Us
          </Link>
          {/* <DropDownMenu valways={true} /> */}

          {/* <Link className={({isActive}) => isActive ? [styles.m_navlink , styles.m_active_nav_link].join(" ") : styles.m_navlink} to="/personal-information">Personal Information</Link> */}
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/bank-details"
          >
            Bank Details
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/change-password"
          >
            Change Password
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/security"
          >
            Security
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/balance"
          >
            Balance
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/history"
          >
            History
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/stack"
          >
            Stacking
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/refferal"
          >
            Reffer & Earn
          </Link>
          <button
            className="btn"
            onClick={() => {
              userFuncion(false);
              changeState(
                states.dmode,
                window.innerWidth,
                states.stokenbtn,
                states.buyTrade,
                false
              );
              window.location.href = "/exchange";
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={`${styles.m_navlinks} flex-start column`}>
          <div className={`${styles.losi} flex-between`}>
            <button onClick={signin} className="btn">
              Sign In
            </button>
            <button onClick={signup} className="btn btns">
              Sign Up
            </button>
          </div>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/exchange"
          >
            Exchange
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/news"
          >
            News
          </Link>
          <Link
            onClick={() => changeToggle(false)}
            className={({ isActive }) =>
              isActive
                ? [styles.m_navlink, styles.m_active_nav_link].join(" ")
                : styles.m_navlink
            }
            to="/contact-us"
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menubar;
