const express = require('express');
const router = express.Router();
const ProductSchema = require('../schema/productSchema');

router.get('/', async (req, res) => {
    try {
        const productData = await ProductSchema.find();
        if (productData) {
            res.render('home', { productData: productData });
        }
        else {
            res.status(500).send('There is an Error');
        }
    }
    catch (err) {
        res.status.send(err.message)
        console.log(err.message);
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const findProductData = await ProductSchema.findById(req.params.id)
        if (findProductData) {
            res.render('singleProduct', { findProductData: findProductData })
        }
        else {
            res.redirect('/')
        }
    } catch (err) {
        res.send(err);
        console.log(err.message);
    }
})

module.exports = router;