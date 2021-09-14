const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Product-App')
    .then(() => console.log('Your Connection is Established'))
    .catch((err) => console.log(err))