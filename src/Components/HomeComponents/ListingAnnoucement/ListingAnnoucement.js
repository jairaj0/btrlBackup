import React,{useContext , useState , useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Context from "../../../Context/Context";
import "swiper/css";
import { Autoplay } from "swiper";
import styles from './ListingAnnoucement.module.scss';

import pic1 from "../../../Assets/la1.jpeg";
import pic2 from "../../../Assets/la2.png";
import pic3 from "../../../Assets/la3.png";
import pic4 from "../../../Assets/la4.jpeg";
import pic5 from "../../../Assets/la5.jpeg";
import pic6 from "../../../Assets/la6.jpeg";
import shape1 from "../../../Assets/shape1.svg";
import { refreshToken, sendGetRequest } from "../../../Helper/helper";

const lists = [
  {
    name : "stc",
    img : pic2,
    status : "new"
  },
  {
    name : "sunny",
    img : pic1,
    status : "new"
  },
  {
    name : "ramt",
    img : pic3,
    status : "new"
  },
  {
    name : "gujju",
    img : pic4,
    status : "new"
  },
  {
    name : "kishu",
    img : pic5,
    status : "new"
  },
  {
    name : "ryoshi",
    img : pic6,
    status : "new"
  },
]

const ListingAnnoucement = () => {
  const [data, setData] = useState();
    const { states } = useContext(Context);

    const dmode = states.dmode;

    useEffect(() => {
      (async () => {
        const res = await sendGetRequest("global");
        res.refresh_token && refreshToken(res.refresh_token);
        setData(res.data.listingAnnoucement);
      })()
    }, [])
  return (
    <section className={dmode ? styles.d_sliders : styles.l_sliders}>
    <img className={styles.shape1} src={shape1} alt="shape1" />
   <div className="container">
   <h1>Listing Annoucement</h1>
      <Swiper
        loop={true}
        speed={10000}
        slidesPerView={states.swidth < 1000 && states.swidth > 800 ? 4 : states.swidth < 800 && states.swidth > 600 ? 3 : states.swidth < 600 ? 2 :5}
        grabCursor={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={styles.warraperSlider}
      >
        {
          data?.map((value , i) => <SwiperSlide key={i} className="flex-center">
            <div className={`${styles.perslide} flex-center column`}>
                <div className={`${styles.pbox} ${i%2 === 0 ? styles.nxt : ""} flex-center`} ><img className={i%2 === 0 ? styles.nxt : ""} src={value.image} alt="pic1" /></div>
                <h3 className={i%2 === 0 ? styles.nxt : ""}>{value.status ? value.status : "new"}</h3>
                <h2>{value.currency_symbol}</h2>
                <a href="/">Trade Now</a>
            </div>
        </SwiperSlide>)
        }   
      </Swiper>
   </div>
    </section>
  );
};

export default ListingAnnoucement;