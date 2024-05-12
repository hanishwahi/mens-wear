import React, { useState } from 'react';
import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { removeAllItems, removeFromCart } from '../../Store/Slices/ProductSlice';
import Footer from './../Components/Footer'
import { Link } from 'react-router-dom';

function Cart() {
    const [couponCode, setCouponCode] = useState("")
    const [discountOnCoupon, setDiscountOnCoupon] = useState("")
    const basket = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const applyCoupon = () => {
        if (couponCode === "abc") {
            setDiscountOnCoupon('10')
        }
    }
    const totalPrice = basket.reduce((accumulator, item, index) => {
        return accumulator + item.price * (item.quantity[index] || item.quantity);
    }, 0);

    const finalPrice = discountOnCoupon && Math.floor(totalPrice - totalPrice / 100 * discountOnCoupon)
    console.log("finalPrice", finalPrice);
    const DeliveryCharges = 100

    return (
        <>
            <Header />

            <Container className='my-3'>
                {basket.length > 0 ? (
                    <>
                        <div className='d-flex justify-content-between'>
                            <div className="remove-btn">
                                <h5>Total: Rs {finalPrice ? finalPrice : totalPrice}/-</h5>
                                <button className='' onClick={() => dispatch(removeAllItems())}>Remove all items</button>
                            </div>
                            <div>
                                <p>{finalPrice > 1 ? "coupon applied 😍" : "Apply coupon code & get 10% more discount."}</p>
                                <div className='d-flex gap-2'>
                                    <input type="text" placeholder='apply coupon code' onChange={(e) => setCouponCode(e.target.value)} />
                                    <button onClick={applyCoupon}>apply coupon</button>
                                </div>
                            </div>
                        </div>

                        <Row className='my-3'>
                            <Col lg='7'>
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
                            </Col>
                            <Col>
                                <div className='border p-3'>
                                    <Row className='checkout-text'>
                                        <Col><p>Product Subtotal </p></Col>
                                        <Col className='text-end'><strong>{finalPrice ? finalPrice : totalPrice}</strong></Col>
                                    </Row>

                                    <Row className='checkout-text'>
                                        <Col><p>Shipping</p></Col>
                                        <Col className='text-end'><strong>{DeliveryCharges}</strong></Col>
                                    </Row>
                                    <Row className='checkout-text'>
                                        <Col><p>Total Price:</p></Col>
                                        <Col className='text-end'><strong>Rs. {(finalPrice ? finalPrice : totalPrice) + DeliveryCharges}/-</strong></Col>
                                    </Row>
                                    <Row >
                                        <button className='checkout'>Checkout</button>
                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <span>
                        Your cart is empty.. <i className='fa-regular fa-face-frown'></i>
                    </span>
                )}
            </Container>
            <div className={basket.length === 0 && 'fixed-bottom'}>
                <Footer />
            </div>
        </>
    );
}

export default Cart;
