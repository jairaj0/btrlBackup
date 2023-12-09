import React from 'react'
import Buysell from '../../Components/HomeComponents/Buysell/Buysell';
import Footer from '../../Components/HomeComponents/Footer/Footer';
import Hero from '../../Components/HomeComponents/Hero/Hero'
import Ourpatners from '../../Components/HomeComponents/Ourpatners/Ourpatners';
import Secured from '../../Components/HomeComponents/Secured/Secured'

const Home = () => {
  return (
    <>
        <Hero />
        <Secured />
        <Buysell />
        <Ourpatners />
        <Footer />
    </>
  )
}

export default Home