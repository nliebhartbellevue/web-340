/**
 * Title: app.js
 * Author: Nathaniel Liebhart
 * Date: September 9th, 2019
 * Description: Express server
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use();
