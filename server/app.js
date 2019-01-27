const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
var forceSsl = require('force-ssl-heroku');

const app = express();
app.use(forceSsl);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Credentials",
    "true"
  );
  next();
});

app.use("/", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;

