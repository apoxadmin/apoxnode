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
        connection.query(`SELECT event.* FROM event WHERE event_id = '${eventID}'`, (err, result) => {
            if (err ||  result[0].length == 0) reject (err);
            else resolve(result);
        });
    });
};

//Match shifts up with events
const matchShift = function(eventID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT shift.* FROM shift WHERE event_id = '${eventID}'`, (err, result) => {
            if (err ||  result[0].length == 0) reject (err);
            else resolve(result);
        });
    });
};

//Show list of people signed up 
const signupList = function(shiftID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT signup.* FROM signup WHERE shift_id = '${shiftID}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
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

//POST
//Signs up for an event
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
        console.log(shift);
        console.log(comments);
        console.log(signedUp);
        res.send(result);
    } else {
        res.send('Sorry, you must be logged in to access.');
    }
});

//POST
//Admin signs up for an event
//Only Admin

//DELETE
//Removes someone from an event
//Only logged in

//DELETE
//Admin removes someone from an event
//Only Admin

module.exports = router;