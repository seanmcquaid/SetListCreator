const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');
const bandLeaderRouter = require("./routes/bandLeader");
const clientRouter = require("./routes/client");

app.use('/users', usersRouter);
app.use("/bandLeader", bandLeaderRouter);
app.use("/client", clientRouter)

module.exports = app;