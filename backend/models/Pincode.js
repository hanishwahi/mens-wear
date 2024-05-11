const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecom');
const pincodeSchema = mongoose.Schema({
    pincode: {
        type: String
    }
});
module.exports = mongoose.model("Pincode", pincodeSchema)
