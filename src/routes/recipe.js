'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipe-controller');

router.get('/:i', controller.get);

module.exports = router;