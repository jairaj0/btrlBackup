import React, { useContext , useState , useEffect } from "react";
import Context from "../../../Context/Context";
import styles from './PaginationBox.module.scss';
import {AiOutlineRight , AiOutlineLeft} from 'react-icons/ai';



// const Pages = JSON.parse(localStorage.getItem("Pages")) ? JSON.parse(localStorage.getItem("Pages")) : null;
// Pages === null  && localStorage.setItem("Pages" , JSON.stringify({deposit_history: 1, trade_history: 1, withdraw_history: 1, open_order_history: 1}))


const PaginationBox = ({loc , _totalPage , allPagesData , setAllPagesData}) => {
    const { states } = useContext(Context); 

  const dmode = states.dmode;
  const totalPage = Math.ceil(_totalPage/10);

  const pageHandler = (key, value) => {
    let change = allPagesData;
    change[key] = value;
    setAllPagesData({ ...change });
  }

  useEffect(() => {
    localStorage.setItem("Pages", JSON.stringify(allPagesData))
  }, [allPagesData])

  return (
    <div className={dmode ? styles.page_d : styles.page_l}>
    <button  onClick={()=>pageHandler(loc , 1)} className={allPagesData[loc] === 1 ? "" : styles.active}>First</button>
    <button onClick={()=>allPagesData[loc] !== 1 ? pageHandler(loc,allPagesData[loc]-1) : pageHandler(loc,1)} className={`${allPagesData[loc] === 1 ? "" : styles.active} flex-center`}><AiOutlineLeft /></button>
    <button>Page {allPagesData[loc]} of {totalPage}</button>
    <button onClick={()=>allPagesData[loc] < totalPage ? pageHandler(loc,allPagesData[loc]+1) : pageHandler(loc,totalPage)} className={`${allPagesData[loc] === totalPage ? "" : styles.active} flex-center`}><AiOutlineRight /></button>
    <button onClick={()=>pageHandler(loc , totalPage)} className={allPagesData[loc] === totalPage ? "" : styles.active}>Last</button>
    </div>
  )
}

export default PaginationBox