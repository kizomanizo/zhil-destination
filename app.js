var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const winston = require('winston');

var usersRouter = require('./routes/users');
var levelsRouter = require('./routes/levels');
var goalsRouter = require('./routes/goals');

const cors = require('cors');
const { handleError } = require('./helpers/error');
winston.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),);
winston.add(new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),);

var app = express();

// Remove 'X-Powered-By' header from HTTP response headers - Kz
app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({exposedHeaders: ['x-auth-token']}));
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/levels', levelsRouter);
app.use('/api/v1/goals', goalsRouter);
app.use((err, req, res, next) => { handleError(err, res) });

module.exports = app;