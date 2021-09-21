const registrationSchema = require('../schema/registrationSchema');

async function registration(req, res, next) {
    try {
        const postUserData = await new registrationSchema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const token = await postUserData.generateAuthToken();
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 5000),
            httpOnly: true,
        })
        const saveSignUpData = await postUserData.save()
        res.redirect('/login');

    } catch (err) {
        res.send(err.message);
        console.log(err.message)
    }
    next();
};

module.exports = registration