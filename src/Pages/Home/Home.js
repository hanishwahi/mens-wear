import React from 'react' 
import Header from '../Components/Header'
import LatestProduct from './LatestProduct'
import BestSelling from './BestSelling'
import Footer from '../Components/Footer'
import TopBrand from './TopBrand'
import Banner from './Banner'
import Slider from '../Components/Home-Slider/Slider'
function Home() {
    return (
        <>
            <Header />
            <Slider/>
            <LatestProduct />
            <BestSelling />
            <Banner />
            <TopBrand />
            <Footer />
        </>
    )
}
export default Home