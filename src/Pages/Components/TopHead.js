import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function TopHead() {
    const [showSignup, setShowSignup] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
     const token = JSON.parse(localStorage.getItem('Token'))
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        setShowSignup(false)
        navigate('/')
    }

    return (
        <>
            <div className="top-head-bg">
                <Container fluid="xl">
                    <Row className='align-items-center'>
                        <Col lg='6' md='8' sm='8' xs='12' className='top-head-text'>
                            <div className="row">
                                <div className="col-4"><p><i className="fa-solid fa-truck-fast"></i> Free Shipping</p></div>
                                <div className="col-4"><p><i className="fa-solid fa-truck"></i> Cash on Delivery</p></div>
                                <div className="col-4"><p><i className="fa fa-exchange" aria-hidden="true"></i> Return Policy</p></div>
                            </div>
                        </Col>
                        <Col lg='6' md='4' sm='12' xs='12' className='text-end'>
                            <div className="login-signup">
                                <i className="fa-regular fa-user" style={{ color: "#fff" }}></i> <Link
                                    onClick={() => setShowSignup(!showSignup)}>{token ? user.name.toUpperCase() : `Guest User`}</Link>
                                {
                                    showSignup && <div className="bg-white Top-nav-menu">
                                        <ul>
                                            {
                                                token ? <>
                                                    <li onClick={scrollToTop}><Link to={user && `/profile/${user.name}/${user.id}`}>Profile</Link></li>
                                                    <li onClick={handleLogout}><Link>My Orders</Link></li>
                                                    <li onClick={handleLogout}><Link>Logout</Link></li>
                                                </> :
                                                    <>
                                                        <li onClick={scrollToTop}><Link to='/login'>Login</Link></li>
                                                        <li onClick={scrollToTop}><Link to='/signup'>Signup</Link></li>
                                                    </>
                                            }

                                        </ul>
                                    </div>
                                }
                            </div>

                        </Col>

                    </Row>
                </Container>
            </div>

        </>
    )
}

export default TopHead