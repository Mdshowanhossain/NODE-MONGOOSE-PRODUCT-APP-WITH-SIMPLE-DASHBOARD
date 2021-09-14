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

    slug: { type: String, slug: ["title", "description"], unique: true },

    // slug: {
    //     type: String,
    //     slug: 'title',
    //     slug_padding_size: 2,
    //     unique: true
    // }
}, { timestamps: true })

// ProductSchema.pre("save", function (next) {
//     this.slug = this.title.split(" ").join("-");
//     next();
// });



const ProductModel = new mongoose.model('product', ProductSchema);
module.exports = ProductModel;

