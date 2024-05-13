import React, { useState } from 'react';
import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { removeAllItems } from '../../Store/Slices/ProductSlice';
import Footer from '../Components/Footer'
import SubTotal from './SubTotal';
import PurchasedItems from './PurchasedItems';

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
                        <Row className=' justify-content-between'>
                            <Col className="remove-btn">
                                <h5>Total: Rs {finalPrice ? finalPrice : totalPrice}/-</h5>
                                <button className='' onClick={() => dispatch(removeAllItems())}>Remove all items</button>
                            </Col>
                            <Col className="text-end">
                                <p>{finalPrice > 1 ? "coupon applied 😍" : "Apply coupon code & get 10% more discount."}</p>
                                <div className='d-flex gap-2 justify-content-end'>
                                    <input type="text" placeholder='apply coupon code' onChange={(e) => setCouponCode(e.target.value)} />
                                    <button onClick={applyCoupon}>apply coupon</button>
                                </div>
                            </Col>
                        </Row>

                        <Row className='my-3'>
                            <Col lg='7'>
                                <PurchasedItems />
                            </Col>
                            <Col>
                                <SubTotal finalPrice={finalPrice} totalPrice={totalPrice} DeliveryCharges={DeliveryCharges} />
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
