import React, { useContext, useState, useEffect } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import styles from "./ContactUs.module.scss";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { SlEarphonesAlt } from "react-icons/sl";
import {
  allLetter,
  authRequest,
  contactPhoneCheck,
  mandsCheck,
  refreshToken,
  sendRequest,
} from "../../Helper/helper";
import validator from "validator";
import swal from "sweetalert";
import { FormatColorFill } from "@material-ui/icons";

const ContactUs = () => {
  const { states } = useContext(Context);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [allClear, setAllClear] = useState(false);

  const formDataSet = (key, val) => {
    let change = formData;
    change[key] = val;
    setFormData({ ...change });
  };
  const errorMessageSet = (key, val) => {
    let change = errorMessage;
    change[key] = val;
    setErrorMessage({ ...change });
  };

  const formFillCheck = () => {
    (formData.name === "" || formData.name === undefined) &&
        errorMessageSet("name", "Please enter your name");
      (formData.email === "" || formData.email === undefined) &&
        errorMessageSet("email", "Please enter your email id");
      (formData.phone === "" || formData.phone === undefined) &&
        errorMessageSet("phone", "Please enter your phone no");
      (formData.message === "" || formData.message === undefined) &&
        errorMessageSet("message", "Please enter your message");
      (formData.subject === "" || formData.subject === undefined) &&
        errorMessageSet("subject", "Please enter your subject");
  }

  const dmode = states.dmode;

  const handleSubmit = async (e) => {
    e.preventDefault();
    formFillCheck()
    if (allClear === false) {
      formFillCheck()
    } else {
      if (
        errorMessage.name.length > 0 ||
        errorMessage.email.length > 0 ||
        errorMessage.phone.length > 0 ||
        errorMessage.message.length > 0 ||
        errorMessage.subject.length > 0
      ) {
        setAllClear(false);
      } else {
          if (JSON.parse(localStorage.getItem("isLogin"))) {
            const res = await authRequest(
              {
                name: formData.name,
                email: formData.email,
                mobile: formData.phone,
                subject: formData.subject,
                query: formData.message,
              },
              "contact-us"
            );
            refreshToken(res.refresh_token);
            const _swal = await swal(res.message);
            _swal && document.querySelector("form").reset();
          } else {
            const res = await sendRequest(
              {
                name: formData.name,
                email: formData.email,
                mobile: formData.phone,
                subject: formData.subject,
                query: formData.message,
              },
              "contact-us",
              "post"
            );
            const _swal = await swal(res.message);
            _swal && document.querySelector("form").reset();
          }
      }
    }
  };

  
  // const handleSubmit1 = async (e) => {
  //   e.preventDefault();
  //   formFillCheck()
  //   if (allClear === false) {
  //     formFillCheck()
  //   } else {
  //     if (
  //       errorMessage.name.length > 0 ||
  //       errorMessage.email.length > 0 ||
  //       errorMessage.phone.length > 0 ||
  //       errorMessage.message.length > 0 ||
  //       errorMessage.subject.length > 0
  //     ) {
  //       setAllClear(false);
  //     } else {
  //       if (
  //         formData.name.length > 0 ||
  //         formData.email.length > 0 ||
  //         formData.phone.length > 0 ||
  //         formData.message.length > 0 ||
  //         formData.subject.length > 0
  //       ) {
  //         formFillCheck()
  //         setAllClear(false);
  //       } else {
  //         if (JSON.parse(localStorage.getItem("isLogin"))) {
  //           const res = await authRequest(
  //             {
  //               name: formData.name,
  //               email: formData.email,
  //               mobile: formData.phone,
  //               subject: formData.subject,
  //               query: formData.message,
  //             },
  //             "contact-us"
  //           );
  //           console.log(formData);
  //           refreshToken(res.refresh_token);
  //           swal(res.message);
  //         } else {
  //           const res = await sendRequest(
  //             {
  //               name: formData.name,
  //               email: formData.email,
  //               mobile: formData.phone,
  //               subject: formData.subject,
  //               query: formData.message,
  //             },
  //             "contact-us",
  //             "post"
  //           );
  //           swal(res.message);
  //         }
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    if (formData.name) {
      allLetter(formData.name) === false &&
        errorMessageSet("name", "Only use alphabet");
      if (allLetter(formData.name)) {
        setAllClear(true);
        errorMessageSet("name", "");
      }
    } else {
      setAllClear(false);
    }
    if (formData.email) {
      validator.isEmail(formData.email) === false &&
        errorMessageSet("email", "Please enter your valid email id");
      if (validator.isEmail(formData.email)) {
        errorMessageSet("email", "");
        setAllClear(true);
      }
    } else {
      setAllClear(false);
    }
    if (formData.phone) {
      formData.phone.length === 0 && setAllClear(false);
      contactPhoneCheck(formData.phone) === false &&
        errorMessageSet("phone", "Please enter your valid phone no");
      if (contactPhoneCheck(formData.phone)) {
        errorMessageSet("phone", "");
        setAllClear(true);
      }
    } else {
      setAllClear(false);
    }
    if (formData.subject) {
      mandsCheck(formData.subject) === false &&
        errorMessageSet("subject", "Please enter your valid subject");
      if (mandsCheck(formData.subject)) {
        errorMessageSet("subject", "");
        setAllClear(true);
      }
    } else {
      setAllClear(false);
    }
    if (formData.message) {
      mandsCheck(formData.message) === false &&
        errorMessageSet("message", "Please enter your valid message");
      if (mandsCheck(formData.message)) {
        errorMessageSet("message", "");
        setAllClear(true);
      }
    } else {
      setAllClear(false);
    }
  }, [formData]);

  return (
    <div className={dmode ? styles.contact_d : styles.contact_l}>
      <Navbar />
      <div className={styles.con_wrapper}>
        <div className={`${styles.content} flex-start container`}>
          <div className={`${styles.texts} flex-start column`}>
            <h1>For any type of others queries submit query form</h1>
            <p>
              Note - WhatsApp facility is only for deposit & withdrawal queries.
              Timing According to IST :-
            </p>
            <h3>Mon to Fri - 10:00 a.m. to 06:00 p.m.</h3>
            <h3>Sat, Sun & National Holiday - 11:00 a.m. to 01:00 p.m.</h3>
          </div>

          <form onSubmit={handleSubmit} className="flex-start column">
            <h1>Send us a message</h1>
            <p>Drop us a quick line and we'll get back to you asap</p>
            <input
              onChange={(e) => formDataSet("name", e.target.value)}
              type="text"
              placeholder="Name"
            />
            {errorMessage.name && (
              <p className={styles.warning_note}>{errorMessage.name}</p>
            )}
            <input
              onChange={(e) => formDataSet("email", e.target.value)}
              type="text"
              placeholder="Email Address"
            />
            {errorMessage.email && (
              <p className={styles.warning_note}>{errorMessage.email}</p>
            )}
            <input
              onChange={(e) => formDataSet("phone", e.target.value)}
              type="number"
              placeholder="Mobile"
            />
            {errorMessage.phone && (
              <p className={styles.warning_note}>{errorMessage.phone}</p>
            )}
            <input
              onChange={(e) => formDataSet("subject", e.target.value)}
              type="text"
              placeholder="Subject"
            />
            {errorMessage.subject && (
              <p className={styles.warning_note}>{errorMessage.subject}</p>
            )}
            <textarea
              name="message"
              placeholder="Message"
              cols="30"
              rows="10"
              onChange={(e) => formDataSet("message", e.target.value)}
            ></textarea>
            {errorMessage.message && (
              <p className={styles.warning_note}>{errorMessage.message}</p>
            )}

            <button type="submit" className={`${styles.register_btn} btn`}>
              Submit Query
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <div className={`${styles.contact_info}`}>
          <h1>Contact Information:</h1>
          <div className={styles.boxes}>
            <div className={`${styles.box} flex-center column`}>
              <div className={`${styles.icon} flex-center`}>
                <IoLocationOutline />
              </div>
              <p>
                SHIV COLONY, PINTO PARK OPPOSITE GUPTA FACTORY, BEHIND ROAD,
                GWALIOR, MADHYA PRADESH, Gwalior, Madhya Pradesh, 474005
              </p>
            </div>
            <div className={`${styles.box} flex-center column`}>
              <div className={`${styles.icon} flex-center`}>
                <SlEarphonesAlt />
              </div>
              <p>+91 97148 26176</p>
            </div>
            <div className={`${styles.box} flex-center column`}>
              <div className={`${styles.icon} flex-center`}>
                <IoMdMail />
              </div>
              <p>support@btrlexchange.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
