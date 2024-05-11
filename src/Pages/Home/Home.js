import React from 'react'
import Slider from './Slider'
import Header from '../Components/Header'
import LatestProduct from './LatestProduct'
import BestSelling from './BestSelling'
import Footer from '../Footer/Footer'
import TopBrand from './TopBrand'
import Banner from './Banner'

function Home() {
    return (
        <>
            <Header />
            <Slider />
            <LatestProduct />
            <BestSelling />
            <Banner />
            <TopBrand />
            <Footer />

        </>
    )
}

export default Home