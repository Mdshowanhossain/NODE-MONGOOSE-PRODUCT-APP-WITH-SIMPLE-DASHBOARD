const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const RegistrationSchema = require('../schema/registrationSchema');
const auth = require('../middleware/auth');


router.get('/', (req, res) => {
    res.render('login')
})
router.get('/secret', auth, (req, res) => {
    res.render('secret');

})

router.post('/post', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const findUserEmail = await RegistrationSchema.findOne({ email: email });
        const matchPassword = await bcrypt.compare(password, findUserEmail.password);

        const token = await findUserEmail.generateAuthToken();
        // console.log('LogIn TOken', token);

        res.cookie('cookies', token, {
            expires: new Date(Date.now() + 1000),
            httpOnly: true,
        });

        // console.log('COOKIE PARSER', req.cookies.loginCookie)

        if (matchPassword === true) {
            res.redirect('/');
        }
        else {
            res.send('Invalid Login Details');
        }
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
})

module.exports = router;