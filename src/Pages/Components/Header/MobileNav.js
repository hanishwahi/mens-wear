import React from 'react'
import { Link } from 'react-router-dom'

function MobileNav() {
    return (
        <div className="navbar-list-menu">
            <Link to='/'><p>Home</p></Link>
            <Link to='/'><p>About</p></Link>
            <Link to='/products'><p>Products</p></Link>
            <Link to='/'><p>Gallery</p></Link>
            <Link to='/'><p>Contact</p></Link>
        </div>
    )
}

export default MobileNav