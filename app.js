var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const winston = require('winston');

var usersRouter = require('./routes/usersRouter');
var levelsRouter = require('./routes/levelsRouter');
const cors = require('cors');
const { handleError } = require('./helpers/errorHelper');
winston.add(new winston.transports.File({ filename: 'logs/errorLogs.log', level: 'error' }),);
winston.add(new winston.transports.File({ filename: 'logs/infoLogs.log', level: 'info' }),);

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/levels', levelsRouter);
app.use(cors({exposedHeaders: ['x-auth-token']}));
app.use((err, req, res, next) => { handleError(err, res) });

module.exports = app;