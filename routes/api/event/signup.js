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

//Inserting a new participant into an event
const signUp = function(user_id, shift_id, signup_order, signup_driving, signup_chair, signup_ride, signup_custom1, signup_custom2, signup_custom3, signup_custom4, signup_custom5, signup_time) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO signup (user_id, shift_id, signup_order, signup_driving, signup_chair, signup_ride, signup_custom1, signup_custom2, signup_custom3, signup_custom4, signup_custom5, signup_time) VALUES ('${user_id}', '${shift_id}', '${signup_order}', '${signup_driving}', '${signup_chair}', '${signup_ride}', '${signup_custom1}', '${signup_custom2}', '${signup_custom3}', '${signup_custom4}', '${signup_custom5}', '${signup_time}')`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Find the highest number of the signup order
const lastSignup = function(shiftID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT MAX(signup_order) FROM signup WHERE shift_id = '${shiftID}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
};

//Deleting a participant from an event
const unSignUp = function(user_id, shift_id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM signup WHERE user_id = '${user_id}' AND shift_id = '${shift_id}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Editing signup info
const editSignUp = function(user_id, shift_id, signup_driving, signup_chair, signup_ride, signup_custom1, signup_custom2, signup_custom3, signup_custom4, signup_custom5) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE signup SET signup_driving = '${signup_driving}', signup_chair = '${signup_chair}', signup_ride = '${signup_ride}', signup_custom1 = '${signup_custom1}', signup_custom2 = '${signup_custom2}', signup_custom3 = '${signup_custom3}', signup_custom4 = '${signup_custom4}', signup_custom5 = '${signup_custom5}' WHERE user_id = '${user_id}' AND shift_id = '${shift_id}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Editing signup info without editing chair
const editSignUpNoChair = function(user_id, shift_id, signup_driving, signup_ride, signup_custom1, signup_custom2, signup_custom3, signup_custom4, signup_custom5) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE signup SET signup_driving = '${signup_driving}', signup_ride = '${signup_ride}', signup_custom1 = '${signup_custom1}', signup_custom2 = '${signup_custom2}', signup_custom3 = '${signup_custom3}', signup_custom4 = '${signup_custom4}', signup_custom5 = '${signup_custom5}' WHERE user_id = '${user_id}' AND shift_id = '${shift_id}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Middleware

//POST
//Signs up for an event
//Only logged in
router.post('/:eventID/:shiftID', async (req, res, next) => {
    if (req.session.userStatus == "Active" || req.session.userStatus == "Pledge" || req.session.userStatus == "Associate" || req.session.userStatus == "Alumni") {
        let shiftID = await req.params.shiftID;
        let signUpOrder = await lastSignup(shiftID);
        signUpOrder = await signUpOrder[0]["MAX(signup_order)"];
        signUpOrder = signUpOrder + 1;
        let signUpTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await signUp(req.session.userID, shiftID, signUpOrder, req.body.driving, req.body.chair, req.body.ride, req.body.signup_custom1, req.body.signup_custom2, req.body.signup_custom3, req.body.signup_custom4, req.body.signup_custom5, signUpTime);
        res.send('Signed up!');
    } else {
        next();
    }
});

//POST
//Admin signs up for an event
//Only EXCOMM
router.post('/:eventID/:shiftID', async (req, res, next) => {
    if (req.session.userStatus == "Administrator") {
        let shiftID = await req.params.shiftID;
        let signUpOrder = await lastSignup(shiftID);
        signUpOrder = await signUpOrder[0]["MIN(signup_order)"];
        signUpOrder = await signUpOrder - 1;
        let signUpTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await signUp(req.body.userID, shiftID, signUpOrder, req.body.driving, req.body.chair, req.body.ride, req.body.signup_custom1, req.body.signup_custom2, req.body.signup_custom3, req.body.signup_custom4, req.body.signup_custom5, signUpTime);
        res.send('Signed up!');
    } else {
        res.send('Sorry, you must be logged in to access.');
    }
});

//DELETE
//Removes someone from an event
//Only logged in
router.delete('/:eventID/:shiftID', async (req, res, next) => {
    if (req.session.userStatus == "Active" || req.session.userStatus == "Pledge" || req.session.userStatus == "Associate" || req.session.userStatus == "Alumni") {
        let shiftID = await req.params.shiftID;
        await unSignUp(req.session.userID, shiftID);
        res.send('Off the list!');
    } else {
        next();
    }
});

//DELETE
//Admin removes someone from an event
//Only EXCOMM
router.delete('/:eventID/:shiftID', async (req, res, next) => {
    if (req.session.userStatus == "Administrator") {
        let shiftID = await req.params.shiftID;
        await unSignUp(req.body.userID, shiftID);
        res.send('Off the list!');
    } else {
        res.send('Sorry, you must be logged in to access.');
    }
});

//PUT
//Edit signup info
//Only logged in
router.post('/:eventID/:shiftID', async (req, res, next) => {
    if (req.session.userStatus == "Active" || req.session.userStatus == "Pledge" || req.session.userStatus == "Associate" || req.session.userStatus == "Alumni") {
        //need to add case for not changing chair
        let shiftID = await req.params.shiftID;
        await editSignUp(req.session.userID, shiftID, req.body.signup_driving, req.body.signup_chair, req.body.signup_ride, req.body.signup_custom1, req.body.signup_custom2, req.body.signup_custom3, req.body.signup_custom4, req.body.signup_custom5);
        res.send('Changes saved!');
    } else {
        res.send('Sorry, you must be logged in to access.');
    }
});

module.exports = router;