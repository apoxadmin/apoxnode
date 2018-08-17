const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

//DB config
const db = require('../../config/keys');
const crypt = require('../../config/encrypt.js');

//MySQL functions
const connection = mysql.createConnection(db);

//Return object with info on user
const accessInfo = function(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT user.*, status_name FROM user JOIN status ON user.status_id = status.status_id WHERE user_password = '${crypt(password)}' and user_name = '${username}'`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const authenticateUser = function(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT user.*, status_name FROM user JOIN status ON user.status_id = status.status_id WHERE user_password = '${crypt(password)}' and user_name = '${username}'`, (err, result) => {
            if (err || result.length == 0) reject(err);
            else resolve(result[0].user_id);
        });
    });
};

//Middleware

//GET
//Public
router.get('/', function (req, res, next) {
    console.log(req.session);
    res.send('get');
});

//POST
//Authenticate username and password
//Public
router.post('/', async (req, res) => {
    req.session.userID = await authenticateUser(req.body.username, req.body.password).catch(() => null);
    res.send(req.session);
});

module.exports = router;