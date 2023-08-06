const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://admin:1234@cluster0.41ghuvo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null

const RegisterController = require('./controllers/registerController')
const loginController = require('./controllers/loginController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController'); 
const accountController = require('./controllers/accountController');
const logoutController = require('./controllers/logoutController');
const loginPageController = require('./controllers/loginPageController');
const logoutData = require('./controllers/logoutData');

const generalRouter = require('./routers/router');


const port = 7000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession({
    secret: "node secret"
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
});
app.set('view engine', 'ejs');


app.use('/wifi.ss' , generalRouter);


app.get('/wifi.ss/register', RegisterController)
app.get('/wifi.ss/login', loginController);
app.get('/wifi.ss/status', accountController)
app.get('/wifi.ss/logout', logoutData)
app.post('/users/register',  storeUserController);
app.post('/user/login' , loginUserController);
app.post('/users/login', loginPageController)
app.post('/users/logout', logoutController)

app.listen(port, () => {
    console.log(`WedSite is Running on http://localhost:${port}`)
});