const express = require('express');
const router = express.Router();
const { allBlog, specificBlog } = require('../middleware/home');

router.get('/', allBlog);

router.get('/show/:id', specificBlog)

module.exports = router;