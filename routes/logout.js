const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const RegistrationSchema = require('../schema/registrationSchema');
const auth = require('../middleware/auth');



// router.get('/logout', (req, res) => {
//     res.render('logout');
// })

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




        // await req.RegistrationSchema.save();
        // res.render('registration');

        // // const token = req.cookies.jwt;
        // // const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
        // // console.log(verifyUser);

        // // const user = await RegistrationSchema.findOne({ _id: verifyUser._id });
        // // console.log(user.firstName);

    } catch (err) {
        res.send(err.message);
        console.log(err.message);
    }


})

module.exports = router;