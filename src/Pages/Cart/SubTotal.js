import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from '../Components/Button/Index'

function SubTotal({finalPrice, totalPrice,DeliveryCharges}) {
    return (
        <>
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
                    <Button className='checkout' title='Checkout'/>
                </Row>

            </div>
        </>
    )
}

export default SubTotal