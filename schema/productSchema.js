const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },

    slug: { type: String, slug: ["title"], unique: true },

}, { timestamps: true })



const ProductModel = new mongoose.model('product', ProductSchema);
module.exports = ProductModel;

