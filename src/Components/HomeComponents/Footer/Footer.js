import React,{useContext} from 'react';
import Context from "../../../Context/Context";
import styles from './Footer.module.scss';
import logo from '../../../Assets/logo.png';
import {BsWhatsapp , BsInstagram , BsTwitter , BsYoutube , BsLinkedin , BsMedium} from 'react-icons/bs';
import {FaTelegramPlane , FaFacebookF , FaRedditAlien} from 'react-icons/fa';

const Footer = () => {
    const { states } = useContext(Context);

    const redirectHome = () => {document.location.href = "www.yoursite.com";};

    const dmode = states.dmode;
  return (
    <>
        <footer className={`${dmode ? styles.d_footer : styles.l_footer}`} >
    <div className={`${styles.footer} container flex`}>
        <div className={`${styles.f_s_l}`}>
            <img onClick={redirectHome} src={logo} alt="logo" />
            <div className='flex-center'><a href="/"><BsWhatsapp /></a></div>
            <div className='flex-center'><a href="/"><BsInstagram /></a></div>
            <div className='flex-center'><a href="/"><BsTwitter /></a></div>
            <div className='flex-center'><a href="/"><BsYoutube /></a></div>
            <div className='flex-center'><a href="/"><BsLinkedin /></a></div>
            <div className='flex-center'><a href="/"><BsMedium /></a></div>
            <div className='flex-center'><a href="/"><FaTelegramPlane /></a></div>
            <div className='flex-center'><a href="/"><FaFacebookF /></a></div>
            <div className='flex-center'><a href="/"><FaRedditAlien /></a></div>
        </div>

        <div className={styles.f_links_grids}>

        <div className={styles.f_links_grid}>
            <h3>Legal</h3>

            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <a href="/risk-statement">Risk Statement</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/about">About Us</a>
            <a href="/contact-us">Contact Us</a>
        </div>

        <div className={styles.f_links_grid}>
            <h3>Exchange</h3>

            <a href="/coininfo">Coin Info</a>
            <a href="/fees">Fees</a>
            {/* <a href="/">Public API</a> */}
            <a href="/">Listing Request</a>
            {/* <a href="/">About Us</a> */}
        </div>

        <div className={styles.f_links_grid}>
            <h3>Legal Documents</h3>

            <a href="/">Certificate of Incoporation</a>
            <a href="/">Memorandum of Association</a>
            <a href="/">PAN Card</a>
        </div>

        <div className={styles.f_links_grid}>
            <h3>Others Links</h3>

            <a href="/">BTRL Token Website</a>
        </div>

        </div>
    </div>
    </footer>
    <div className={dmode ? styles.d_copyright : styles.l_copyright}>© 2019 - 2022 BTRL Exchange. All Rights Reserved.</div>
    </>
  )
}

export default Footer