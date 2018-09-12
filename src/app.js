'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const url = require('url');  
const querystring = require('querystring'); 

const app = express();
const router = express.Router();

// Carrega as rotas
const index = require('./routes/index');
const recipe = require('./routes/recipe');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/recipes', recipe);

module.exports = app;