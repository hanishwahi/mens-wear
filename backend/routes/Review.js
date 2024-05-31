const express = require('express')
const router = express.Router()
const productsModel = require('../models/ProductsModel')

//add review
router.put('/addReview', async (req, res) => {
    try {
        const productId = req.body.prductID;
        const userID = req.body.userID;
        const rating = req.body.rating;
        const reviewText = req.body.review;
        const productlist = await productsModel.findOneAndUpdate(
            { _id: productId },
            {
                $push: {
                    reviews: {
                        reviewUserId: userID,
                        rating: rating,
                        review: reviewText
                    }
                }
            },
            { new: true }
        )
        if (productlist) {
            res.send({ success: true });
        }
    } catch (error) {
        console.log(error);
    }
})
//update review
router.put('/updateReview', async (req, res) => {
    try {
        const productId = req.body.prductID;
        const reviewId = req.body.id;
        const rating = req.body.rating;
        const reviewText = req.body.review;
        // Find the product by ID and update the specific review within the reviews array
        const updatedProduct = await productsModel.findOneAndUpdate(
            { _id: productId, 'reviews._id': reviewId }, // Match product ID and review ID
            {
                $set: {
                    'reviews.$.rating': rating, // Update the rating of the matched review
                    'reviews.$.review': reviewText // Update the review text of the matched review
                }
            },
            { new: true } // Return the updated document
        );
        if (updatedProduct) {
            res.send({ success: true });
        }
    } catch (error) {
        console.log(error);
    }
})
// fetch product review
router.get('/fetchReview/:id', async (req, res) => {
    try {
        const fetchedReview = await productsModel.findOne(
            { _id: req.params.id }
        )
        if (fetchedReview) {
            res.send({ fetchedReview: fetchedReview.reviews, success: true });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router