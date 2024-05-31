import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../Components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../Components/Footer'
import ProductComp from './ProductComp'

function CategoryClothes() {
    const [categorizedProduct, setCategorizedProduct] = useState([])
    const param = useParams()
    const category = param.category
    console.log(category);
    useEffect(() => {
        async function fetchProduct() {
            try {
                let response = await fetch(`http://localhost:5000/api/product/categoryProduct/${category}`);
                response = await response.json();
                setCategorizedProduct(response.categorized)

            } catch (error) {
                console.log(error);
            }
        }
        fetchProduct();
    }, [category]);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <Header />
            <Container>
                <Row className='my-4'>
                    {
                        categorizedProduct && categorizedProduct.map((item) => {
                            return (
                                <>
                                    <Col lg="3" key={item.id} className="mb-3 border-0">
                                        <Link to={`/mens/${item.title}/${item._id}`}
                                            onClick={scrollTop} className='text-decoration-none'>
                                            <ProductComp item={item} />
                                        </Link>
                                    </Col>
                                </>
                            )
                        })
                    }
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default CategoryClothes