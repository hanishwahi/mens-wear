const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecom');
const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("Customer data", CustomerSchema)
