import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function AllProducts() {
    const [data, setData] = useState([])

    async function fetchData() {
        await fetch('http://localhost:5000/api/product/allProducts').then((resp) => {
            resp.json().then((result) => {
                setData(result.productlist) 
            })
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        try {
            let response = await fetch(`http://localhost:5000/api/product/deleteProduct/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            let data = await response.json()
            if (data.success) {
                fetchData()

            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Container fluid="xl">
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Img</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {
                        data.length > 0 && data.map((item, index) => {
                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.discountPercentage}</td>
                                            <td>
                                                <img src={item.images[0]} alt="" width={50} />
                                            </td>
                                            <td>
                                                <button>edit</button>
                                                <button onClick={() => handleDelete(item._id)}>delete</button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </>

                            )
                        })
                    }

                </Table>
            </Container>
        </>

    )
}

export default AllProducts