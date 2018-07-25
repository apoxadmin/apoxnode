const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

//Middleware

//GET
//Public
router.get('/', function (req, res, next) {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return next(err);
            } else {
                return res.redirect('../');
            }
        });
    }
});

module.exports = router;