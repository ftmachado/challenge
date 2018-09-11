'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect(config.connectionString);

// Carrega os models
// const Recipe = require('./models/');

// Carrega as rotas
const index = require('./routes/index');
// const recipe = require('./routes/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', index);
// app.use('/recipes', recipe);

module.exports = app;