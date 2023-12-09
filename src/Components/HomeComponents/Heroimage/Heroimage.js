import React from 'react';
import styles from './Heroimage.module.scss';
import hero_image from '../../../Assets/heroimage.png';
import hero_side from '../../../Assets/heroi2.svg';

const Heroimage = () => {
  return (
    <div className={styles.heroimage}>
        <img width='100%' height='100%' src={hero_image} alt='Crypto Coins' />
        <img className={styles.floatingImg} width='100%' height='100%' src={hero_side} alt='Floating Icon' />
    </div>
  )
}

export default Heroimage