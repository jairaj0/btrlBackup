import React, { useContext, useState } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import wallet_i from "../../Assets/wallet_login_register.png";
import { BsEyeFill } from "react-icons/bs";
import styles from "./SignIn.module.scss";
import { sendRequest, vpassword } from "../../Helper/helper";
import validator from "validator";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import ReCaptcha from "../../Components/ReCaptcha/ReCaptcha";

const SignIn = ({ _redirect = "exchange" }) => {
  const [sp, setSp] = useState(false);
  const [_alert, set_alert] = useState({});
  const [captcha, setCaptcha] = useState();
  const [validate, setValidate] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { states } = useContext(Context);
  const spHandler = () => (sp ? setSp(false) : setSp(true));

  const alertHandler = (key, val) => {
    let change = _alert;
    change[key] = val;
    set_alert({ ...change });
  };

  const validateHandler = (key, val) => {
    let change = validate;
    change[key] = val;
    setValidate({ ...change });
  };

  const getData = (key, val) => {
    let change = formData;
    change[key] = val;
    setFormData({ ...change });
    set_alert({});
    if (key === "email") {
      validateHandler(key, validator.isEmail(val));
    } else if (key === "password") {
      validateHandler(key, vpassword(val));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate.email && validate.password) {
      const res = await sendRequest(
        {
          email: formData.email,
          password: formData.password,
          "g-recaptcha-response": true // this work is left for all pages
        },
        "login",
        "post"
      );
      try {
        if (res.status === 200) {
          const decoded = jwt_decode(res.data);
          localStorage.setItem("hideZero", decoded.hideZeroStatus);
          document.querySelector("form").reset();
          sessionStorage.setItem("user", JSON.stringify(res.data));
          localStorage.removeItem("Pages");
          window.location.href = `/${_redirect}`;
        } else if (res.status === 402) {
          swal(res.message);
        } else {
          swal(res.message);
        }
      } catch (err) {
        if (err) {
          swal(res.message, res.data);
        }
      }
    } else {
      if (
        (!validate.email && formData.email.length > 0) ||
        (!validate.password && formData.password.length > 0)
      ) {
        if (!validate.email && formData.email.length > 0) {
          alertHandler("email", "Please fill your correct email !");
        } else if (!validate.email) {
          alertHandler("email", "Please fill your email !");
        } else if (!validate.password && formData.password.length > 0) {
          alertHandler("password", "Please fill your correct password !");
        } else if (!validate.password) {
          alertHandler("password", "Please fill your password !");
        } else {
          swal("Somthing went worng !, refresh the page and try again");
        }
      } else if (
        (validate.email && formData.email.length > 0) ||
        (validate.password && formData.password.length > 0)
      ) {
        if (!validate.email && formData.email.length > 0) {
          alertHandler("email", "Please fill your correct email !");
        } else if (!validate.email) {
          alertHandler("email", "Please fill your email !");
        } else if (!validate.password && formData.password.length > 0) {
          alertHandler("password", "Please fill your correct password !");
        } else if (!validate.password) {
          alertHandler("password", "Please fill your password !");
        } else {
          swal("Somthing went worng !, refresh the page and try again");
        }
      } else {
        swal("Please fill your email and password !");
      }
    }
  };

  const dmode = states.dmode;

  return (
    <div className={dmode ? styles.signin_d : styles.signin_l}>
      <Navbar />
      <div className={`${styles._signin} flex-between container`}>
        <form onSubmit={handleSubmit} className="flex-start column">
          <h1>BTRL Exchange- Sign In</h1>
          <input
            onChange={(e) => getData("email", e.target.value)}
            type="email"
            placeholder="Email Address*"
          />
          <div className={styles.warning_note}>
            <p>
              {validate.email === false &&
                formData.email.length > 0 &&
                "Please fill your valid email id"}
            </p>
          </div>
          <div className={styles.warning_note}>
            <p>{_alert.email}</p>
          </div>
          <div className={`${styles.password} flex-between`}>
            <input
              onChange={(e) => getData("password", e.target.value)}
              type={sp ? "text" : "password"}
              placeholder="Password*"
            />
            <button
              type="button"
              onClick={spHandler}
              className={`${sp ? styles.eyea : styles.eye} flex-center`}
            >
              <BsEyeFill />
            </button>
          </div>
          <div className={styles.warning_note}>
            <p>
              {validate.password === false &&
                formData.password.length > 0 &&
                "Please fill your valid password"}
            </p>
          </div>
          <div className={styles.warning_note}>
            <p>{_alert.password}</p>
          </div>
          {/* <ReCaptcha checkCaptcha={setCaptcha} /> */}
          <button type="submit" className={`${styles.signin_btn} btn`}>
          {/* <button disabled={captcha ? false : true} type="submit" className={`${styles.signin_btn} btn`}> */}
            Login Now
          </button>
          <div className={`${styles.refer} flex-between`}>
            <a href="/signup">Don't have an account?</a>
            <a href="/forget-password">Forgot password?</a>
          </div>
        </form>
        <img src={wallet_i} alt="wallet" />
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
