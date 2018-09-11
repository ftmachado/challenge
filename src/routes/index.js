'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Delivery Much Tech Challenge",
        author: "Fhabiana Thieli Machado",
        github: "https://github.com/ftmachado/challenge",
        version: "0.0.1"
    });
});

module.exports = router;