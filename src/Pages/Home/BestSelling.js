import React, { useState, useEffect } from 'react' 
import 'react-multi-carousel/lib/styles.css'; 
import Card from '../Components/Card/Card';
function BestSelling() {
    const [categorizedData, setCategorizedData] = useState([]);
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/api/product/allProducts').then((resp) => {
            resp.json().then((result) => {
                setData(result.productlist)
            })
        })
    }, [])
    useEffect(() => {
        // Extract unique categories from JSON data
        const topRating = data.filter(item => item.rating > 4.3);
        setCategorizedData(topRating);
    }, [data]);
    // const BestSellingProduct = categorizedData.slice(0, 6)
    // console.log("categorizedData", categorizedData)
    return (
        <>
            <Card data={categorizedData} title='Best Selling'/>
        </>
    )
}
export default BestSelling