const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('./DB/db');
require('dotenv').config();



const HomeRouter = require('./routes/homeRouter');
const AddProduct = require('./routes/addProduct')
const AdminRouter = require('./routes/adminRouter');
const RegistrationRouter = require('./routes/registration');
const LoginRouter = require('./routes/login');

const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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