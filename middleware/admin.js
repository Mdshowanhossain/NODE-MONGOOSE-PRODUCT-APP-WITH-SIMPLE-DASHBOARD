const ProductSchema = require('../schema/productSchema');

async function showAdminRouterData(req, res, next) {
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
    next();
}

async function editAdminRouterData(req, res, next) {
    try {
        let getEditData = await ProductSchema.findById({ _id: req.params.id });

        res.render('edit', { getEditData: getEditData })
    }
    catch (err) {
        console.log(err.message)
        res.send(err.message)
    }
    next();
}

async function updateAdminRouterData(req, res, next) {
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
    next();
};

async function deleteAdminRouterData(req, res, next) {
    try {
        await ProductSchema.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
    next();
};

module.exports = { showAdminRouterData, editAdminRouterData, updateAdminRouterData, deleteAdminRouterData };