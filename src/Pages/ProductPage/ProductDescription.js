import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AllReviews from "./AllReviews";
import RatingForm from "./RatingForm";

function ProductDescription({ description, prductID }) {
    const [allFetchedReview, setAllFetchedReview] = useState([]);
    // fetch review
    async function fetchReview() {
        let response = await fetch(
            `http://localhost:5000/api/review/fetchReview/${prductID}`
        );
        response = await response.json();
        setAllFetchedReview(response.fetchedReview);
    }

    useEffect(() => {
        fetchReview();
    });


    return (
        <>
            <Container>
                <Tabs defaultActiveKey="Description" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Description" title="Description">
                        <p>{description && description.split('.')}</p>
                    </Tab>
                    <Tab eventKey="Review" title="Review">
                        <RatingForm prductID={prductID} />
                        <Row>
                            {allFetchedReview &&
                                allFetchedReview.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <AllReviews prductID={prductID} item={item} index={index} />
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
