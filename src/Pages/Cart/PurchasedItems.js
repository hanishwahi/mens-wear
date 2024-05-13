import React from 'react'
import { removeFromCart } from '../../Store/Slices/ProductSlice';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function PurchasedItems() {
    const basket = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <>
            {basket &&
                basket.map((item, index) => {
                    return (
                        <Row key={item._id} className='border p-2 mb-3 align-items-center'>
                            <Col lg='2' xs="4">
                                <img src={item.images[0]} alt='' height={70} width={70} />
                            </Col>
                            <Col lg='8' xs="8" className='cart-inner-text'>
                                <div className="d-flex gap-2 align-items-center">
                                    <Link to={`/mens/${item.title}/${item.id}`}>
                                        <h3>{item.title}</h3>
                                    </Link>

                                    <h5><strong>Rs {item.price * item.quantity}/-</strong></h5>
                                </div>
                                <div className='d-flex gap-2'>
                                    <p className='border py-1 px-3'>Qt: {item.quantity}</p>
                                    <p className='border py-1 px-3'>Size: {item.productSize}</p>
                                </div>
                            </Col>
                            <Col lg='2' className='text-end remove-btn'>
                                <button onClick={() => dispatch(removeFromCart(index))}>Remove</button>
                            </Col>
                        </Row>
                    );
                })}
        </>
    )
}

export default PurchasedItems