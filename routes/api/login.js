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
const accessInfo = function(username, password, callback) {
    connection.query(`SELECT user.*, status_name FROM user JOIN status ON user.status_id = status.status_id WHERE user_password = '${crypt(password)}' and user_name = '${username}'`, function(err, result) {
        if (err) return callback(err);
        return callback(null, result);
    });
};

//Middleware

//GET
//Public
router.get('/', function (req, res) {
    res.send('get');
});

//POST
//Authenticate username and password
//Public
router.post('/', function (req, res) {
    if (req.body.username && req.body.password) {
        console.log('sent');
        accessInfo(req.body.username, req.body.password, (err, result) => {
            if (err) throw err;
            else if (result.length == 0) {
                console.log('login failed');
                return null;
            } else {
                let user = result;
                console.log('login successful');
                req.session.userID = (user[0].user_id);
                console.log(req.session.userID);
            }
        })
        res.send('success');
    }
})

module.exports = router;