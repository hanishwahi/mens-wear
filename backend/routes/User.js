const express = require('express')
const router = express.Router()
const CustomerModel = require('../models/CustomerSignup')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// signup form
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
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

// for profile page 
router.get('/:id', async (req, res) => {
    const userInfo = await CustomerModel.findOne({
        _id: req.params.id
    })
    res.send(userInfo)
})

module.exports= router