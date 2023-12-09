import React, { useState, useEffect } from "react";
import styles from "./Withdraw.module.scss";
import QrReader from 'react-web-qr-reader';
import {
  authRequest,
  authRequestNb,
  refreshToken,
} from "../../../Helper/helper";
import swal from "sweetalert";
import { AiOutlineClose } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";

const Withdraw = ({ dmode, coin, availableBalance }) => {
  const [data, setData] = useState();
  const [chain, setChain] = useState();
  const [formData, setFormData] = useState({ amount: "" });
  const [QrRead, setQrRead] = useState(false);
  const [errormessage, setErrormessage] = useState({});
  const [feeInfo, setFeeInfo] = useState({});
  const [feeBoxV, setFeeBoxV] = useState(false);

  const chainChange = async (e) => {
    setChain(e.target.value);
    formDataHandler("blockchain", e.target.value);
  };

  const formDataHandler = (key, value) => {
    let change = formData;
    change[key] = value;
    errorHandler(key,"")
    if (key === "amount" && value) {
      const _value = parseFloat(value);
      const _avbal = parseFloat(availableBalance);
      const max =
        feeInfo.max_amount === "N/L" ? false : parseFloat(feeInfo.max_amount);
      if (max && max <= _avbal) {
        change[key] = _value > max ? max : _value;
      } else {
        change[key] = _value > _avbal ? _avbal : _value;
      }
      formDataHandler("total", value - feeInfo.fee);
      formDataHandler("fee", feeInfo.fee);
    }
    errorHandler(key, "");
    setFormData({ ...change });
  };

  const errorHandler = (key, value) => {
    let change = errormessage;
    change[key] = value;
    setErrormessage({ ...change });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    if(coin === 'INR'){
      if(formData.amount && formData.otp ){
        const res = await authRequest({
          amount : formData.amount,
          currency : coin,
          otp : formData.otp,
        } , "submit-withdraw");
        refreshToken(res.refresh_token)
        if(res.status === 403){
          errorHandler("otp","Invalid OTP !")
          if(res.refresh_token === false){
            window.location.href ="/signin"
          }
        }else if(res.status === 401){
          errorHandler("amount",res.data.amount)
        }else{
        swal(res.message)
        }
      }else{
        !formData.amount && errorHandler("amount","Please enter Amount !")
        !formData.otp && errorHandler("otp","Please enter OTP !")
      }
    }else{

    //  const validAddress = WAValidator.validate("0x5E33298a693e4CF1E05f179bFebd4d414f6A5340", 'BTC');
    //  console.log(WAValidator)

      if(formData.amount && formData.otp && formData.address && formData.blockchain){
        const res = await authRequest({
          amount : formData.amount,
          address : formData.address,
          blockchain : formData.blockchain,
          currency : coin,
          otp : formData.otp,
        } , "submit-withdraw");
        refreshToken(res.refresh_token)
        if(res.status === 403){
          errorHandler("otp","Invalid OTP !")
          if(res.refresh_token === false){
            window.location.href ="/signin"
          }
        }else{
        swal(res.message)
        }
      }else{
        !formData.amount && errorHandler("amount","Please enter Amount !")
        !formData.address && errorHandler("address","Please enter Address !")
        !formData.otp && errorHandler("otp","Please enter OTP !")
        console.log(formData)
      }
    }
  };

  const sendOtpRequest = async () => {
    const res = await authRequestNb("withdraw-otp");
    refreshToken(res.refresh_token)
    swal(res.message);
  };

  useEffect(() => {
    (async () => {
      const res = await authRequest({ currency: coin }, "get-withdraw-fees");
      setData(res);
      setChain(res.data[0].blockchain_type);
      formDataHandler("blockchain", res.data[0].blockchain_type);
      refreshToken(res.refresh_token);
    })();
    setFeeBoxV(false);
    setFormData({amount: ""})
    setErrormessage({})
    setQrRead(false)
  }, [coin]);

  useEffect(() => {
    data?.data.map((value) => {
      if (value.blockchain_type === chain) {
        setFeeInfo(value);
      }
    });
    setFormData({amount: ""})
    formDataHandler("blockchain", chain);
    setFeeBoxV(false);
    setErrormessage({})
    setQrRead(false)
  }, [chain]);

  return coin === "INR" ? (
    <div className={dmode ? styles.withdraw_d : styles.withdraw_l}>
      <form onSubmit={sumbitHandler}>
        <div className={`${styles.row} flex-between`}>
          <h3>{coin}</h3>
          <input
            type="number"
            name="amount"
            step="any"
            min={0}
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => formDataHandler("amount", e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              formDataHandler(
                "amount",
                feeInfo.max_amount === "N/L" ||
                  parseFloat(feeInfo.max_amount) >= parseFloat(availableBalance)
                  ? parseFloat(availableBalance)
                  : parseFloat(feeInfo.max_amount) <
                      parseFloat(availableBalance) &&
                      parseFloat(feeInfo.max_amount)
              );
            }}
          >
            All
          </button>
          <button type="button" onClick={() => setFeeBoxV(true)}>
            Fees
          </button>
        </div>

        {feeBoxV && (
          <div className={`${styles.wfi} flex-center column`}>
            <h2 className="flex-between">
              <span>Withdraw Fees</span>{" "}
              <span onClick={() => setFeeBoxV(false)} className="flex-center">
                <AiOutlineClose />
              </span>
            </h2>
            <div style={{ width: "100%" }} className="flex-start column">
              <div className={styles.wfi_row}>
                From : <span>{feeInfo.min_amount}</span>
              </div>
              <div className={styles.wfi_row}>
                To : <span>{feeInfo.max_amount}</span>
              </div>
              <div className={styles.wfi_row}>
                Fee : <span>{feeInfo.fee}</span>
              </div>
            </div>
          </div>
        )}

        {errormessage.amount && (
          <p className={styles.warning_note}>{errormessage.amount}</p>
        )}
        <div className={`${styles.row} flex-between`}>
          <h3>Fees</h3>
          <input
            type="number"
            name="fees"
            readOnly={true}
            value={formData.amount && feeInfo.fee}
            min={0}
            placeholder="0.000000"
          />
          <h3>{coin}</h3>
        </div>
        <div className={`${styles.row} flex-between`}>
          <h3>Total</h3>
          <input
            type="number"
            name="total"
            value={formData.amount && formData.amount - feeInfo.fee}
            readOnly={true}
            min={0}
            placeholder="0.000000"
          />
          <h3>{coin}</h3>
        </div>

        <div className={`${styles.row} flex-between`}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => formDataHandler("otp", e.target.value)}
          />
          <button
            type="button"
            onClick={sendOtpRequest}
            style={{ width: "80%" }}
          >
            {"Click here to send OTP"}
          </button>
        </div>
        {errormessage.otp && (
          <p className={styles.warning_note}>{errormessage.otp}</p>
        )}

        <button type="submit">
          Withdraw {coin}
        </button>
      </form>
    </div>
  ) : (
    <div className={dmode ? styles.withdraw_d : styles.withdraw_l}>
      {data && (
        <div className={styles.dbox}>
          <select
            onChange={chainChange}
            value={chain}
            className={styles.chainOpt}
          >
            {data.data?.map((value, i) => (
              <option key={i} value={value.blockchain_type}>
                {value.blockchain_type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={sumbitHandler}>
        <div className={`${styles._address} flex-between`}>
        <input
          onChange={(e) => formDataHandler("address", e.target.value)}
          defaultValue={formData.address && formData.address}
          type="text"
          name="address"
          placeholder={`${coin} Address`}
        />
        <span onClick={() => QrRead ? setQrRead(false) : setQrRead(true)} className="flex-center">{!QrRead ? <BiQrScan /> : <AiOutlineClose />}</span>
        </div>
        {QrRead && <QrReader
        onScan={(result) => {
          if (!!result) {
            formDataHandler("address",result.data)
            setQrRead(false)
          }
        }}
        onError={(error)=>{
          if (!!error) {
            window.alert(error);
            setQrRead(false);
          }
        }}
        className={styles.qrReader}
      />}
        {errormessage.address && (
          <p className={styles.warning_note}>{errormessage.address}</p>
        )}
        <div className={`${styles.row} flex-between`}>
          <h3>{coin}</h3>
          <input
            type="number"
            name="amount"
            step="any"
            min={0}
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => formDataHandler("amount", e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              formDataHandler(
                "amount",
                feeInfo.max_amount === "N/L" ||
                  parseFloat(feeInfo.max_amount) >= parseFloat(availableBalance)
                  ? parseFloat(availableBalance)
                  : parseFloat(feeInfo.max_amount) <
                      parseFloat(availableBalance) &&
                      parseFloat(feeInfo.max_amount)
              );
            }}
          >
            All
          </button>
          <button type="button" onClick={() => setFeeBoxV(true)}>
            Fees
          </button>
        </div>

        {feeBoxV && (
          <div className={`${styles.wfi} flex-center column`}>
            <h2 className="flex-between">
              <span>Withdraw Fees</span>{" "}
              <span onClick={() => setFeeBoxV(false)} className="flex-center">
                <AiOutlineClose />
              </span>
            </h2>
            <div style={{ width: "100%" }} className="flex-start column">
              <div className={styles.wfi_row}>
                From : <span>{feeInfo.min_amount}</span>
              </div>
              <div className={styles.wfi_row}>
                To : <span>{feeInfo.max_amount}</span>
              </div>
              <div className={styles.wfi_row}>
                Fee : <span>{feeInfo.fee}</span>
              </div>
            </div>
          </div>
        )}

        {errormessage.amount && (
          <p className={styles.warning_note}>{errormessage.amount}</p>
        )}
        <div className={`${styles.row} flex-between`}>
          <h3>Fees</h3>
          <input
            type="number"
            name="fees"
            readOnly={true}
            value={formData.amount && feeInfo.fee}
            min={0}
            placeholder="0.000000"
          />
          <h3>{coin}</h3>
        </div>
        <div className={`${styles.row} flex-between`}>
          <h3>Total</h3>
          <input
            type="number"
            name="total"
            value={formData.amount && formData.amount - feeInfo.fee}
            readOnly={true}
            min={0}
            placeholder="0.000000"
          />
          <h3>{coin}</h3>
        </div>

        <div className={`${[styles.row , styles.otp].join(" ")} flex-between`}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => formDataHandler("otp", e.target.value)}
          />
          <button
            type="button"
            onClick={sendOtpRequest}
            style={{ width: "80%" }}
          >
            {"Click here to send OTP"}
          </button>
        </div>
        {errormessage.otp && (
          <p className={styles.warning_note}>{errormessage.otp}</p>
        )}
        <button disabled={feeInfo.activeStatus==="0" ? true : false} style={{opacity : feeInfo.activeStatus==="0" ? 0.7 : 1}} type="submit">{feeInfo.activeStatus==="1" ? `Withdraw ${coin}` : "Out of Service !"}</button>
      </form>
    </div>
  );
};

export default Withdraw;
