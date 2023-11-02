/**
 * file: src/app.js
 * description: file responsible for the execution of the application
 * data: 09/08/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

const express = require('express');
const cors = require('cors');

const app = express();

// ==> Routes:
const index = require('./routes/index');
const aoaiRoute = require('./routes/aoai.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', aoaiRoute);

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

module.exports = app;