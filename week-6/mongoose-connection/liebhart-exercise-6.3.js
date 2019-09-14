/**
 * Title:         Exercise 6.3
 * Author:        Nathaniel Liebhart
 * Date:          September 13th, 2019
 * Description:   Mongoose Connection to mLab
 */

const express = require("express");
const http = require("http");
const logger = require("morgan");
const mongoose = require("mongoose");

const dbUser = "dbAdmin";
const dbPass = "password1";
const dbURI = "@ds139939.mlab.com:39939/ems-db";

// mLab connection
const dbConn = `mongodb://${dbUser}:${dbPass}${dbURI}`;
mongoose.connect(dbConn);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
// On error | on open
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("Mongoose connected to mLab successfully!");
});

const app = express();
app.use(logger("short"));

// create server
http.createServer(app).listen(8080, () => {
  console.log("Express started on port 8080!");
});
