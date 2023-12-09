import React, { useContext , useState , useEffect} from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";
import Context from "../../Context/Context";
import styles from "./News.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { refreshToken, sendGetRequest } from "../../Helper/helper";


export const Box = ({ i , img,title, p , slug  }) => {
  const text = p.replaceAll("<p>","").replaceAll("</p>","");
  const shortText = text.slice(0,183);

  const send = () => {
    window.location.href = `/news/${slug}`
  }

  return (
    <div onClick={send} className={`${i%2===0 ? styles.box : styles.boxn} flex-start column`}>
      <img src={img} alt={img} />
      <h3>{title}</h3>
      <p><span dangerouslySetInnerHTML={{ __html: shortText }}></span>... <button>Read more</button></p>
    </div>
  );
};



const News = () => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [newsData, setNewsData] = useState();
  const [selectedFilter, setSelectedFilter] = useState("viewall");
  const [category, setCategory] = useState();

  const [ssize, setSsize] = useState(window.innerWidth);
  const { states } = useContext(Context);

  const dmode = states.dmode;

  useEffect(() => {
        (async () => {
      const res = await sendGetRequest("get-news")
      const catres = await sendGetRequest("get-news-categories")
      setCategory(catres.data)
      setNewsData(res.data)
      res.refresh_token && refreshToken(res.refresh_token);
    })()
    window.addEventListener('resize' , () => setSsize(window.innerWidth))
  }, [])
  return (
    <div className={dmode ? styles.news_d : styles.news_l}>
      <Navbar />
      <div className={`${styles.news} container`}>
        <div className={`${styles.options} flex`}>
        <button value={"viewall"} onClick={(e)=> setSelectedFilter(e.target.value)} className={selectedFilter === "viewall" ? `${styles.coin} btn` : ""} >view ALL</button>
        {
          category?.map((value , i) => <button key={i} value={value.name} onClick={(e)=> setSelectedFilter(e.target.value)} className={selectedFilter === value.name ? `${styles.coin} btn` : ""} >{value.name}</button>)
        }
        </div>

        <div className="flex-center">
          <div
            className={`${styles.newsS} flex-center`}
            ref={(node) => setPrevEl(node)}
          >
            <AiOutlineLeft />
          </div>
          <Swiper
            slidesPerView={ ssize < 490 && ssize >= 380 ? 2 : ssize <= 380  ? 1 :3}
            slidesPerGroup={ ssize < 490 && ssize >= 380 ? 2 : ssize <= 380  ? 1 :3}
            navigation={{ prevEl, nextEl }}
            modules={[Navigation]}
            className={styles.mySwiper}
          >
          <SwiperSlide className="flex-center"><button value={"viewall"} onClick={(e)=> setSelectedFilter(e.target.value)} className={selectedFilter === "viewall" ? `${styles.coin} btn` : ""} >view ALL</button></SwiperSlide>
        {
          category?.map((value , i) => <SwiperSlide key={i} className="flex-center"><button value={value.name} onClick={(e)=> setSelectedFilter(e.target.value)} className={selectedFilter === value.name ? `${styles.coin} btn` : ""} >{value.name}</button></SwiperSlide>)
        }
          </Swiper>
          <div
            className={`${styles.newsS} flex-center`}
            ref={(node) => setNextEl(node)}
          >
            <AiOutlineRight />
          </div>
        </div>

        <div className={styles.boxes}>
          {newsData?.map((news, i) => (
            selectedFilter === "viewall" || news.category === null ? <Box key={i} i={i} img={news.image} slug={news.slug} title={news.title} p={news.description} /> : news.category === selectedFilter && <Box key={i} i={i} img={news.image} slug={news.slug} title={news.title} p={news.description} /> 
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
