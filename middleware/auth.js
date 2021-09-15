const jwt = require('jsonwebtoken');
const RegistrationSchema = require('../schema/registrationSchema');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookies;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser)

        // const user = RegistrationSchema.findOne({ _id: verifyUser._id });
        // console.log(user);
        // next();
    } catch (err) {
        res.status(401).send(err);
        console.log(err.message);
    }
}
module.exports = auth