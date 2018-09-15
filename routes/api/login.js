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
            else resolve({
                userID: result[0].user_id,
                userStatus: result[0].status_name
            });
        });
    });
};

//Middleware

//POST
//Authenticate username and password
//Public
router.post('/', async (req, res) => {
    let info = await authenticateUser(req.body.username, req.body.password).catch(() => null);
    req.session.userID = info.userID;
    req.session.userStatus = info.userStatus;
    res.send(req.session);
});

module.exports = router;