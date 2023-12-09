import React, { useContext, useState } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import wallet_i from "../../Assets/wallet_login_register.png";
import { AiOutlineMail } from "react-icons/ai";
import styles from "./ForgetPassword.module.scss";
import validator from "validator";
import { sendRequest } from "../../Helper/helper";
import swal from 'sweetalert';

const ForgetPassword = () => {
  const { states } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [validate, setValidate] = useState({
    email: "",
  });

  const validateHandler = (key, val) => {
    let change = validate;
    change[key] = val;
    setValidate({ ...change });
  };

  const getData = (key, val) => {
    let change = formData;
    change[key] = val;
    setFormData({ ...change });
    if (key === "email") {
      validateHandler(key, validator.isEmail(val));
      console.log(validate);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      if(validate.email){
        const res = await sendRequest({
          "email" : formData.email,
        } , "forgot-password", "post")
  
        try {
          if(res.status === 200 ){
              const  _swal = await swal(res.message)
            if(_swal){
              document.querySelector('form').reset()
              window.location.href = "/signin"
            }
          }else{
            console.log(res)
            swal(res.message)
          }
        } catch (err) {
          if(err){
            swal(JSON.stringify(res.message))
          }
        }
      }else{
        swal("Please fill your email !")
      }
  };


  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.forpass_d : styles.forpass_l}>
      <Navbar />
      <div className={`${styles._forpass} flex-between container`}>
        <form onSubmit={handleSubmit} className="flex-start column">
          <h1>Forget Password</h1>
          <div className={`${styles.password} flex-between`}>
            <span className="flex-center">
              <AiOutlineMail />
            </span>
            <input
              onChange={(e) => getData("email", e.target.value)}
              required
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div
            style={{
              display:
                validate.email === formData.email
                  ? "none"
                  : validate.email === false && formData.email.length > 0
                  ? "block"
                  : "none",
            }}
            className={styles.warning_note}
          >
            <p>Please fill your valid email id</p>
          </div>

          <button type="submit" className={`${styles.forpass_btn} btn`}>Submit</button>
        </form>
        <img src={wallet_i} alt="wallet" />
      </div>

      <Footer />
    </div>
  );
};

export default ForgetPassword;
