const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registration = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
    }
}, { timestamps: true })

registration.pre('save', async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10)
        }
        next();
    } catch (err) {
        console.log(err.message);
    }
})

const RegistrationSchema = new mongoose.model('user', registration);
module.exports = RegistrationSchema;