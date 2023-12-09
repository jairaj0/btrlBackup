import React, { useContext, useState, useEffect } from "react";
import Footer from "../../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../../Context/Context";
import wallet_i from "../../../Assets/wallet_login_register.png";
import styles from "./PersonalInfo.module.scss";
import { allLetter, authRequest, authRequestNb } from "../../../Helper/helper";
import { Country, State } from "country-state-city";
import swal from "sweetalert";

const monthLists = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Day = [];
const Month = [];
const Year = [];

for (let i = 1; i < 100; i++) {
  if (i <= 31) {
    Day.push(i);
  }
  if (i < 13) {
    Month.push(i);
  }
  if (i < 100) {
    Year.push(2020 - i);
  }
}

const PersonalInfo = () => {
  const [checkS, setCheckS] = useState();
  const [data, setData] = useState();
  const { states } = useContext(Context);
  const [_country, set_country] = useState(data && data.country);
  const [_state, set_state] = useState(data && data.state);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [cc, setCc] = useState();
  const [allClear, setAllClear] = useState(false);

  const allCountries = Country.getAllCountries();

  const dmode = states.dmode;

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

  const countryGet = (event) => {
    set_country(event.target.value);
    for (let i = 0; i < allCountries.length; i++) {
      if (allCountries[i].name === event.target.value) {
        setCc(allCountries[i].isoCode);
      }
    }
    formDataSet("country", event.target.value);
  };
  const stateGet = (event) => {
    set_state(event.target.value);
    formDataSet("state", event.target.value);
  };

  const birthDayGet = (event) => {
    formDataSet("birthDay", event.target.value);
  };
  const birthMonthGet = (event) => {
    formDataSet("birthMonth", event.target.value);
  };
  const birthYearGet = (event) => {
    formDataSet("birthYear", event.target.value);
  };

  const formFillCheck = () => {
    (formData.name === "" || formData.name === undefined) &&
      errorMessageSet("name", "Please enter your name");
    (formData.birthDay === "" || formData.birthDay === undefined) &&
      errorMessageSet("birthDay", "Please enter your Date of birth");
    (formData.birthMonth === "" || formData.birthMonth === undefined) &&
      errorMessageSet("birthMonth", "Please enter your Date of birth");
    (formData.birthYear === "" || formData.birthYear === undefined) &&
      errorMessageSet("birthYear", "Please enter your Date of birth");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formFillCheck();
    if (
      formData.birthDay === undefined ||
      formData.birthDay === "" ||
      formData.birthMonth === undefined ||
      formData.birthMonth === "" ||
      formData.birthYear === undefined ||
      formData.birthYear === ""
    ) {
      setAllClear(false);
      errorMessageSet("dob", "Please enter your date of birth");
    } else {
      if(allClear){
        const res = await authRequest({
          name : formData.name,
          country : formData.country,
          state : formData.state,
          city : formData.city,
          dob_date : formData.birthDay,
          dob_month : formData.birthMonth,
          dob_year : formData.birthYear
        } , "submit-personal-info")
        const _swal = await swal(res.message);
        _swal && await autoGet()
      }
      errorMessageSet("dob", "");
    }

  };

  const autoGet = async () => {
    const res = await authRequestNb("get-personal-info");
    console.log(res.data);
    setData(res.data);
    set_country(res.data.country);
    set_state(res.data.state);
    setCheckS(res.data.status);
    formDataSet("name", res.data.name);
    formDataSet("email", res.data.email);
    formDataSet("phone", res.data.mobile);
    formDataSet("country", res.data.country);
    formDataSet("state", res.data.state);
    formDataSet("city", res.data.city);
    formDataSet("birthDay", res.data.dob_date === null ? "" : parseInt(res.data.dob_date));
    formDataSet("birthMonth", res.data.dob_month === null ? "" : parseInt(res.data.dob_month));
    formDataSet("birthYear", res.data.dob_year === null ? "" : parseInt(res.data.dob_year));

    for (let i = 0; i < allCountries.length; i++) {
      if (allCountries[i].name === res.data.country) {
        setCc(allCountries[i].isoCode);
      }
    }
  };

  useEffect(() => {
    (async()=> await autoGet())()
  }, []);

  useEffect(() => {
    if (formData.name) {
      allLetter(formData.name) === false &&
        errorMessageSet("name", "Only use alphabet");
        setAllClear(false)
      if (allLetter(formData.name)) {
        setAllClear(true);
        errorMessageSet("name", "");
      }
    } else {
      setAllClear(false);
    }

    if (formData.country === "") {
      setAllClear(false);
      errorMessageSet("country", "Please select your country");
    } else {
      errorMessageSet("country", "");
    }

    if (
      formData.birthDay === undefined ||
      formData.birthDay === "" ||
      formData.birthMonth === undefined ||
      formData.birthMonth === "" ||
      formData.birthYear === undefined ||
      formData.birthYear === ""
    ) {
      setAllClear(false);
    } else {
      errorMessageSet("dob", "");
    }


  }, [formData]);
  return (
    <div className={dmode ? styles.pers_d : styles.pers_l}>
      <Navbar />
      <div className={`${styles._pers} container`}>
        <form onSubmit={handleSubmit} className="flex-start column">
          <h1>My Account</h1>
          <h4>Personal Information</h4>

          <div className={`${styles.cheks} flex-start`}>
            <label className="flex">
              <input
                type="radio"
                name="pending"
                checked={checkS === "Pending" ? true : false}
                value="pending"
                readOnly={true}
              />
              Pending
            </label>
            <label className="flex">
              <input
                type="radio"
                name="submitted"
                checked={checkS === "Submitted" ? true : false}
                value="submitted"
                readOnly={true}
              />
              Submitted
            </label>
          </div>

          <div className={`${styles.twoinput} flex-between`}>
            <input
              onChange={(e) => formDataSet("name", e.target.value)}
              type="text"
              readOnly={data && data.status === "Pending" ? false : true}
              defaultValue={data && data.name}
              placeholder="Your Full Name"
            />
            {errorMessage.name && (
              <p className={styles.phoneWarning}>{errorMessage.name}</p>
            )}
            <input
              type="email"
              defaultValue={data && data.email}
              readOnly={true}
              placeholder="Email"
            />
          </div>
          {errorMessage.name && (
            <p className={styles.warning_note_temp}>{errorMessage.name}</p>
          )}
          <div className={`${styles.fourinput} flex-between`}>
            <input
              type="text"
              defaultValue={data && data.mobile}
              readOnly={true}
              placeholder="Mobile"
            />
            <div className={styles.sbox}>
              <select disabled={data && data.status === "Pending" ? false : true} value={formData.birthDay} onChange={birthDayGet}>
                <option value={""}>Day of Birth</option>
                {Day.map((option, index) => {
                  return (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.sbox}>
              <select disabled={data && data.status === "Pending" ? false : true} value={formData.birthMonth} onChange={birthMonthGet}>
                <option value={""}>Month of Birth</option>
                {Month.map((option, index) => {
                  return (
                    <option value={option} key={index}>
                      {monthLists[option]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.sbox}>
              <select disabled={data && data.status === "Pending" ? false : true} value={formData.birthYear} onChange={birthYearGet}>
                <option value={""}>Year of Birth</option>
                {Year.map((option, index) => {
                  return (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {errorMessage.dob && (
            <p className={styles.warning_note}>{errorMessage.dob}</p>
          )}

          <div className={`${styles.threeinput} flex-between`}>
            <div className={styles.sbox}>
              <select disabled={data && data.status === "Pending" ? false : true} value={_country} onChange={countryGet}>
                <option value="">Country</option>
                {allCountries.map((option, index) => {
                  return (
                    <option value={option.name} key={index}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.sbox}>
              <select disabled={data && data.status === "Pending" ? false : true} value={_state} onChange={stateGet}>
                <option value="">State</option>
                {State.getStatesOfCountry(cc).map((option, index) => {
                  return (
                    <option value={option.name} key={index}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              defaultValue={data && data.city}
              readOnly={data && data.status === "Pending" ? false : true}
              type="text"
              placeholder="City"
            />
          </div>
          {
            data && data.status === "Pending" && <button type="submit" className={`${styles.pers_btn} btn`}>
            Submit
          </button>
          }
        </form>

        <img className={styles.bgi} src={wallet_i} alt="wallet" />
      </div>

      <Footer />
    </div>
  );
};

export default PersonalInfo;
