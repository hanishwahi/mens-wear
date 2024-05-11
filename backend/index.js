const express = require('express')
const app = express()
const cors = require('cors')
const productsModel = require('./models/ProductsModel')
const pincodeModel = require('./models/Pincode')
const CustomerModel = require('./models/CustomerSignup')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
app.use(cors())
const port = 5000
app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send('hello world')
})
//add product
app.post('/api/addProduct', async (req, res) => {
    try {
        const { title, price, description, category, variant, discountPercentage, rating, brand, images } = req.body.formData; // Destructure title and price from req.body
        const productAdded = await productsModel.create({
            title,
            price,
            description,
            category,
            discountPercentage,
            rating,
            brand,
            variant,
            images
        });
        res.status(201).send({ productAdded, success: true }); // HTTP status 201 for successful resource creation
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: "Failed to add product" }); // Sending error response
    }
});
//fetch all the product
app.get('/api/products', async (req, res) => {
    try {
        const productlist = await productsModel.find()
        if (productlist) {
            res.send({ productlist, success: true })
        }
    } catch (error) {
        console.log(error);
    }
})
// delete product
app.delete('/api/deleteProduct/:id', async (req, res) => {
    try {
        const productlist = await productsModel.findOneAndDelete({
            _id: req.params.id
        })
        res.send({ success: true })
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/categoryProduct/:category', async (req, res) => {
    try {
        const categorized = await productsModel.find({
            variant: req.params.category
        })
        res.send({ categorized, success: true })
    } catch (error) {
        res.send(error)
    }
})
//add review
app.put('/api/addReview', async (req, res) => {
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
app.put('/api/updateReview', async (req, res) => {
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
app.get('/api/fetchReview/:id', async (req, res) => {
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
// fetch available pincode for delivery
app.get('/api/pincode/:key', async (req, res) => {
    try {
        const fetchPincode = await pincodeModel.findOne({
            pincode: req.params.key
        })
        if (fetchPincode) {
            res.send({ fetchPincode, success: true })
        }
        else {
            res.send({ success: false })
        }
    } catch (error) {
        res.send(error)
    }
})
// signup form
app.post('/api/register', async (req, res) => {
    const { name, email, phone, address } = req.body
    const user = await CustomerModel.findOne({
        email
    })
    if (user) {
        res.send({ err: 'user already exist' })
    }
    const salt = await bcrypt.genSalt(10)
    const secPwd = await bcrypt.hash(req.body.password, salt)
    try {
        const userSignup = await CustomerModel.create({
            name,
            email,
            password: secPwd,
            phone,
            address
        });
        res.status(201).send({ success: true });
    } catch (error) {
        res.send(error);
    }
});
// user login
app.post('/api/login', async (req, res) => {
    try {
        const userLogin = await CustomerModel.findOne({
            email: req.body.email,
        })
        if (!userLogin) {
            return res.send('Invalid email or password');
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userLogin.password)
        if (pwdCompare) {
            var token = jwt.sign({ email: userLogin.email, userid: userLogin._id }, 'thisisblogwebsite');
            res.cookie('token', token)
            let user = {
                name: userLogin.name,
                id: userLogin._id
            }
            res.send({ success: true, user, token })
        }
        else {
            return res.send({ err: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error);
    }
})
// userinfo
app.get('/api/user/:id', async (req, res) => {
    const userInfo = await CustomerModel.findOne({
        _id: req.params.id
    })
    res.send(userInfo)
})
app.listen(port, () => {
    console.log(`server connected on port ${port}`);
})