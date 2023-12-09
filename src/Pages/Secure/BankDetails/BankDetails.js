import React, { useContext, useState, useEffect } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import wallet_i from "../../../Assets/wallet_login_register.png";
import styles from "./BankDetails.module.scss";
import DragandDrop from "../../../Components/DragandDrop/DragandDrop";
import {
  authRequest,
  authRequestNb,
  refreshToken,
  allLetter,
  vpancard,
  vadhar,
  alphanumeric,
} from "../../../Helper/helper";
import swal from "sweetalert";

const BankDetails = () => {
  const [checkS, setCheckS] = useState();
  const [formData, setFormData] = useState({
    accountNo: "",
    adharCardBack: "",
    adharCardFront: "",
    adharCardNo: "",
    bankName: "",
    caccountNo: "",
    passportNo: "",
    country: "",
    ifsc: "",
    name: "",
    panCardImage: "",
    panCardNo: "",
    passbook: "",
    passport: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const { states } = useContext(Context);

  const dmode = states.dmode;

  const formDataHandler = (key, value) => {
    let change = formData;
    change[key] = value;
    setFormData({ ...change });

    if (!!value) {
      errorHandler(key, "");
      if (key === "name") {
        !allLetter(value) && errorHandler(key, "Please enter valid name");
        allLetter(value) && errorHandler(key, "");
      }

      if(key === "caccountNo"){
        formData.accountNo !== value && errorHandler(key, "Account no is not match");
        formData.accountNo === value && errorHandler(key, "");
      }
      if (key === "panCardNo") {
        !vpancard(value) && errorHandler(key, "Please enter valid pancard no");
        vpancard(value) && errorHandler(key, "");
      }

      if (key === "adharCardNo") {
        !vadhar(value) && errorHandler(key, "Please enter valid Adhar no");
        vadhar(value) && errorHandler(key, "");
      }

      if(key === "ifsc"){
        !alphanumeric(value) && errorHandler(key, "Please enter valid IFSC code");
        alphanumeric(value) && errorHandler(key , "")
      }
      if(key === "passportNo"){
        !alphanumeric(value) && errorHandler(key, "Please enter valid passport no");
        alphanumeric(value) && errorHandler(key , "")
      }
    } else {
      errorHandler(key, "");
    }

    // console.log(
    //   errorMessage.name,
    //   errorMessage.adharCardNo,
    //   errorMessage.panCardNo
    // );
  };

  const errorHandler = (key, value) => {
    let change = errorMessage;
    change[key] = value;
    setErrorMessage({ ...change });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.country === "India") {
      if (
        formData.name && !errorMessage.name &&
        formData.bankName && !errorMessage.bankName &&
        formData.accountNo && !errorMessage.accountNo &&
        formData.caccountNo && !errorMessage.caccountNo &&
        formData.accountNo === formData.caccountNo &&
        formData.ifsc && !errorMessage.ifsc &&
        formData.panCardNo && !errorMessage.panCardNo &&
        formData.adharCardNo && !errorMessage.adharCardNo &&
        formData.panCardImage && !errorMessage.panCardImage &&
        formData.passbook && !errorMessage.passbook &&
        formData.adharCardFront && !errorMessage.adharCardFront &&
        formData.adharCardBack && !errorMessage.adharCardBack 
      ) {
        const res = await authRequest({
          account_holder_name : formData.name,
          bank_name : formData.bankName,
          ifsc : formData.ifsc,
          account_no : formData.accountNo,
          con_account_no : formData.caccountNo,
          pancard_no : formData.panCardNo,
          adhar_no : formData.adharCardNo
        } , "submit-bank-details");
        swal(res.message)
        if(res.status === 200){
          await autoData()
        }else{
          swal(res.message)
        }

        refreshToken(res.refresh_token)

        // console.log(formData);
      } else {
        if (!formData.name) {
          errorHandler("name", "Please enter Account Holder Name");
        }
        if (!formData.bankName) {
          errorHandler("bankName", "Please enter Bank Name");
        }
        if (!formData.accountNo) {
          errorHandler("accountNo", "Please enter Account no");
        }
        if (!formData.caccountNo) {
          errorHandler("caccountNo", "Please confirm Account no");
        }
        if (!formData.ifsc) {
          errorHandler("ifsc", "Please enter IFSC code");
        }
        if (!formData.panCardNo) {
          errorHandler("panCardNo", "Please enter Pancard no");
        }
        if (!formData.adharCardNo) {
          errorHandler("adharCardNo", "Please enter Adhaar no");
        }
        if (!formData.passbook) {
          errorHandler("passbook", "Please upload passbook");
        }
        if (!formData.panCardImage) {
          errorHandler("panCardImage", "Please upload Pancard");
        }
        if (!formData.adharCardFront) {
          errorHandler("adharCardFront", "Please upload Adhaar card front");
        }
        if (!formData.adharCardBack) {
          errorHandler("adharCardBack", "Please upload Adhaar card back");
        }
        console.log("somthing went wrong", formData, errorMessage);
      }
    } else {
      if (
        formData.name && !errorMessage.name &&
        formData.bankName && !errorMessage.bankName &&
        formData.accountNo && !errorMessage.accountNo &&
        formData.caccountNo && !errorMessage.caccountNo &&
        formData.accountNo === formData.caccountNo &&
        formData.ifsc && !errorMessage.ifsc &&
        formData.passbook && !errorMessage.passbook &&
        formData.passport && !errorMessage.passport &&
        formData.passportNo && !errorMessage.passportNo 
      ) {
        const res = await authRequest({
          account_holder_name : formData.name,
          bank_name : formData.bankName,
          ifsc : formData.ifsc,
          account_no : formData.accountNo,
          con_account_no : formData.caccountNo,
          passport_no : formData.passportNo,
        } , "submit-bank-details");
        swal(res.message)
        if(res.status === 200){
          await autoData()
        }else{
          swal(res.message)
        }
        refreshToken(res.refresh_token)

        // console.log(formData);
      } else {
        if (!formData.name) {
          errorHandler("name", "Please enter Account Holder Name");
        }
        if (!formData.bankName) {
          errorHandler("bankName", "Please enter Bank Name");
        }
        if (!formData.accountNo) {
          errorHandler("accountNo", "Please enter Account no");
        }
        if (!formData.caccountNo) {
          errorHandler("caccountNo", "Please confirm Account no");
        }
        if (!formData.ifsc) {
          errorHandler("ifsc", "Please enter IFSC code");
        }
        if (!formData.passportNo) {
          errorHandler("passportNo", "Please enter Passport no");
        }
        if (!formData.passbook) {
          errorHandler("passbook", "Please upload passbook");
        }
        if (!formData.passport) {
          errorHandler("passport", "Please upload Passport");
        }

        console.log("somthing went wrong", formData);
      }
    }
  };

  const autoData = async () => {
    const res = await authRequestNb("get-bank-details");
    refreshToken(res.refresh_token);
    const data = res.data;
    setCheckS(data.bank_status);
    formDataHandler("passbook", data.PCImage !== null ? data.PCImage : "");
    formDataHandler("panCardImage", data.pancard !== null ? data.pancard : "");
    formDataHandler("passport", data.passport !== null ? data.passport : "");
    formDataHandler(
      "adharCardBack",
      data.adhaarcardback !== null ? data.adhaarcardback : ""
    );
    formDataHandler(
      "adharCardFront",
      data.adhaarcardfront !== null ? data.adhaarcardfront : ""
    );
    formDataHandler(
      "status",
      data.bank_status !== null ? data.bank_status : ""
    );
    formDataHandler("country", data.country !== null ? data.country : "");
    formDataHandler(
      "name",
      data.account_holder_name !== null
        ? data.account_holder_name.toUpperCase()
        : ""
    );
    formDataHandler(
      "bankName",
      data.bank_name !== null ? data.bank_name.toUpperCase() : ""
    );
    formDataHandler(
      "accountNo",
      data.account_no !== null ? data.account_no : ""
    );
    formDataHandler(
      "caccountNo",
      data.account_no !== null ? data.account_no : ""
    );
    formDataHandler("ifsc", data.ifsc !== null ? data.ifsc.toUpperCase() : "");
    formDataHandler(
      "panCardNo",
      data.pancard_no !== null ? data.pancard_no.toUpperCase() : ""
    );
    formDataHandler(
      "passportNo",
      data.passport_no !== null ? data.passport_no.toUpperCase() : ""
    );
    formDataHandler("adharCardNo", data.adhar_no !== null ? data.adhar_no : "");
  };

  useEffect(() => {
    (async () => await autoData())();
  }, []);


  return (
    <div className={dmode ? styles.bankdetials_d : styles.bankdetials_l}>
      <Navbar />
      <div className={`${styles._bankdetials} container`}>
        <form onSubmit={submitHandler} className="flex-start column">
          <h1>Bank Details</h1>
          <h4>Your Bank Details Verification Status</h4>

          <h6 className={styles.warn}>
            Warning: Read Carefully Before Submit Your Name, Account Number &
            IFSC. Wrong Submission Of Bank Detail May lead To Your Withdrawl
            Fund Forever Loose.
          </h6>
          <h6>
            Important Note: Maximum timing is for Bank details verification is
            one working day. (Means except Saturday, Sunday & Holiday) Images
            must be jpg, png,jpeg and size must ne less than IMB.
          </h6>

          <div className={`${styles.cheks} flex-start`}>
            <label className="flex">
              <input
                type="radio"
                name="pending"
                readOnly={true}
                checked={checkS === "Pending" ? true : false}
                value="Pending"
              />
              Pending
            </label>
            <label className="flex">
              <input
                type="radio"
                name="submited"
                readOnly={true}
                checked={checkS === "Submitted" ? true : false}
                value="Submitted"
              />
              Submitted
            </label>
            <label className="flex">
              <input
                type="radio"
                name="approved"
                readOnly={true}
                checked={checkS === "Approved" ? true : false}
                value="Approved"
              />
              Approved
            </label>
            <label className="flex">
              <input
                type="radio"
                name="rejected"
                readOnly={true}
                checked={checkS === "Rejected" ? true : false}
                value="Rejected"
              />
              Rejected
            </label>
          </div>

          <div className={`${styles.twoinput} flex-between`}>
            <div className={styles.inbox}>
              <input
                readOnly={
                  formData &&
                  (formData.status === "Pending" ||
                    formData.status === "Rejected")
                    ? false
                    : true
                }
                value={formData.name}
                onChange={(e) =>
                  formDataHandler("name", e.target.value.toUpperCase())
                }
                type="text"
                placeholder="Account Holder Name"
              />
              {errorMessage.name && (
                <p className={styles.warning_note}>{errorMessage.name}</p>
              )}
            </div>
            <div className={styles.inbox}>
              <input
                readOnly={
                  formData &&
                  (formData.status === "Pending" ||
                    formData.status === "Rejected")
                    ? false
                    : true
                }
                value={formData.bankName}
                onChange={(e) =>
                  formDataHandler("bankName", e.target.value.toUpperCase())
                }
                type="text"
                placeholder="Bank Name"
              />
              {errorMessage.bankName && (
                <p className={styles.warning_note}>{errorMessage.bankName}</p>
              )}
            </div>
          </div>
          {/* <div className={`${styles.twoinput} flex-between`}>
            {errorMessage.name && (
            <p className={styles.warning_note}>{errorMessage.name}</p>
          )}
            {errorMessage.bankName && (
            <p className={styles.warning_note}>{errorMessage.bankName}</p>
          )}
          </div> */}
          <div className={`${styles.twoinput} flex-between`}>
            <div className={styles.inbox}>
              <input
                readOnly={
                  formData &&
                  (formData.status === "Pending" ||
                    formData.status === "Rejected")
                    ? false
                    : true
                }
                value={formData.accountNo}
                onChange={(e) => formDataHandler("accountNo", e.target.value)}
                type="number"
                placeholder="Account No:"
              />
              {errorMessage.accountNo && (
                <p className={styles.warning_note}>{errorMessage.accountNo}</p>
              )}
            </div>
            <div className={styles.inbox}>
              <input
                readOnly={
                  formData &&
                  (formData.status === "Pending" ||
                    formData.status === "Rejected")
                    ? false
                    : true
                }
                value={formData.caccountNo}
                onChange={(e) => formDataHandler("caccountNo", e.target.value)}
                type="number"
                placeholder="Confirm Account No"
              />
              {errorMessage.caccountNo && (
                <p className={styles.warning_note}>{errorMessage.caccountNo}</p>
              )}
            </div>
          </div>
          {formData.country !== "India" && (
            <div className={`${styles.twoinput} flex-between`}>
              <div className={styles.inbox}>
                <input
                  readOnly={
                    formData &&
                    (formData.status === "Pending" ||
                      formData.status === "Rejected")
                      ? false
                      : true
                  }
                  value={formData.ifsc}
                  onChange={(e) =>
                    formDataHandler("ifsc", e.target.value.toUpperCase())
                  }
                  type="text"
                  placeholder="IFSC"
                />
                {errorMessage.ifsc && (
                  <p className={styles.warning_note}>{errorMessage.ifsc}</p>
                )}
              </div>
              <div className={styles.inbox}>
                <input
                  readOnly={
                    formData &&
                    (formData.status === "Pending" ||
                      formData.status === "Rejected")
                      ? false
                      : true
                  }
                  value={formData.passportNo}
                  onChange={(e) =>
                    formDataHandler("passportNo", e.target.value.toUpperCase())
                  }
                  type="text"
                  placeholder="Passport No"
                />
                {errorMessage.passportNo && (
                  <p className={styles.warning_note}>
                    {errorMessage.passportNo}
                  </p>
                )}
              </div>
            </div>
          )}
          {formData.country === "India" && (
            <div className={`${styles.threeinput} flex-between`}>
              <div className={styles.inbox}>
                <input
                  readOnly={
                    formData &&
                    (formData.status === "Pending" ||
                      formData.status === "Rejected")
                      ? false
                      : true
                  }
                  value={formData.ifsc}
                  onChange={(e) => formDataHandler("ifsc", e.target.value.toUpperCase())}
                  type="text"
                  placeholder="IFSC"
                />
                {errorMessage.ifsc && (
                  <p className={styles.warning_note}>{errorMessage.ifsc}</p>
                )}
              </div>
              <div className={styles.inbox}>
                <input
                  readOnly={
                    formData &&
                    (formData.status === "Pending" ||
                      formData.status === "Rejected")
                      ? false
                      : true
                  }
                  value={formData.panCardNo}
                  onChange={(e) =>
                    formDataHandler(
                      "panCardNo",
                      e.target.value.length <= 10
                        ? e.target.value.toUpperCase()
                        : formData.panCardNo
                    )
                  }
                  type="text"
                  placeholder="Pan Card No"
                />
                {errorMessage.panCardNo && (
                  <p className={styles.warning_note}>
                    {errorMessage.panCardNo}
                  </p>
                )}
              </div>
              <div className={styles.inbox}>
                <input
                  readOnly={
                    formData &&
                    (formData.status === "Pending" ||
                      formData.status === "Rejected")
                      ? false
                      : true
                  }
                  value={formData.adharCardNo}
                  onChange={(e) =>
                    formDataHandler(
                      "adharCardNo",
                      e.target.value.length <= 12
                        ? e.target.value
                        : formData.adharCardNo
                    )
                  }
                  type="number"
                  placeholder="Adhaar Card No"
                />
                {errorMessage.adharCardNo && (
                  <p className={styles.warning_note}>
                    {errorMessage.adharCardNo}
                  </p>
                )}
              </div>
            </div>
          )}

          <div
            className={
              formData.country === "India"
                ? styles.dragBoxes
                : styles.dragBoxes2
            }
          >
            <div className="flex-start column">
              <h5>Passbook/cheque</h5>
              <div className={`${styles.dragbox} flex-center column`}>
                <DragandDrop
                  type={"bank"}
                  name={"passbook_cheque"}
                  status={
                    formData &&
                    (formData.status === "Pending" ||
                      formData.status === "Rejected")
                      ? true
                      : false
                  }
                  img={formData?.passbook}
                  getValue={formDataHandler}
                  formKey={"passbook"}
                />
              </div>
              {errorMessage.passbook && (
                <p className={styles.warning_note2}>{errorMessage.passbook}</p>
              )}
            </div>

            {formData?.country !== "India" && (
              <div className="flex-start column">
                <h5>Passport</h5>
                <div className={`${styles.dragbox} flex-center column`}>
                  <DragandDrop
                    type={"bank"}
                    name={"passport"}
                    status={
                      formData &&
                      (formData.status === "Pending" ||
                        formData.status === "Rejected")
                        ? true
                        : false
                    }
                    img={formData?.passport}
                    getValue={formDataHandler}
                    formKey={"passport"}
                  />
                </div>
                {errorMessage.passport && (
                  <p className={styles.warning_note2}>{errorMessage.passport}</p>
                )}
              </div>
            )}

            {formData?.country === "India" && (
              <div className="flex-start column">
                <h5>Pan Card</h5>
                <div className={`${styles.dragbox} flex-center column`}>
                  <DragandDrop
                    type={"bank"}
                    name={"pancard"}
                    status={
                      formData &&
                      (formData.status === "Pending" ||
                        formData.status === "Rejected")
                        ? true
                        : false
                    }
                    img={formData?.panCardImage}
                    getValue={formDataHandler}
                    formKey={"panCardImage"}
                  />
                </div>
                {errorMessage.panCardImage && (
                  <p className={styles.warning_note2}>
                    {errorMessage.panCardImage}
                  </p>
                )}
              </div>
            )}
            {formData?.country === "India" && (
              <div className="flex-start column">
                <h5>Adhaar Card Front</h5>
                <div className={`${styles.dragbox} flex-center column`}>
                  <DragandDrop
                    type={"bank"}
                    name={"adhaar_front"}
                    status={
                      formData &&
                      (formData.status === "Pending" ||
                        formData.status === "Rejected")
                        ? true
                        : false
                    }
                    img={formData?.adharCardFront}
                    getValue={formDataHandler}
                    formKey={"adharCardFront"}
                  />
                </div>
                {errorMessage.adharCardFront && (
                  <p className={styles.warning_note2}>
                    {errorMessage.adharCardFront}
                  </p>
                )}
              </div>
            )}
            {formData?.country === "India" && (
              <div className="flex-start column">
                <h5>Adhaar Card Back</h5>
                <div className={`${styles.dragbox} flex-center column`}>
                  <DragandDrop
                    type={"bank"}
                    name={"adhaar_back"}
                    status={
                      formData &&
                      (formData.status === "Pending" ||
                        formData.status === "Rejected")
                        ? true
                        : false
                    }
                    img={formData?.adharCardBack}
                    getValue={formDataHandler}
                    formKey={"adharCardBack"}
                  />
                </div>
                {errorMessage.adharCardBack && (
                  <p className={styles.warning_note2}>
                    {errorMessage.adharCardBack}
                  </p>
                )}
              </div>
            )}
          </div>
          {formData &&
            (formData.status === "Pending" ||
              formData.status === "Rejected") && (
              <button type="submit" className={`${styles.bankdetials_btn} btn`}>
                Submit
              </button>
            )}
        </form>

        <img className={styles.bgi} src={wallet_i} alt="wallet" />
      </div>

      <Footer />
    </div>
  );
};

export default BankDetails;
