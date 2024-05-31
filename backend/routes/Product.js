const express = require('express')
const router = express.Router()

const productsModel = require('../models/ProductsModel')

//add product
router.post('/addProduct', async (req, res) => {
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
router.get('/allProducts', async (req, res) => {
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
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const productlist = await productsModel.findOneAndDelete({
            _id: req.params.id
        })
        res.send({ success: true })
    } catch (error) {
        console.log(error);
    }
})

router.get('/categoryProduct/:category', async (req, res) => {
    try {
        const categorized = await productsModel.find({
            variant: req.params.category
        })
        res.send({ categorized, success: true })
    } catch (error) {
        res.send(error)
    }
})

module.exports= router