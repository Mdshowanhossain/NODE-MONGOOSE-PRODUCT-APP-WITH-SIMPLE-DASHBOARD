const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const RegistrationSchema = require('../schema/registrationSchema');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {

    try {
        // For single LogOut

        // req.user.tokens = req.user.tokens.filter((currentElement) => {
        //     return currentElement === req.token;
        // })

        // For All devices LogOut

        req.user.tokens = []

        res.clearCookie("jwt");

        console.log('LogOut Successfully');

        await req.user.save();
        res.render('registration');

    } catch (err) {
        res.send(err.message);
        console.log(err.message);
    }


})

module.exports = router;