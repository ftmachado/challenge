'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const url = require('url');  
const querystring = require('querystring'); 

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect(config.connectionString);

// Carrega os models
// const Recipe = require('./models/');

// Carrega as rotas
const index = require('./routes/index');
const recipe = require('./routes/recipe');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/recipes', recipe);
// app.get('/recipes/', async(req, res) =>{
//     let i = req.query.i;
//     res.status(200).send({
//         message: 'Ingrediente passado '+i
//     });
// });

module.exports = app;