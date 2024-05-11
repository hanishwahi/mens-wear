import React from 'react'

function ProductComp({ item }) {
    return (
        <>
            <div className='card '>
                <div className='latest-product-img'>
                    <img src={item.images[0]} className="card-img-top border" alt={item.images[0]} />
                </div>
                <div className='latest-product-off'>
                    <h1>Off {item.discountPercentage} %</h1>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{item.title.toUpperCase()}</h5>
                    <div className="d-flex gap-3 align-items-center">
                        <div className="card-text1">
                            <del>MRP: {item.price}/- </del>
                        </div>
                        <p className="card-text">₹ {Math.ceil(item.price - item.price / 100 * item.discountPercentage)}/-</p>
                    </div>
                    <div> <p className='text-success'>you saved  ₹ {Math.floor(item.price / 100 * item.discountPercentage)} </p></div>
                </div>

            </div>
        </>
    )
}

export default ProductComp