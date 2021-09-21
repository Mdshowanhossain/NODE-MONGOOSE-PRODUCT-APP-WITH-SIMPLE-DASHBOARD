const ProductSchema = require('../schema/productSchema');

async function allBlog(req, res, next) {
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
    next();
}

async function specificBlog(req, res, next) {
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
    next();
}

module.exports = { allBlog, specificBlog };
