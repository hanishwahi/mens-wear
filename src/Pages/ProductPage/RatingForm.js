import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"; 
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom"; 

function RatingForm({ prductID }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(4.5); 
    const [filterReview, setFilterReview] = useState([]);
    const [editReview, setEditReview] = useState(false);


    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user && user._id;

    const Navigate = useNavigate();
    // add review
    const handleSubmitReview = async () => {
        console.log(review, rating);
        if (user) {
            let response = await fetch("http://localhost:5000/api/review/addReview", {
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
            `http://localhost:5000/api/review/fetchReview/${prductID}`
        );
        response = await response.json(); 
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
            let response = await fetch("http://localhost:5000/api/review/updateReview", {
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
    const ratingChanged = newRating => {
        if (newRating) {
            setRating(newRating);
        }
    };

    return (
        <>


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
                                                <textarea name="" id="" cols="50" rows="3" value={review} placeholder="update review" onChange={e => setReview(e.target.value)} ></textarea>
                                                <ReactStars count={5} onChange={ratingChanged} size={24} isHalf={true} emptyIcon={<i className="far fa-star"></i>} halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" value={rating}/>
                                                <button style={{ height: "40px", width: "100px" }} className="checkout" onClick={() => handleUpdateReview(item._id)}>Update</button>
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
                            <textarea name="" id="" cols="50" rows="3" value={review} placeholder="write a review" onChange={e => setReview(e.target.value)} ></textarea>
                        </Col>
                        <Col>
                            <p className="mb-0">Rating</p>
                            <ReactStars count={5} onChange={ratingChanged} size={24} isHalf={true} emptyIcon={<i className="far fa-star"></i>} halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" value={rating}
                            />
                            <button className="checkout" onClick={handleSubmitReview}>
                                Submit review
                            </button>
                        </Col>
                    </>}
                </Row>
            )}



        </>
    );
}
export default RatingForm;
