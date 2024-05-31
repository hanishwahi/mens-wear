import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })
            response = await response.json();
            console.log(response);
            if (response.success) {
                localStorage.setItem('Token', JSON.stringify(response.token))
                localStorage.setItem('user', JSON.stringify(response.user))
                setEmail("");
                setPassword("");
                Navigate('/')
            }
            else {
                setError(response.err)
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
                    <h2>Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" name='email' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        {error && <span style={{ fontSize: "14px" }}>{error}</span>}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="submit" />
                        </Form.Group>
                        <Link to='/signup'>Don't have account? signup</Link>
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    )
}
export default Login