import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import { refreshToken, sendGetRequest } from "../../Helper/helper";
import styles from "./NewsDetails.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";

const NewsDetails = () => {
  const { states } = useContext(Context);
  const [data, setData] = useState();
  const [share, setShare] = useState("Share")

  const dmode = states.dmode;

  const shareHandler = () => {
    setTimeout(() => {
        setShare("Share")
    }, 1000);
    setShare("Link Copied !")
  }

  useEffect(() => {
    const slug = window.location.pathname.split("/")[2];
    const custom = "/get-news-details/" + slug;
    (async () => {
      const res = await sendGetRequest(custom);
      setData(res.data[0]);
      states.isLogin && refreshToken(res.refresh_token)
    })();
  }, []);
  return (
    <div className={dmode ? styles.newsD_d : styles.newsD_l}>
      <Navbar />
      <div className={`${styles.newsd} container`}>
        <div className="flex-between">
          <a className={`${styles.back} flex-center`} href="/news/">
            <IoMdArrowRoundBack />
          </a>

          <CopyToClipboard text={window.location.href}>
            <button onClick={shareHandler} className="btn">{share}</button>
          </CopyToClipboard>
        </div>
        <div className={styles.title}>
          <h1>{data?.title}</h1>
        </div>
        <img src={data?.image} alt="" />
        <div
          dangerouslySetInnerHTML={{
            __html: data?.description
              .replaceAll("<p>", "")
              .replaceAll("</p>", ""),
          }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetails;
