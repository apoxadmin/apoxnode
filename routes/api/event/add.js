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

//Creating a new event
const createEvent = function(event_name, event_date, event_enddate, eventtype_id, event_ic, event_fund, event_location, event_address, event_description, event_contact, event_custom1, event_custom2, event_custom3, event_custom4, event_custom5) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO event (event_name, event_date, event_enddate, eventtype_id, event_ic, event_fund, event_location, event_address, event_description, event_contact, event_custom1, event_custom2, event_custom3, event_custom4, event_custom5) VALUES ('${event_name}', '${event_date}', '${event_enddate}', '${eventtype_id}', '${event_ic}', '${event_fund}', '${event_location}', '${event_address}', '${event_description}', '${event_contact}', '${event_custom1}', '${event_custom2}', '${event_custom3}', '${event_custom4}', '${event_custom5}')`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Deleting an event
const deleteEvent = function(eventID) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM event WHERE event_id = '${eventID}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Updating an event
const updateEvent = function(eventID, event_name, event_date, event_enddate, eventtype_id, event_ic, event_fund, event_location, event_address, event_description, event_contact, event_custom1, event_custom2, event_custom3, event_custom4, event_custom5) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE event SET event_name = '${event_name}', event_date = '${event_date}', event_enddate = '${event_enddate}', eventtype_id =  '${eventtype_id}', event_ic = '${event_ic}', event_fund = '${event_fund}', event_location = '${event_location}', event_address = '${event_address}', event_description = '${event_description}', event_contact = '${event_contact}', event_custom1 = '${event_custom1}', event_custom2 = '${event_custom2}', event_custom3 = '${event_custom3}', event_custom4 = '${event_custom4}', event_custom5 = '${event_custom5}' WHERE event_id = '${eventID}'`, (err, result) => {
            if (err) reject (err);
            else resolve(result);
        });
    });
}

//Middleware

//POST
//Create event
//Only EXCOMM
router.post('/add', async (req, res, next) => {
    if (req.session.userStatus == "Administrator") {
        await createEvent(req.body.event_name, req.body.event_date, req.body.event_enddate, req.body.eventtype_id, req.body.event_ic, req.body.event_fund, req.body.event_location,  req.body.event_address, req.body.event_description, req.body.event_contact, req.body.event_custom1, req.body.event_custom2, req.body.event_custom3, req.body.event_custom4, req.body.event_custom5);
        res.send("Event added!");
    } else {
        res.send("Need to be EXCOMM member");
    }
});

//DELETE
//Delete event
//Only EXCOMM
router.delete('/delete/:eventID', async (req, res, next) => {
    if (req.session.userStatus == "Administrator") {
        await deleteEvent(req.params.eventID);
        res.send("Event deleted!");
    } else {
        res.send("Need to be EXCOMM member");
    }
});

//PUT
//Edit event
//Only EXCOMM
router.put('/edit/:eventID', async (req, res, next) => {
    if (req.session.userStatus == "Administrator") {
        await updateEvent(req.params.eventID, req.body.event_name, req.body.event_date, req.body.event_enddate, req.body.eventtype_id, req.body.event_ic, req.body.event_fund, req.body.event_location, req.body.event_address, req.body.event_description, req.body.event_contact, req.body.event_custom1, req.body.event_custom2, req.body.event_custom3, req.body.event_custom4, req.body.event_custom5);
        res.send("Event updated!");
    } else {
        res.send("Need to be EXCOMM member");
    }
});

module.exports = router;