const express = require('express');
const app = express();
require('./DB/db');


const HomeRouter = require('./routes/homeRouter');
const AddProduct = require('./routes/addProduct')
const AdminRouter = require('./routes/adminRouter');
const RegistrationRouter = require('./routes/registration');
const LoginRouter = require('./routes/login');

const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');

app.use('/', HomeRouter);
app.use('/addproduct', AddProduct);
app.use('/admin', AdminRouter);
app.use('/signup', RegistrationRouter);
app.use('/login', LoginRouter);

app.listen(PORT, () => {
    console.log(`Your server is running at ${PORT}`)
});