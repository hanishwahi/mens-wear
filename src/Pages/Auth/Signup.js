import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [validationErr, setValidationError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, phone, password, address
                })
            })
            response = await response.json();
            console.log(response);
            if (response.success) {
                setName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setAddress("");
                setValidationError('')
            }
            else if (response.err) {
                setValidationError('user already exist')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Header />
            <Container>
                <div className="signup-form">
                    <h2>Signup</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" name='name' value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="tel" name='phone' value={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value.trim())} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" name='email' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" name='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value.trim())} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" name='address' rows={3} value={address} placeholder='H No. #00 ' onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <p style={{ color: 'red' }}>{validationErr && validationErr}</p>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="submit" />
                        </Form.Group>
                        <Link to='/login'>Already have account? Login</Link>
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    )
}
export default Signup