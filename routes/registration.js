const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const registrationSchema = require('../schema/registrationSchema');



router.get('/', (req, res) => {
    res.render('registration');
})
router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/signUpPostData', async (req, res) => {
    try {
        const postUserData = await new registrationSchema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const token = await postUserData.generateAuthToken();
        // console.log('Registration_Token', token)

        res.cookie('cookies', token, {
            expires: new Date(Date.now() + 5000),
            httpOnly: true,
        })


        const saveSignUpData = await postUserData.save()
        res.redirect('/login');

    } catch (err) {
        res.send(err.message);
        console.log(err.message)
    }
});

// router.post('/post', async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const findUserEmail = await registrationSchema.findOne({ email: email });
//         const matchPassword = await bcrypt.compare(password, findUserEmail.password);

//         const token = await findUserEmail.generateAuthToken();
//         console.log('LogIn_Token', token)

//         if (matchPassword === true) {
//             res.redirect('/');
//         }
//         else {
//             res.send('Invalid Login Details');
//         }
//     }
//     catch (err) {
//         res.status(400).send(err.message);
//         console.log(err.message);
//     }
// })

module.exports = router;



module.exports = router;