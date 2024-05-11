import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Images/logo-main.png'

function Footer() {
    return (
        <>
            <div className="container-fluid top-head-bg">
                <div className="container-xl">
                    <div className="row py-4">
                        <div className="col-lg-3">
                            <div>
                                <Link to='/'><img src={logo} alt="" width={140} style={{ filter: "invert(1)" }} /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div>
                                <h1 className='text-white h5'>Quick Links</h1>
                                <div className='footer-list'>
                                    <Link to='/'>Home</Link>
                                    <Link to='/'>Shirt</Link>
                                    <Link to='/'>T-Shirt</Link>
                                    <Link to='/'>Jeans</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div>
                                <h1 className='text-white h5'>Social</h1>
                                <div className='footer-list'>
                                    <Link to='/'>Facebook</Link>
                                    <Link to='/'>Instagram</Link>
                                    <Link to='/'>Whatsapp</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div>
                                <h1 className='text-white h5'>Connect Us</h1>
                                <div className='footer-list'>
                                    <div className='mb-2'>
                                        <input type="text" placeholder='Enter email' />
                                    </div>
                                    <button>Subscribe</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer