const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    tokens: [{
        token: {
            type: String,
            require: true,
        }
    }]
}, { timestamps: true })


registration.methods.generateAuthToken = async function (next) {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }


    next();
}





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