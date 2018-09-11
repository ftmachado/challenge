'use strict';

const request = require('request');

const url = require('url');  
const querystring = require('querystring'); 

exports.get = async(req, res, next) => {
    try{
        let i = req.query.i;

        // request('http://www.recipepuppy.com/api/?i=onions,garlic', (error, response, body) => {
        request('http://www.recipepuppy.com/api/',{ 'i': i}, (error, response, body) => {
            let parsedBody = JSON.parse(body);
            res.status(200).send({
                error: error, // Print the error if one occurred
                statusCode: response && response.statusCode, // Print the response status code if a response was received
                keywords: i,
                recipes:[{
                    results: parsedBody['results']
                }]
            })
        });
    } catch(e){
        res.status(500).send({
            message: 'Serviço Recipe Puppy indisponível'
        });
    }
}