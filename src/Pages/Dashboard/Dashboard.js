import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        variant: '',
        description: '',
        category: '',
        discountPercentage: '',
        rating: '',
        brand: '',
        images: ''
    });

    const [error, setError] = useState(false)
    const handleChange = (e) => {
        let { name, value } = e.target;
        let lowerCaseValue = value.toLowerCase()
        setFormData({ ...formData, [name]: lowerCaseValue });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, price, variant, description, category, discountPercentage, rating, brand, images } = formData
        if (!title || !price || !variant || !description || !category || !discountPercentage || !rating || !brand || !images) {
            setError(true)
        }
        else {
            try {
                const response = await fetch('http://localhost:5000/api/addProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        formData
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Product added successfully');
                    setFormData({
                        title: '',
                        price: '',
                        description: '',
                        category: '',
                        discountPercentage: '',
                        rating: '',
                        brand: '',
                        images: ''
                    });
                } else {
                    throw new Error(data.message || 'Failed to add product');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(error.message || 'Failed to add product');
            }
        }
    };
    return (
        <>

            <Container>
                {/* <form className="product-form" onSubmit={handleSubmit}>
                    <div className="d-flex gap-2">
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
                        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />

                        <input type="number" name="discountPercentage" placeholder="Discount Percentage" value={formData.discountPercentage} onChange={handleChange} />
                    </div>
                     <div className="d-flex gap-2 mb-3">
                        <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} />
                        <input type="text" name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} />
                        <textarea type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} cols="80" rows="2"></textarea>
                    </div>
                    <button type="submit">Add Product</button>
                </form> */}
            </Container >
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Row className='row-gap-3 form-span'>
                            <Col lg="3">
                                <Form.Control type="text" name="title" placeholder="Product Title" value={formData.title} onChange={handleChange} />
                                {error && !formData.title && < span> fill the title</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="text" name="category" placeholder="Category:boys " value={formData.category} onChange={handleChange} />
                                {error && !formData.category && < span> fill the category</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
                                {error && !formData.brand && < span> fill the brand</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="text" name="variant" placeholder="Variant:shirt" value={formData.variant} onChange={handleChange} />
                                {error && !formData.variant && < span> fill the variant</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
                                {error && !formData.price && < span> fill the price</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="number" name="discountPercentage" placeholder="Discount Percentage" value={formData.discountPercentage} onChange={handleChange} />
                                {error && !formData.discountPercentage && < span> fill the discountPercentage</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} />
                                {error && !formData.rating && < span> fill the rating</span>}
                            </Col>
                            <Col lg="3">
                                <Form.Control type="text" name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} />
                                {error && !formData.images && < span> fill the images</span>}

                            </Col>
                            <Col lg="12">
                                <Form.Control as="textarea" rows={3} name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                                {error && !formData.description && < span> fill the description</span>}

                            </Col>
                            <Col >
                                <Form.Control type="submit" value='submit' />
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group> */}
                </Form>
            </Container >
        </>
    );
}
export default Dashboard;
