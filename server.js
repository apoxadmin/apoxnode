const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

//Bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys');

//Connect to MySQL

const connection = mysql.createConnection(db);
connection.connect((err) => {
    if (err) throw err;
    console.log('You are connected...');
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));