const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

//DB config
const db = require('./config/keys');

//Connect to MySQL
const connection = mysql.createConnection(db);
connection.connect((err) => {
    if (err) throw err;
    console.log('You are connected...');
})

//Express session middleware
app.use(session({
    secret: 'apoucla',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
}));

//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Imported Routes
const login = require('./routes/api/login');
app.use('/login', login);

const logout = require('./routes/api/logout');
app.use('/logout', logout);

const event = require('./routes/api/event/show');
app.use('/event', event);

const eventSignUp = require('./routes/api/event/signup');
app.use('/event', eventSignUp);

//Routes
app.get('/', function (req, res) {
    console.log(req.session);
    res.send('hello world');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));