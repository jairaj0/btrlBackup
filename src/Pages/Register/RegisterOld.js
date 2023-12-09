import React, { useContext, useState, useEffect } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import styles from "./Register.module.scss";
import wallet_i from "../../Assets/wallet_login_register.png";
import { BsEyeFill } from "react-icons/bs";
import {
  allLetter,
  sendRequest,
  vcpassword,
  vpassword,
} from "../../Helper/helper";
import validator from "validator";
import { Country, State } from "country-state-city";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";

const Register = () => {
  const [sp, setSp] = useState(false);
  const [value, setValue] = useState();
  const [_states, set_states] = useState([]);
  const [backError, setBackError] = useState({});
  const [_alert, set_alert] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    state: "",
    country: "",
    confirm_password: "",
    referenceid: "",
    city: "",
    mobile: "",
  });
  const [validate, setValidate] = useState({});
  const [scp, setScp] = useState(false);
  const { states } = useContext(Context);

  const spHandler = () => (sp ? setSp(false) : setSp(true));
  const scpHandler = () => (scp ? setScp(false) : setScp(true));

  const validateHandler = (key, val) => {
    let change = validate;
    change[key] = val;
    setValidate({ ...change });
  };

  const backErrorHandler = (key, val) => {
    let change = backError;
    change[key] = val;
    setBackError({ ...change });
  };

  const alertHandler = (key, val) => {
    let change = _alert;
    change[key] = val;
    set_alert({ ...change });
  };

  const getData = (key, val) => {
    let change = formData;
    change[key] = val;
    setFormData({ ...change });
    set_alert({})
    console.log(formData);
    if (key === "name") {
      validateHandler(key, allLetter(val));
      console.log(validate);
    } else if (key === "email") {
      validateHandler(key, validator.isEmail(val));
      backErrorHandler(key, "");
      console.log(validate);
    } else if (key === "password") {
      validateHandler(key, vpassword(val));
      console.log(validate);
    } else if (key === "cpassword") {
      validateHandler(key, vcpassword(formData.password, val));

      console.log(formData);
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
      validate.name &&
      validate.email &&
      validate.password &&
      formData.country.length > 0 &&
      validate.phone &&
      formData.terms === "on"
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
          window.location.href = "/signin";
        }
      } else if (res.status === 401) {
        const uniq = Object.keys(res.data);
        uniq.map((value) => {
          if (value === "email") {
            backErrorHandler(
              value,
              "Your email address has already been taken. Try logging in with the same email."
            );
          } else if (value === "mobile") {
            backErrorHandler(value, "Your phone no has already been taken.");
          }
        });
        console.log(res.data, "401", backError);
      } else {
        console.log(res);
        swal(JSON.stringify(res.data));
      }
    } else {
      if(validate.name ||
        validate.email ||
        validate.password ||
        validate.phone ||
        formData.terms === "on"){
         if(!validate.name){
          alertHandler("name" ,"Please fill your name")
        }else if(!validate.email){
          alertHandler("email" ,"Please fill your email")
        }else if(formData.country === undefined || formData.country.length === 0){
          alertHandler("country" ,"Please Select your country")
        }else if(!validate.phone){
          alertHandler("phone" ,"Please fill your phone no")
        }else if(!validate.password){
          alertHandler("password" ,"Please set your password")
        }else if(!formData.cpassword){
          alertHandler("cpassword" ,"Please confirm your password")
        }else if(formData.terms === "off" || formData.terms === undefined){
          alertHandler("terms" ,"Please accept the Terms & Conditions and Privacy Policy")
        }else{
          swal("Please fill all required fields !")
        }
      }else{
        swal("Please fill all required fields !")
      }
    }
  };

  const dmode = states.dmode;

  useEffect(() => {
    setFormData({});
  }, []);

  useEffect(() => {
    if (value) {
      const isValidp = isValidPhoneNumber(value) ? "true" : "false";
      backErrorHandler("mobile", "");
      if (isValidp === "true") {
        validateHandler("phone", true);
        getData("phone", value);
      } else {
        validateHandler("phone", false);
        console.log(validate);
      }

      if (!formData.country) {
        setValue("");
        getData("phone", undefined)
        validateHandler("phone", false);
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
          <div
            className={styles.warning_note}
          >
            <p>{validate.name === false && formData.name.length > 0 && "Only use alphabet"}</p>
          </div>
          <input
            onChange={(e) => getData("email", e.target.value)}
            type="email"
            
            placeholder="Email Address*"
          />
          <div
            className={styles.warning_note}
          >
            <p>{validate.email === false && formData.email.length > 0 && "Please fill your valid email id"}</p>
          </div>
          <div className={styles.warning_note}>
            <p>{backError.email}</p>
          </div>
          <div className={styles.warning_note}>
            <p>{_alert.email}</p>
          </div>

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
          <div className={styles.warning_note}>
            <p>{validate.phone === false && formData.country === undefined && "Please select country first then enter your phone no"}</p>
            <p>{_alert.country}</p>
          </div>

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
            international
            value={value}
            countryCallingCodeEditable={false}
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
          {/* <div
            style={{
              display:
                validate.phone === formData.phone
                  ? "none"
                  : validate.phone === false && formData.country === undefined
                  ? "block"
                  : "none",
            }}
            className={styles.warning_note}
          >
            <p>Please select country first then enter your phone no</p>
          </div> */}
          <div
            className={styles.warning_note}
          >
            <p>{validate.phone === false && formData.phone !== undefined && "Please enter your valid phone no"}</p>
          </div>
          <div className={styles.warning_note}>
            <p>{backError.mobile}</p>
          </div>
          <div className={styles.warning_note}>
            <p>{_alert.phone}</p>
          </div>

          <Tooltip title="Password must be min 10 characher , 1 Upper case , 1 lower case and a special character">
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
          </Tooltip>
          <div className={styles.warning_note}>
            <p>{_alert.password}</p>
          </div>
        
          <div
            className={styles.warning_note}
          >
            <p>{validate.password === false && formData.password.length > 0 && "Please fill your valid password"}</p>
          </div>

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
          <div
            className={styles.warning_note}
          >
            <p>{validate.cpassword === false &&
                    formData.cpassword.length > 0 && "Password not match!"}</p>
          </div>
          <div className={styles.warning_note}>
            <p>{_alert.cpassword}</p>
          </div>

          <input
            onChange={(e) => getData("reference", e.target.value)}
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
          <div className={styles.warning_note}>
            <p>{_alert.terms}</p>
          </div>

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
