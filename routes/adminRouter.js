const express = require('express');
const router = express.Router();
const ProductSchema = require('../schema/productSchema');
router.get('/', (req, res) => {
    res.render('admin')
})
router.get('edit/', (req, res) => {
    res.render('edit')
})

router.get('/managedata', async (req, res) => {
    try {
        const findAdminData = await ProductSchema.find();
        if (findAdminData) {
            res.render('showAdminData', { findAdminData: findAdminData });
        } else {
            res.status(500).send('There is an Error');
        }
    }
    catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        let getEditData = await ProductSchema.findById({ _id: req.params.id });

        res.render('edit', { getEditData: getEditData })
    }
    catch (err) {
        console.log(err.message)
        res.send(err.message)
    }

});


router.post('/edits/:id', async (req, res) => {
    console.log('postData', req.params.id)
    console.log('BODY', req.body)
    try {
        await ProductSchema.updateOne({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            }
        });
        res.redirect('/');
    }
    catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
})
router.post('/delete/:id', async (req, res) => {
    try {
        await ProductSchema.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

module.exports = router;