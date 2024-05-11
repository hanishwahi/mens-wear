import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container } from 'react-bootstrap'
import ProductComp from './ProductComp';

function LatestProduct() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/products').then((resp) => {
            resp.json().then((result) => {
                setData(result.productlist)
            })
        })

    }, [])

    const latestP = data.slice(-8)
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <>

            <Container fluid='xl'>
                <div className='latest-product-main'>
                    <div className="latest-product-heading">
                        <h1>Latest Arrived</h1>
                    </div>
                    <div className="border-bottom">
                        <Carousel swipeable={false}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlay={false}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            // customTransition="all .5"
                            // transitionDuration={2000}
                            containerclassName="carousel-container"
                            dotListclassName="custom-dot-list-style"
                            itemclassName="carousel-item-padding-40-px">
                            {
                                latestP.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>

                                            <div className="mb-3 col-lg-11 col-11 border-0">
                                                <Link to={`/mens/${item.title}/${item._id}`}
                                                    onClick={scrollTop} className='text-decoration-none'>
                                                    <ProductComp item={item} />
                                                </Link>
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </div>
            </Container>

        </>
    )
}

export default LatestProduct