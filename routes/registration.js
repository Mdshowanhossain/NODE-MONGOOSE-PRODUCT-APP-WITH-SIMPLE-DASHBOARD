const express = require('express');
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
        })
        const saveSignUpData = await postUserData.save()
        res.redirect('/login');

    } catch (err) {
        res.send(err.message);
        console.log(err.message)
    }
});

module.exports = router;