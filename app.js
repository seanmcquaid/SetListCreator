const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const usersRouter = require("./routes/users");
const bandleaderRouter = require("./routes/bandleader");
const clientRouter = require("./routes/client");

app.use("/users", usersRouter);
app.use("/bandleader", bandleaderRouter);
app.use("/client", clientRouter)

app.disable("etag");

module.exports = app;