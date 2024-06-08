import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import Header from '../Components/Header' 
import Footer from '../Components/Footer' 
import Card from '../Components/Card/Card'
function CategoryClothes() {
    const [categorizedProduct, setCategorizedProduct] = useState([])
    const param = useParams()
    const category = param.category 
    useEffect(() => {
        async function fetchProduct() {
            try {
                let response = await fetch(`http://localhost:5000/api/product/categoryProduct/${category}`);
                response = await response.json();
                setCategorizedProduct(response.categorized)
            } catch (error) {
                console.log(error);
            }
        }
        fetchProduct();
    }, [category]);
    return (
        <>
            <Header />
            <Card data={categorizedProduct} />
            <Footer />
        </>
    )
}
export default CategoryClothes