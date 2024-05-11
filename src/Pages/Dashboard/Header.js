import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Images/logo-main.png'
import { Col, Container, Row } from 'react-bootstrap'

function Header() {
     return (
        <>
            <div className="py-2 border-bottom bg-white">
                <Container fluid="xl">
                    <Row className='align-items-center'>
                        <Col lg='2' md='2' sm='3' xs='6'>
                            <Link to='/'><img src={Logo} alt="" width={110} /></Link>
                        </Col>
                        <Col>
                            <h2>Dashboard</h2>
                        </Col>
                    </Row >
                </Container >
            </div >

        </>
    )
}

export default Header
