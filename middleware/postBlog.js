const multer = require('multer');
const ProductSchema = require('../schema/productSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    }
});


async function DD(req, res, next) {

    try {
        const productPost = await new ProductSchema({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename,
        })
        const productSave = await productPost.save();
        res.status(201).redirect('/')
    }
    catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
    next();
}
module.exports = upload;