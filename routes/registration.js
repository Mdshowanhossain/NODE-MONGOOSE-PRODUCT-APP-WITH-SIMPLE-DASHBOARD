const express = require('express');
const router = express.Router();
const registration = require('../middleware/registration');


router.get('/', (req, res) => {
    res.render('registration');
});

router.post('/signUpPostData', registration);

module.exports = router;


