import React, { useContext, useState, useEffect } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import styles from "./Register.module.scss";
import wallet_i from "../../Assets/wallet_login_register.png";
import { BsEyeFill } from "react-icons/bs";
import {
  allLetter,
  sendGetRequest,
  sendRequest,
  vcpassword,
  vpassword,
} from "../../Helper/helper";
import validator from "validator";
import { Country, State } from "country-state-city";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";

const Register = () => {
  const [sp, setSp] = useState(false);
  const [value, setValue] = useState();
  const [_states, set_states] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [_alert, set_alert] = useState({});
  const [formData, setFormData] = useState({})
  const [scp, setScp] = useState(false);
  const { states } = useContext(Context);

  const spHandler = () => (sp ? setSp(false) : setSp(true));
  const scpHandler = () => (scp ? setScp(false) : setScp(true));

  const errorHandler = (key, val) => {
    let change = errorMessage;
    change[key] = val;
    setErrorMessage({ ...change });
  };

  const getData = (key, val) => {
    let change = formData;
    change[key] = val;
    setFormData({ ...change });
    set_alert({})
    if (key === "name") {
      if(!allLetter(val)){
        errorHandler(key , "Please enter valid name")
      }else{
        errorHandler(key , "")
      }
    }
    if (key === "country") {
        errorHandler(key , "")
        errorHandler("phone","")
    }
    if (key === "terms") {
        errorHandler(key , "")
    }
    if (key === "email") {
      if(!validator.isEmail(val)){
        errorHandler(key , "Please enter valid email")
      }else{
        errorHandler(key , "")
      }
    } 
    if (key === "password") {
      if(!vpassword(val)){
        errorHandler(key , <span>* Passwords must be at least 10 characters in length and<br/>* a minimum of 1 lower case letter [a-z] and<br/>* a minimum of 1 upper case letter [A-Z] and<br/>* a minimum of 1 numeric character [0-9] and<br/>* a minimum of 1 special characte {`~!@#$%^&*()-_+={}[]|\;:"<>,./?`}</span>)
      }else{
        errorHandler(key , "")
      }
    }
     if (key === "cpassword") {
      if(!vcpassword(formData.password, val)){
        errorHandler(key , "Password is not matched")
      }else{
        errorHandler(key , "")
      }
    }
    if (formData.country) {
      const getCstates = Country.getAllCountries();
      getCstates.map((value) => {
        if (value.name === formData.country) {
          set_states(State.getStatesOfCountry(value.isoCode));
          let change = formData;
          change.countryCode = value.isoCode;
          change.flag = value.flag;
          change.phoneCode = value.phonecode;
          setFormData({ ...change });
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name && !errorMessage.name &&
      formData.email && !errorMessage.email &&
      formData.password && !errorMessage.password &&
      formData.country && !errorMessage.country &&
      formData.phone && !errorMessage.phone &&
      formData.terms === "on" && !errorMessage.terms
    ) {
      const res = await sendRequest(
        {
          name: formData.name,
          password: formData.password,
          email: formData.email,
          state: formData.state,
          country: formData.country,
          confirm_password: formData.cpassword,
          referenceid: formData.reference,
          city: formData.city,
          mobile: formData.phone,
        },
        "signup",
        "post"
      );

      if (res.status === 200) {
        const _swal = await swal(res.message);
        if (_swal) {
          document.querySelector("form").reset();
          setFormData({})
          window.location.href = "/signin";
        }
      } else if (res.status === 401) {
        const uniq = Object.keys(res.data);
        uniq.map((value) => {
          if (value === "email") {
            errorHandler(
              value,
              "Your email address has already been taken. Try logging in with the same email."
            );
          } else if (value === "mobile") {
            errorHandler(value, "Your phone no has already been taken.");
          }
        });
        console.log(res, errorMessage);
      } else {
        console.log(res, errorMessage);
        swal(JSON.stringify(res.data));
      }
    } else {
         if(!formData.name){
          errorHandler("name" ,"Please fill your name")
        }
         if(!formData.email){
          errorHandler("email" ,"Please fill your email")
        }
         if(formData.country === undefined || formData.country.length === 0){
          errorHandler("country" ,"Please Select your country")
        }
         if(!formData.phone){
          errorHandler("phone" ,"Please fill your phone no")
        }
         if(!formData.password){
          errorHandler("password" ,"Please set your password")
        }
         if(!formData.cpassword){
          errorHandler("cpassword" ,"Please confirm your password")
        }
         if(formData.terms !== "on" || !formData.terms){
          errorHandler("terms" ,"Please accept the Terms & Conditions and Privacy Policy")
        }
    }
  };

  const dmode = states.dmode;

  useEffect(() => {
    (async()=>{
      document.querySelector('form').reset()
    setFormData({});
    const res = await sendGetRequest("global");
    getData("reference", res.data.default_referalId)
    const _reference = window.location.search.split("=")[1];
    _reference && getData("reference", _reference)
    })()
  }, []);

  useEffect(() => {
    if (value) {
      const isValidp = isValidPhoneNumber(value) ? "true" : "false";
      errorHandler("mobile", "");
      if (isValidp === "true") {
        errorHandler("phone", "");
        getData("phone", value);
      } else {
        formData.country && formData.phone && errorHandler("phone", "Please enter valid phone no");
      }

      if (!formData.country) {
        setValue("");
        getData("phone", "")
        errorHandler("country", "Please select country first");
        errorHandler("phone", "Please select country first");
      }
    }
  }, [value]);
  return (
    <div className={dmode ? styles.register_d : styles.register_l}>
      <Navbar />
      <div className={`${styles._register} flex-between container`}>
        <form onSubmit={handleSubmit} className="flex-start column">
          <h1>BTRL Exchange- Sign Up</h1>
          <input
            onChange={(e) => getData("name", e.target.value)}
            type="text"
            placeholder="Name*"
          />
          <div className={styles.warning_note}>
            <p>{_alert.name}</p>
          </div>
          {errorMessage.name && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.name}</p>
          </div>}
          <input
            onChange={(e) => getData("email", e.target.value)}
            type="email"
            
            placeholder="Email Address*"
          />
          {errorMessage.email && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.email}</p>
          </div>}

          <div className={styles.sbox}>
            <select
              
              className={styles.country}
              onChange={(e) => getData("country", e.target.value)}
            >
              <option value={""}>Select Country*</option>
              {Country.getAllCountries().map((option, index) => {
                return <option value={option.name} key={index}>{option.name} {option.flag}</option>;
              })}
            </select>
          </div>
          {errorMessage.country && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.country}</p>
          </div>}

          <div className={`${styles.sc} flex-between`}>
            <div className={styles.sbox}>
              <select
                className={styles.country}
                onChange={(e) => getData("state", e.target.value)}
              >
                <option value={""}>Select State*</option>
                {_states.map((option, index) => {
                  return <option value={option.name} key={index}>{option.name}</option>;
                })}
              </select>
            </div>

            <input
              onChange={(e) => getData("city", e.target.value)}
              type="text"
              placeholder="City"
            />
          </div>
          <PhoneInput
            placeholder="Enter phone number"
            // international
            value={value}
            // countryCallingCodeEditable={false}
            defaultCountry={formData.countryCode ? formData.countryCode : "IN"}
            onChange={setValue}
            onClick={(e) => !formData.phone || formData.phone.length === 0 ? e.target.setSelectionRange(e.target.value.length, e.target.value.length) : ""}
            error={
              value
                ? isValidPhoneNumber(value)
                  ? undefined
                  : "Invalid phone number"
                : "Phone number required"
            }
          />
  
          {errorMessage.phone && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.phone}</p>
          </div>}

          {/* <Tooltip title="Password must be min 10 characher , 1 Upper case , 1 lower case and a special character"> */}
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
          {/* </Tooltip> */}
          {errorMessage.password && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.password}</p>
          </div>}

          <div className={`${styles.password} flex-between`}>
            <input
              onChange={(e) => getData("cpassword", e.target.value)}
              
              type={scp ? "text" : "password"}
              placeholder="Confirm Password*"
            />
            <button
              type="button"
              onClick={scpHandler}
              className={`${scp ? styles.eyea : styles.eye} flex-center`}
            >
              <BsEyeFill />
            </button>
          </div>
             {errorMessage.cpassword && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.cpassword}</p>
          </div>}

          <input
            onChange={(e) => getData("reference", e.target.value)}
            defaultValue={formData.reference}
            type="text"
            placeholder="Reference id*"
          />

          <div className={`${styles.terms} flex-start`}>
            <input
              className={styles.box}
              type="checkbox"
              name="terms"
              onClick={() =>
                formData.terms && formData.terms === "on"
                  ? getData("terms", "off")
                  : getData("terms", "on")
              }
            />
            <p>
              I certify that I am 18 years of age or older, and I agree to the
              <a href="/Terms&Conditions"> Terms & Conditions</a> and{" "}
              <a href="/PrivacyPolicy">Privacy Policy</a>.
            </p>
          </div>
          {errorMessage.terms && <div
            className={styles.warning_note}
          >
            <p>{errorMessage.terms}</p>
          </div>}

          <div className={`${styles.refer} flex-between`}>
            <button type="submit" className={`${styles.register_btn} btn`}>
              Register Now
            </button>
            <a href="/signin">I have an account ?</a>
          </div>
        </form>
        <img className={styles.bg} src={wallet_i} alt="wallet" />
      </div>

      <Footer />
    </div>
  );
};

export default Register;
