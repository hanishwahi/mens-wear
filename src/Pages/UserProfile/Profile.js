import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
function Profile() {
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [userInfo, setUserInfo] = useState([])

    const params = useParams()
    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch(`http://localhost:5000/api/user/${params.id}`)
            response = await response.json()
            setUserInfo(response)
        }
        fetchUser()
    }, [params])
    const handleEdit = () => {
        setEdit(true)
        setName(userInfo.name)
        setEmail(userInfo.email)
        setPhone(userInfo.phone)
        setAddress(userInfo.address)
    }
    return (
        <>
            <Header />
            {
                userInfo &&
                <Container fluid="xl">
                    <div className="profile">
                        <div className='text-end'><i onClick={handleEdit} class="fa-solid fa-pen-to-square"></i></div>
                        <h3><span>Name</span>: {userInfo.name}</h3>
                        <h3><span>Phone</span>: {userInfo.phone}</h3>
                        <h3><span>Email</span>: {userInfo.email}</h3>
                        <h3><span>Address</span>: {userInfo.address}</h3>
                    </div>
                    {
                        edit &&
                        <div className="profile-edit-section">
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name='name' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="number" name='phone' value={phone} placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg='4'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="email" name='email' placeholder='password' onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="email" name='email' placeholder='Confirm password' onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as="textarea" rows={3} name='address' value={address} placeholder='address' onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <button className='checkout'>Update Profile</button>
                                </Row>
                            </Form>
                        </div>
                    }
                </Container>
            }
        </>
    )
}
export default Profile