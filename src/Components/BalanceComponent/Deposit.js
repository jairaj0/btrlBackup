import React, { useState, useEffect } from "react";
import styles from "./Deposit.module.scss";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  authRequest,
  refreshToken,
  sendFileRequest,
} from "../../Helper/helper";
import { FileUploader } from "react-drag-drop-files";
import swal from "sweetalert";
import QRCode from "react-qr-code";

const fileTypes = ["JPEG", "JPG", "PNG", "PDF"];

const Deposit = ({ dmode, coin }) => {
  const [optinstant, setOptinstant] = useState(false);
  const [infos, setInfos] = useState({});
  const [errormessage, setErrormessage] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({});
  const [data, setData] = useState();
  const [_subtext, set_subtext] = useState("Submit");
  const [chain, setChain] = useState("");
  const [ddataafterchain, setDdataafterchain] = useState(undefined);

  const setInfosHandler = (key) => {
    let change = infos;
    change[key] = true;
    setInfos({ ...change });
    setTimeout(() => {
      setInfos({});
    }, 2000);
  };

  const formDataHandler = (key, value) => {
    let change = formData;
    change[key] = value;
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
    if (
      formData.amount &&
      formData.refferenceid &&
      formData.crefferenceid &&
      formData.remark &&
      formData.file &&
      formData.refferenceid === formData.crefferenceid
    ) {
      set_subtext("Submitting . . .");
      setErrormessage({});
      const res = await sendFileRequest(
        {
          file: formData.file[0],
          amount: formData.amount,
          remark: formData.remark,
          crefferenceid: formData.crefferenceid,
          refferenceid: formData.refferenceid,
        },
        "manual-inr-deposit"
      );
      refreshToken(res.refresh_token);
      const _swal = await swal(res.message);
      if (_swal) {
        set_subtext("Submit");
        setFormData({});
        document.querySelector("form").reset();
      }
    } else {
      if (!formData.amount) {
        errorHandler("amount", "Please enter amount");
      }
      if (!formData.refferenceid) {
        errorHandler(
          "refferenceid",
          "Please enter UTR no./UPI Transaction ID/Reff. ID"
        );
      }
      if (!formData.crefferenceid) {
        errorHandler(
          "crefferenceid",
          "Please confirm UTR no./UPI Transaction ID/Reff. ID"
        );
      }
      if (
        formData.refferenceid !== formData.crefferenceid &&
        formData.crefferenceid
      ) {
        errorHandler(
          "crefferenceid",
          "UTR no./UPI Transaction ID/Reff. ID is not match !"
        );
      }
      if (!formData.remark) {
        errorHandler("remark", "Please enter Remark");
      }
      if (!formData.file) {
        errorHandler("file", "Please drop a file");
      }
    }
  };

  const chainChange = async (e) => {
    setChain(e.target.value);
    const res = await authRequest(
      { currency: coin, blockchain: e.target.value },
      "wallet-address"
    );
    refreshToken(res.refresh_token);
    res.address && res.status === 200
      ? setDdataafterchain(res)
      : setDdataafterchain(undefined);
  };

  useEffect(() => {
    (async () => {
      const res = await authRequest({ currency: coin }, "wallet-address");
      if (res.status === 200) {
        setData(res);
        setDdataafterchain(undefined);
        refreshToken(res.refresh_token);
        res?.multiblockchain && setChain(res.default);
        const res1 = await authRequest(
          { currency: coin, blockchain: res.default },
          "wallet-address"
        );
        res?.multiblockchain && res1.address && res1.status === 200
      ? setDdataafterchain(res1)
      : setDdataafterchain(undefined);

        setErrorMessage(undefined);
      } else {
        setErrorMessage(res.message);
      }
      setErrormessage({});
    })();
  }, [coin]);

  return coin === "INR" && data?.data.currency === "INR" ? (
    <div className={dmode ? styles.deposit_d : styles.deposit_l}>
      <div className={styles.details}>
        <h2>BTRL Exchange Bank Details</h2>
        <div className={styles.info}>
          <h5>Name</h5>
          <p className="flex-between">
            {data && data.data.name}
            <button className="flex-center">
              <CopyToClipboard
                text={data && data.data.name}
                onCopy={() => setInfosHandler("name")}
              >
                <BiCopy />
              </CopyToClipboard>
              {infos.name && <span>Copied!</span>}
            </button>
          </p>
        </div>
        <div className={styles.info}>
          <h5>Account Number</h5>
          <p className="flex-between">
            {data && data.data.accountNumber}
            <button className="flex-center">
              <CopyToClipboard
                text={data && data.data.accountNumber}
                onCopy={() => setInfosHandler("accountName")}
              >
                <BiCopy />
              </CopyToClipboard>
              {infos.accountName && <span>Copied!</span>}
            </button>
          </p>
        </div>
        <div className={styles.info}>
          <h5>Bank Name</h5>
          <p className="flex-between">
            {data && data.data.bankName}
            <button className="flex-center">
              <CopyToClipboard
                text={data && data.data.bankName}
                onCopy={() => setInfosHandler("bankName")}
              >
                <BiCopy />
              </CopyToClipboard>
              {infos.bankName && <span>Copied!</span>}
            </button>
          </p>
        </div>
        <div className={styles.info}>
          <h5>IFSC Code</h5>
          <p className="flex-between">
            {data && data.data.ifscCode}
            <button className="flex-center">
              <CopyToClipboard
                text={data && data.data.ifscCode}
                onCopy={() => setInfosHandler("ifsc")}
              >
                <BiCopy />
              </CopyToClipboard>
              {infos.ifsc && <span>Copied!</span>}
            </button>
          </p>
        </div>
        <div className={styles.info}>
          <h5>UPI</h5>
          <p className="flex-between">
            {data && data.data.upi}
            <button className="flex-center">
              <CopyToClipboard
                text={data && data.data.upi}
                onCopy={() => setInfosHandler("upi")}
              >
                <BiCopy />
              </CopyToClipboard>
              {infos.upi && <span>Copied!</span>}
            </button>
          </p>
        </div>
        <div className={styles.info}>
          <h5>Remark</h5>
          <p className="flex-between">
            {data && data.data.remarks}
            <button className="flex-center">
              <CopyToClipboard
                text={data && data.data.remarks}
                onCopy={() => setInfosHandler("remark")}
              >
                <BiCopy />
              </CopyToClipboard>
              {infos.remark && <span>Copied!</span>}
            </button>
          </p>
        </div>

        <h3>Important Note</h3>
        <ul>
          {data?.importantNote.map((value, i) => (
            <li key={i}>{value}</li>
          ))}
        </ul>
      </div>
      <div className={styles.form}>
        <h2>Must fill Deposit Form After Deposit INR</h2>

        <div className={styles.options}>
          <button
            onClick={() => setOptinstant(false)}
            className={!optinstant ? styles.active : ""}
          >
            MANNUAL (IMPS/NEFT/RTGS/UPI)
          </button>
          <button
            disabled
            onClick={() => setOptinstant(true)}
            className={optinstant ? styles.active : ""}
          >
            INSTANT
          </button>
        </div>

        <div className={`${styles.qrbox} flex-center column`}>
          <img
            src={data && data.data.qrcode}
            alt="qrcode"
            className={styles.qr}
          ></img>
          <span>Scan QR To Deposit</span>
        </div>

        <form onSubmit={sumbitHandler}>
          <input
            onChange={(e) => formDataHandler("amount", e.target.value)}
            type="number"
            min={0}
            name="Amount"
            placeholder="Amount"
          />
          {errormessage.amount && (
            <p className={styles.warning_note}>{errormessage.amount}</p>
          )}
          <input
            type="text"
            name="UTR No./UPI Transaction ID/Reff. ID"
            placeholder="UTR No./UPI Transaction ID/Reff. ID"
            onChange={(e) => formDataHandler("refferenceid", e.target.value)}
          />
          {errormessage.refferenceid && (
            <p className={styles.warning_note}>{errormessage.refferenceid}</p>
          )}
          <input
            type="text"
            name="Confirm UTR No./UPI Transaction ID/Reff. ID"
            placeholder="Confirm UTR No./UPI Transaction ID/Reff. ID"
            onChange={(e) => formDataHandler("crefferenceid", e.target.value)}
          />
          {errormessage.crefferenceid && (
            <p className={styles.warning_note}>{errormessage.crefferenceid}</p>
          )}
          <input
            type="text"
            onChange={(e) => formDataHandler("remark", e.target.value)}
            name="Remark"
            placeholder="Remark"
          />
          {errormessage.remark && (
            <p className={styles.warning_note}>{errormessage.remark}</p>
          )}

          <div className={`${styles.dragdrop} flex-center`}>
            <div className="dandd">
              <FileUploader
                multiple={true}
                handleChange={(file) => formDataHandler("file", file)}
                name="file"
                types={fileTypes}
              />
                {formData.file
                  ? <p>`File name: ${formData.file[0].name}`</p>
                  : <p>Select or Drag & Drop a file<br/><span>(Only JPG/PNG/PDF)</span></p>}
            </div>
          </div>
          {errormessage.file && (
            <p className={styles.warning_note}>{errormessage.file}</p>
          )}

          <button
            style={{
              opacity: _subtext !== "Submit" ? 0.5 : 1,
              color: _subtext !== "Submit" ? "#000" : "#fff",
            }}
            disabled={_subtext !== "Submit" ? true : false}
            type="submit"
          >
            {_subtext}
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className={dmode ? styles.depositall_d : styles.depositall_l}>
      {data?.multiblockchain && (
        <h1 className="flex-center">SELECT BLOCKCHAIN</h1>
      )}
      {data?.multiblockchain && (
        <div className={styles.dbox}>
          <select
            onChange={chainChange}
            value={chain}
            className={styles.chainOpt}
          >
            {data.data?.map((value, i) => (
              <option key={i} value={value.blockchain}>
                {value.blockchain.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {ddataafterchain && (
        <div className={`${styles.dirqr} flex-between`}>
          <div className={`${styles.qrcode} flex-center column`}>
            <span>QR CODE</span>
            {ddataafterchain.address && (
              <QRCode value={ddataafterchain.address} />
            )}
          </div>
          <div className="flex-center column">
            <h2>{coin} Deposit Address :</h2>
            <div className={`${styles.address} flex-between`}>
              <span>{ddataafterchain?.address}</span>
              <button className="flex-center">
                <CopyToClipboard
                  text={ddataafterchain?.address}
                  onCopy={() => setInfosHandler("address")}
                >
                  <BiCopy />
                </CopyToClipboard>
                {infos.address && <span>Copied!</span>}
              </button>
            </div>
            <div className={`${styles.impn} flex-center column`}>
              <h3>Important Note</h3>
              <p>{ddataafterchain?.importantNote}</p>
            </div>
          </div>
        </div>
      )}
      {errorMessage && <h3>{errorMessage}</h3>}
      {data && !data?.multiblockchain && (
        <div className={`${styles.dirqr} flex-between`}>
          <div className={`${styles.qrcode} flex-center column`}>
            <span>QR CODE</span>
            {data.address && <QRCode value={data.address} />}
          </div>
          <div className="flex-center column">
            <h2>{coin} Deposit Address :</h2>
            <div className={`${styles.address} flex-between`}>
              <span>{data?.address}</span>
              <button className="flex-center">
                <CopyToClipboard
                  text={data?.address}
                  onCopy={() => setInfosHandler("address")}
                >
                  <BiCopy />
                </CopyToClipboard>
                {infos.address && <span>Copied!</span>}
              </button>
            </div>
            <div className={`${styles.impn} flex-center column`}>
              <h3>Important Note</h3>
              <p>{data?.importantNote}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
