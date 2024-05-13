import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

function ProductDescription({ description, prductID }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(4.5);
    const [allFetchedReview, setAllFetchedReview] = useState([]);
    const [filterReview, setFilterReview] = useState([]);
    const [editReview, setEditReview] = useState(false);
    const ratingChanged = newRating => {
        if (newRating) {
            setRating(newRating);
        }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user && user._id;

    const Navigate = useNavigate();
    // add review
    const handleSubmitReview = async () => {
        console.log(review, rating);
        if (user) {
            let response = await fetch("http://localhost:5000/api/addReview", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review,
                    rating,
                    prductID,
                    userID,
                }),
            });
            const data = await response.json();
            if (data.success === true) {
                setReview(" ");
                setRating(4.5);
                fetchReview();
            }
        } else {
            Navigate("/login");
        }
    };

    // fetch review
    async function fetchReview() {
        let response = await fetch(
            `http://localhost:5000/api/fetchReview/${prductID}`
        );
        response = await response.json();
        setAllFetchedReview(response.fetchedReview);
        const filteredReview = response.fetchedReview.filter(
            item => item.reviewUserId === userID
        );
        setFilterReview(filteredReview);
    }

    useEffect(() => {
        fetchReview();
    });

    const handleEditReview = async ({ review, rating }) => {
        setEditReview(true);
        setReview(review);
        setRating(rating);
    };

    const handleUpdateReview = async id => {
        try {
            let response = await fetch("http://localhost:5000/api/updateReview", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review,
                    rating,
                    prductID,
                    id,
                }),
            });
            response = await response.json();
            if (response) {
                setEditReview(false);
                fetchReview();
            }

        } catch (error) { }
    };

    return (
        <>
            <Container>
                <Tabs
                    defaultActiveKey="Description"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="Description" title="Description">
                        <p>{description && description.split('.')}</p>
                    </Tab>
                    <Tab eventKey="Review" title="Review">
                        {filterReview.length > 0 ? (
                            <div>
                                {filterReview.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="d-flex gap-2 align-items-center">
                                                <p className="mb-0">
                                                    <strong>{item.review}</strong>
                                                </p>
                                                <p className="mb-0">
                                                    <strong>{item.rating}</strong>
                                                </p>
                                                <i
                                                    onClick={() =>
                                                        handleEditReview({
                                                            review: item.review,
                                                            rating: item.rating,
                                                        })
                                                    }
                                                    class="fa-solid fa-pen-to-square"
                                                ></i>
                                            </div>
                                            <div>
                                                {editReview && (
                                                    <>
                                                        <div className="d-flex gap-3">
                                                            <textarea
                                                                name=""
                                                                id=""
                                                                cols="50"
                                                                rows="3"
                                                                value={review}
                                                                placeholder="update review"
                                                                onChange={e => setReview(e.target.value)}
                                                            ></textarea>
                                                            <ReactStars
                                                                count={5}
                                                                onChange={ratingChanged}
                                                                size={24}
                                                                isHalf={true}
                                                                emptyIcon={<i className="far fa-star"></i>}
                                                                halfIcon={
                                                                    <i className="fa fa-star-half-alt"></i>
                                                                }
                                                                fullIcon={<i className="fa fa-star"></i>}
                                                                activeColor="#ffd700"
                                                                value={rating}
                                                            />
                                                            <button
                                                                style={{ height: "40px", width: "100px" }}
                                                                className="checkout"
                                                                onClick={() => handleUpdateReview(item._id)}
                                                            >
                                                                Update
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        ) : (
                            <Row>
                                {user && <>
                                    <Col>
                                        <p>Write a Review</p>
                                        <textarea
                                            name=""
                                            id=""
                                            cols="50"
                                            rows="3"
                                            value={review}
                                            placeholder="write a review"
                                            onChange={e => setReview(e.target.value)}
                                        ></textarea>
                                    </Col>
                                    <Col>
                                        <p className="mb-0">Rating</p>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={24}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                            value={rating}
                                        />
                                        <button className="checkout" onClick={handleSubmitReview}>
                                            Submit review
                                        </button>
                                    </Col>
                                </>}
                            </Row>
                        )}
                        <Row>
                            {allFetchedReview &&
                                allFetchedReview.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="border-bottom py-2">
                                                <p>All Reviews ⭐</p>
                                                <p className="mb-0">
                                                    {index + 1}. {item.review}
                                                </p>
                                                <div className="d-flex align-items-center gap-2">
                                                    {Array.from({ length: item.rating }, (_, i) => (
                                                        <i key={i} className="fas fa-star text-warning"></i>
                                                    ))}
                                                    <p className="mb-0">{item.rating}</p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
export default ProductDescription;
