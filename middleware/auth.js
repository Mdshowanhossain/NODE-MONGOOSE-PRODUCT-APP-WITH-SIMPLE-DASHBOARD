const jwt = require('jsonwebtoken');
const RegistrationSchema = require('../schema/registrationSchema');


const auth = async (req, res, next) => {
    try {
        const token = await req.cookies.jwt
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = await RegistrationSchema.findOne({ _id: verifyUser._id });
        console.log(user.name);

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.redirect('/login');
        console.log(err.message);
    }
}

module.exports = auth