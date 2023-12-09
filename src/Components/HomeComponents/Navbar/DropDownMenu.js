import React,{useContext, useState} from 'react';
import { BsFillCaretDownFill } from "react-icons/bs";
import Context from '../../../Context/Context';
import { userFuncion } from '../../../Helper/helper';
import styles from "./Navbar.module.scss";

const DropDownMenu = ({valways}) => {
  const { states, changeState } = useContext(Context);
    const [isDrop, setIsDrop] = useState(false);
  return (
    <>
        <div style={{display : valways && 'flex' , marginLeft : valways && 0}} className={styles.menud}>
              <button onClick={()=>setIsDrop(true)} className="flex-center">
                Menu <span className="flex-center"><BsFillCaretDownFill /></span>
              </button>
                {isDrop && <div style={{left : valways && 0 }} className={`${styles.box} flex-center column`}>
                {/* <a onClick={()=>setIsDrop(false)} href="/personal-information">Personal Information</a> */}
                <a onClick={()=>setIsDrop(false)} href="/change-password">Change Password</a>
                <a onClick={()=>setIsDrop(false)} href="/bank-details">Bank Details</a>
                <a onClick={()=>setIsDrop(false)} href="/security">Security</a>
                <button style={{color: "#fff"}} onClick={()=>{setIsDrop(false)
                userFuncion(false)
                changeState(states.dmode, window.innerWidth, states.stokenbtn , states.buyTrade , false)
                window.location.href = '/exchange'
                }} >Logout</button>
                </div>}
              </div>
              {isDrop && <div onClick={()=>setIsDrop(false)} className={styles._boxbg}></div>}
    </>
  )
}

export default DropDownMenu