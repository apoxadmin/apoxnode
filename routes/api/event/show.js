const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

//DB config
const db = require('../../../config/keys');
const crypt = require('../../../config/encrypt.js');

//MySQL functions
const connection = mysql.createConnection(db);

//Return object with info on event
const eventInfo = function(eventID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT event.*, eventtype_name FROM event JOIN eventtype ON event.eventtype_id = eventtype.eventtype_id WHERE event_id = '${eventID}'`, (err, result) => {
            if (err || !result[0]) reject (err);
            else resolve(result[0]);
        });
    });
};

//Match shifts up with events
const matchShift = function(eventID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT shift.* FROM shift WHERE event_id = '${eventID}'`, (err, result) => {
            if (err || !result[0]) reject (err);
            else resolve(result);
        });
    });
};

//Show list of people signed up 
const signupList = function(shiftID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT signup.*, user_name, user_email FROM signup JOIN user ON signup.user_id = user.user_id WHERE shift_id = '${shiftID}' ORDER by signup_order`, (err, result) => {
            if (err) reject (err);
            else resolve(result[0]);
        });
    });
};

//Show list of comments
const showComments = function(eventID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT eventcomment.* FROM eventcomment WHERE event_id = '${eventID}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
};

//Middleware

//GET
//Return info on an event
//Only logged in
router.get('/:eventID', async (req, res, next) => {
    if (req.session.userID) {
        let result = await eventInfo(req.params.eventID);
        let shift = await matchShift(req.params.eventID);
        let comments = await showComments(req.params.eventID);
        let signedUp = []
        for (let i = 0; i < shift.length; i++) {
            await signedUp.push(await signupList(shift[i].shift_id));
        };
        let allEventInfo = {
            event: result,
            shifts: shift,
            comments: comments,
            signUpList: signedUp
        };
        res.send(allEventInfo);
    } else {
        res.send('Sorry, you must be logged in to access.');
    }
});

module.exports = router;