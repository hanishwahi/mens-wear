import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Images/logo-main.png'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import MobileNav from './Header/MobileNav'
import { CartIcon } from '../icons'

function Navbar() {
  const [searchData, setSearchData] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  const navigate = useNavigate()

  function handleSelect(selectedOption) {
    setSelectedOption(selectedOption)
    if (selectedOption) {
      navigate(`/mens/${selectedOption.label}/${selectedOption.id}`)
    }
  }
  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((resp) => resp.json())
      .then((result) => {
        setSearchData(result.productlist)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const options = searchData.map((item) => ({
    id: item._id,
    label: item.title,
    value: item._id
  }))

  const item = useSelector((state) => state.cart)

  return (
    <>
      <div className="py-2 border-bottom bg-white">
        <Container fluid="xl">
          <Row className='align-items-center'>
            <Col lg='2' md='2' sm='3' xs='6'>
              <Link to='/'><img src={Logo} alt="" width={110} /></Link>
            </Col>
            <Col lg='5' md='7' sm='2' className='nav-hide'>
              <div className="navbar-list">
                <Link onClick={scrollToHome} to='/'>Home</Link>
                <Link onClick={scrollToHome} to='/men/shirt'>Shirt's</Link>
                <Link onClick={scrollToHome} to='/men/tshirt'>T-Shirt</Link>
                <Link onClick={scrollToHome} to='/men/jeans'>Jeans</Link>
              </div>
            </Col>
            <Col lg='4' md='7' sm='6' xs='12' className='nav-search order-2 order-sm-0 mt-2 mt-sm-0'>
              <form style={{ width: "100%" }}>
                <Select
                  options={options}
                  placeholder="Search products.."
                  className="w-100"
                  value={selectedOption}
                  onChange={handleSelect}
                />
              </form>
            </Col>
            <Col lg='1' md='2' sm='2' xs='5' className='text-end cart-wishlist'>
              <Link to='/cart' className='text-decoration-none'>
                <div className='d-flex align-items-center justify-content-end'>
                  <CartIcon color={item.length > 0 && '#35677a'} />
                  <p>{item.length > 0 && `(${item.length})`}</p>
                </div>
              </Link>
            </Col>
            <Col lg='12' md='1' sm='1' xs='1' className='hide-hamburger d-flex justify-content-end'>
              <div className="hamburger hide-hamburger">
                <i className="fa-solid fa-bars" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
              </div>

              <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                  <Col lg='2' md='2' sm='3' xs='6'>
                    <Link to='/'><img src={Logo} alt="" width={110} /></Link>
                  </Col>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <MobileNav />
                </div >
              </div >
            </Col >
          </Row >
        </Container >
      </div >

    </>
  )
}

export default Navbar
