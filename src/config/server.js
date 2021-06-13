const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../app/views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

dotenv.config({path: path.join(__dirname, '../env/.env')})

app.use('/resources', express.static(path.join(__dirname, '../public')));



module.exports = app;