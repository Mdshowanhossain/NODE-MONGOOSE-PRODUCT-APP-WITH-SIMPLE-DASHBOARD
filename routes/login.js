const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loginAuth } = require('../middleware/login')

router.get('/', (req, res) => {
    res.render('login')
})
router.get('/secret', auth, (req, res) => {
    res.render('secret');

})

router.post('/post', loginAuth)

module.exports = router;