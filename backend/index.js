const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./routes/User')
const productRouter = require('./routes/Product')
const reviewRouter = require('./routes/Review')
const pincodeRouter = require('./routes/Pincode')

const cookieParser = require('cookie-parser')
app.use(cors())
const port = 5000
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('hello world')
})

//user credential router middleware
app.use('/api/user', userRouter)

// product router middleware 
app.use('/api/product', productRouter)

// review router middleware 
app.use('/api/review', reviewRouter)

// pincode router middleware 
app.use('/api/pincode', pincodeRouter)


app.listen(port, () => {
    console.log(`server connected on port ${port}`);
})