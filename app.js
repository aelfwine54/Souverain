const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const ValidationError = require("express-validation").ValidationError;
const logger = require("morgan");
const config = require("dotenv");
const eta = require("eta");

config.config();

const htmlRouter = require("./routes/html");

const app = express();

app.engine("eta", eta.renderFile);
eta.configure({views: "./views", cache: false});
app.set("views", "./views");
app.set("view cache", false);
app.set("view engine", "eta");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {
        fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension : 4,

}));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Souverain API par Swagger",
            version: "0.1.0",
            description: "Vue Swagger de l'API de Souverain",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Frédéric Bergeron",
                url: "https://fredericbergeron.net",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.use("/html", htmlRouter);
app.use("/api/semenciers", require("./routes/semenciers"));
app.use("/api/semences", require("./routes/semences"));



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
