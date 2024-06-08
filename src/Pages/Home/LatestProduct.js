import React, { useEffect, useState } from 'react'
import Card from '../Components/Card/Card'
function LatestProduct() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/api/product/allProducts').then((resp) => {
            resp.json().then((result) => {
                setData(result.productlist)
            })
        })
    }, [])
    const filteredData = data.slice(-8)
    return (
         <>
         <Card data={filteredData} title="Latest Products"/>
         </>
    )
}
export default LatestProduct