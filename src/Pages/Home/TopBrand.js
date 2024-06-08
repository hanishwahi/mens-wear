import React, { useState, useEffect } from 'react' 
import 'react-multi-carousel/lib/styles.css'; 
import Card from '../Components/Card/Card';
function LatestProduct() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/api/product/allProducts').then((resp) => {
            resp.json().then((result) => {
                setData(result.productlist)
            })
        })
    }, [])
    const latestP = data.slice(-8)
    return (
        <> 
            <Card data={latestP} title='Top Brands'/> 
        </>
    )
}
export default LatestProduct