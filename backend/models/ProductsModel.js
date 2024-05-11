const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecom');
const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    discountPercentage: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    variant: {
        type: String,
    },
    brand: {
        type: String,
    },
    images: [
        { type: String }
    ],
    reviews: [{
        reviewUserId: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        review: {
            type: String,
            required: true
        }
    }]
});
module.exports = mongoose.model("Product", productSchema)
