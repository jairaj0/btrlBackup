import React, { useContext, useState } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import wallet_i from "../../Assets/changeP.svg";
import { BsEyeFill } from "react-icons/bs";
import { AiTwotoneLock } from "react-icons/ai";
import styles from "./ChangePassword.module.scss";
import { authRequest, refreshToken, vcpassword, vpassword } from "../../Helper/helper";
import swal from "sweetalert";

const ChangePassword = () => {
  const [sp, setSp] = useState({
    op: false,
    np: false,
    cp: false,
  });
  const { states } = useContext(Context);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const spHandler = (_val) => {
    let change = sp;
    change[_val] = sp[_val] ? false : true;
    setSp({ ...change });
  };

  const formDataSet = (key, value) => {
    let change = formData;
    change[key] = value;
    setFormData({ ...change });

    if (key === "new_p") {
      !vpassword(value) &&
        errorMessageSet(
          key,
          <span>
            * Passwords must be at least 10 characters in length and
            <br />* a minimum of 1 lower case letter [a-z] and
            <br />* a minimum of 1 upper case letter [A-Z] and
            <br />* a minimum of 1 numeric character [0-9] and
            <br />* a minimum of 1 special characte{" "}
            {`~!@#$%^&*()-_+={}[]|\;:"<>,./?`}
          </span>
        );
      vpassword(value) && errorMessageSet(key, "");
      vcpassword(value , formData.confirm_p) && errorMessageSet("confirm_p", "");
    }
    if (key === "old_p") {
      errorMessageSet(key, "");
    }
    if (key === "confirm_p") {
      !vcpassword(formData.new_p, value) &&
        errorMessageSet(key, "Password is not matched");
      vcpassword(formData.new_p, value) && errorMessageSet(key, "");
    }
  };
  const errorMessageSet = (key, val) => {
    let change = errorMessage;
    change[key] = val;
    setErrorMessage({ ...change });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.old_p &&
      !errorMessage.old_p &&
      formData.new_p &&
      !errorMessage.new_p &&
      formData.confirm_p &&
      !errorMessage.confirm_p &&
      formData.new_p === formData.confirm_p &&
      formData.new_p !== formData.old_p
    ) {
     const res = await authRequest({
      old_password : formData.old_p,
      new_password : formData.new_p,
      confirm_password : formData.confirm_p,
    }, "change-password");
    if(res.status === 200){
      console.log(res)
      swal(res.message)
      setErrorMessage({});
      setFormData({});
      document.querySelector("form").reset();
    }else if(res.status === 403){
      errorMessageSet("old_p" , res.message)
    }else{
      swal(res.message)
    }
    refreshToken(res.refresh_token)
    } else {
      if (!formData.old_p) {
        errorMessageSet("old_p", "Please enter old password");
      }
      if (!formData.new_p) {
        errorMessageSet("new_p", "Please enter new password");
      }
      if (!formData.confirm_p) {
        errorMessageSet("confirm_p", "Please confirm password");
      }
      if (formData.new_p === formData.old_p) {
        errorMessageSet(
          "new_p",
          "New password must be different to your old password"
        );
      }
      if (formData.new_p !== formData.confirm_p) {
        errorMessageSet("confirm_p", "Password is not matched");
      }
    }
  };

  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.chpass_d : styles.chpass_l}>
      <Navbar />
      <div className={`${styles._chpass} flex-between container`}>
        <form onSubmit={handleSubmit} className="flex-start column">
          <h1>Change Password</h1>
          <div className={`${styles.password} flex-between`}>
            <span className="flex-center">
              <AiTwotoneLock />
            </span>
            <input
              onChange={(e) => formDataSet("old_p", e.target.value)}
              type={sp.op ? "text" : "password"}
              placeholder="Old Password"
            />
            <button
              type="button"
              onClick={() => spHandler("op")}
              className={`${sp.op ? styles.eyea : styles.eye} flex-center`}
            >
              <BsEyeFill />
            </button>
          </div>
          {errorMessage.old_p && (
            <p className={styles.warning_note}>{errorMessage.old_p}</p>
          )}
          <div className={`${styles.password} flex-between`}>
            <span className="flex-center">
              <AiTwotoneLock />
            </span>
            <input
              onChange={(e) => formDataSet("new_p", e.target.value)}
              type={sp.np ? "text" : "password"}
              placeholder="New Password"
            />
            <button
              type="button"
              onClick={() => spHandler("np")}
              className={`${sp.np ? styles.eyea : styles.eye} flex-center`}
            >
              <BsEyeFill />
            </button>
          </div>
          {errorMessage.new_p && (
            <p className={styles.warning_note}>{errorMessage.new_p}</p>
          )}
          <div className={`${styles.password} flex-between`}>
            <span className="flex-center">
              <AiTwotoneLock />
            </span>
            <input
              onChange={(e) => formDataSet("confirm_p", e.target.value)}
              type={sp.cp ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => spHandler("cp")}
              className={`${sp.cp ? styles.eyea : styles.eye} flex-center`}
            >
              <BsEyeFill />
            </button>
          </div>
          {errorMessage.confirm_p && (
            <p className={styles.warning_note}>{errorMessage.confirm_p}</p>
          )}

          <button type="submit" className={`${styles.chpass_btn} btn`}>
            Submit
          </button>
        </form>
        <img src={wallet_i} alt="wallet" />
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassword;
