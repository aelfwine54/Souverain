const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ValidationError = require("express-validation").ValidationError;
const logger = require("morgan");
const config = require("dotenv");
const eta = require("eta");

config.config();

const htmlRouter = require("./routes/html");
const usersRouter = require("./routes/users");
const semenciersRouter = require("./routes/semenciers");

const app = express();

app.engine("eta", eta.renderFile);
eta.configure({views: "./views", cache: false});
app.set("views", "./views");
app.set("view cache", false);
app.set("view engine", "eta");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use("/html", htmlRouter);
app.use("/users", usersRouter);
app.use("/semenciers", semenciersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res) {
    if (err instanceof ValidationError) {
        const messages = [];
        for (const cle in err.details) {
            for (const index in err.details[cle]) {
                messages.push(`${cle} ${err.details[cle][index].message}`);
            }
        }
        console.log(messages);
        return res.status(err.statusCode).json(messages);
    }
    return res.status(500).json(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
