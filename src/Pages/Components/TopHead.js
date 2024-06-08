import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { LorryTruckIcon, ProfileIcon, ReturnPolicyIcon, TruckIcon } from '../icons'
import ProfileButton from './Profile-Button'

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
                                <div className="col-4"><p> <TruckIcon /> Free Shipping</p></div>
                                <div className="col-4"><p><LorryTruckIcon /> Cash on Delivery</p></div>
                                <div className="col-4"><p><ReturnPolicyIcon /> Return Policy</p></div>
                            </div>
                        </Col>
                        <Col lg='6' md='4' sm='12' xs='12' className='text-end'>
                            <div className="login-signup">
                                <ProfileIcon color="#fff" /> <Link
                                    onClick={() => setShowSignup(!showSignup)}>{token ? user.name.toUpperCase() : `Guest User`}</Link>
                                {
                                    showSignup && <div className="bg-white Top-nav-menu">
                                        <ul>
                                            {
                                                token ? <>
                                                    <li onClick={scrollToTop}>
                                                        <ProfileButton url={user && `/profile/${user.name}/${user.id}`} name="Profile" />
                                                    </li>
                                                    <li onClick={() => { }}>
                                                        <ProfileButton name="My Order" />
                                                    </li>
                                                    <li onClick={handleLogout}>
                                                        <ProfileButton name="Logout" />
                                                    </li>
                                                </> :
                                                    <>
                                                        <li onClick={scrollToTop}>
                                                            <ProfileButton url='/login' name="Login" />
                                                        </li>
                                                        <li onClick={scrollToTop}>
                                                            <ProfileButton url='/signup' name="Signup" />
                                                        </li>
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