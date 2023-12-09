import React, { useContext , useState } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import wallet_i from "../../Assets/wallet_login_register.png";
import { BsEyeFill } from "react-icons/bs";
import { AiTwotoneLock } from "react-icons/ai";
import styles from './ResetPassword.module.scss';
import { sendRequest, vcpassword, vpassword } from "../../Helper/helper";
import swal from 'sweetalert';
import Tooltip from "@material-ui/core/Tooltip";

const ResetPassword = () => {
  const { states } = useContext(Context);
  const [sp, setSp] = useState({})
  const [formData, setFormData] = useState({
    password: "",
    cpassword: "",
  });
  const [validate, setValidate] = useState({
    password: "",
    cpassword: "",
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
    if (key === "password") {
      validateHandler(key, vpassword(val));
    } else if (key === "cpassword") {
      validateHandler(key, vcpassword(formData.password, val));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const hash = window.location.pathname.split("/")[2];
    getData("hash", hash)

    console.log(validate , formData)
      if(formData.password && formData.cpassword && hash){
        if(validate.password && validate.cpassword){
          const res = await sendRequest({
            "password" : formData.password,
            "confirm_password" : formData.cpassword,
            "reset_password_hash" : formData.hash,
          } , "reset-password", "post")
    
          const  _swal = await swal(res.message)
          console.log(res)
          try {
            if(res.status === 200 ){
              if(_swal){
                document.querySelector('form').reset()
                window.location.href = "/signin"
              }
            }else{
              if(res.status === 402 && _swal){
                window.location.href = "/forget-password"
              }
            }
          } catch (err) {
            if(err){
              swal(JSON.stringify(res.message))
            }
          }
        }else{
          swal("Please fill valid password ,and your new password and confirm password must be same !")
        }
      }else{
        swal("Please fill all required fields !")
      }
  };

  const spHandler = (_val) => {
    let change = sp;
    change[_val] = sp[_val] ? false : true;
    setSp({...change})
  }


  const dmode = states.dmode;
  return (
    <div className={dmode ? styles.chpass_d : styles.chpass_l}>
        <Navbar />
        <div className={`${styles._chpass} flex-between container`}>
        <form onSubmit={handleSubmit} className="flex-start column">
          <h1>Reset Password</h1>
          <Tooltip title="Password must be min 10 characher , 1 Upper case , 1 lower case and a special character">
          <div className={`${styles.password} flex-between`}>
          <span className="flex-center"><AiTwotoneLock /></span>
            <input onChange={(e) => getData("password", e.target.value)} required type={sp.np ? "text" : "password"} placeholder="New Password" />
            <button type="button" onClick={()=>spHandler("np")} className={`${sp.np ? styles.eyea : styles.eye} flex-center`}>
              <BsEyeFill />
            </button>
          </div>
          </Tooltip>
          <div
            className={styles.warning_note}
          >
            <p>{validate.password === false && formData.password.length > 0 && "Please fill your valid password"}</p>
          </div>

          <div className={`${styles.password} flex-between`}>
            <span className="flex-center"><AiTwotoneLock /></span>
            <input onChange={(e) => getData("cpassword", e.target.value)} required type={sp.cp ? "text" : "password"} placeholder="Confirm Password" />
            <button type="button" onClick={()=>spHandler("cp")} className={`${sp.cp ? styles.eyea : styles.eye} flex-center`}>
              <BsEyeFill />
            </button>
          </div>
          <div
            className={styles.warning_note}
          >
            <p>{validate.cpassword === false && formData.cpassword.length > 0 && "Password not match!"}</p>
          </div>

          <button className={`${styles.chpass_btn} btn`}>Submit</button>
        </form>
        <img src={wallet_i} alt="wallet" />
      </div>

        <Footer />
    </div>
  )
}

export default ResetPassword