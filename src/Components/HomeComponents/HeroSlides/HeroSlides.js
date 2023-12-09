import React,{useContext, useLayoutEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import styles from './HeroSlides.module.scss';

import pic1 from "../../../Assets/slide1.png";
import pic2 from "../../../Assets/slide2.png";
import pic3 from "../../../Assets/slide3.png";
import Context from "../../../Context/Context";

const HeroSlides = () => {
  const { states , changeState } = useContext(Context)

  function updateSize() {
    changeState(states.dmode , window.innerWidth , states.stokenbtn , states.buyTrade , states.isLogin)
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [states.swidth]);
  return (
    <section className={`${styles.sliders} container`}>
      <Swiper
      spaceBetween={10}
        loop={true}
        speed={5000}
        slidesPerView={states.swidth < 800 && states.swidth > 550 ? 2 : states.swidth < 550 ? 1 : 3}
        grabCursor={true}
        autoplay={{
          delay: "2000",
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="warraperSlider"
      >
        
        <SwiperSlide className="flex-center">
            <a className={styles.perslide} href="/">
                <img src={pic1} alt="pic1" />
            </a>
        </SwiperSlide>
        
        <SwiperSlide className="flex-center">
            <a className={styles.perslide} href="/">
                <img src={pic2} alt="pic2" />
            </a>
        </SwiperSlide>
        
        <SwiperSlide className="flex-center">
            <a className={`${styles.perslide} flex-center`} href="/">
                <img src={pic3} alt="pic3" />
            </a>
        </SwiperSlide>
      
      </Swiper>
    </section>
  );
};

export default HeroSlides;
