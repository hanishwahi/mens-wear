const express = require('express')
const router = express.Router()
const pincodeModel = require('../models/Pincode')

// fetch available pincode for delivery
router.get('/:key', async (req, res) => {
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

module.exports = router