const bcrypt = require('bcrypt');
const RegistrationSchema = require('../schema/registrationSchema');

async function loginAuth(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const findUserEmail = await RegistrationSchema.findOne({ email: email });
        const matchPassword = await bcrypt.compare(password, findUserEmail.password);

        const token = await findUserEmail.generateAuthToken();
        // console.log('LogIn TOken', token);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 100000),
            httpOnly: true,
            secure: true,
        });

        if (matchPassword === true) {
            res.redirect('/');
        }
        else {
            res.send('Invalid Login Details');
        }
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
    next();
}
module.exports = { loginAuth }