'use strict';

const request = require('request');

exports.get = async(req, res, next) => {
    try{
        request('http://www.recipepuppy.com/api/?i=onions,garlic', (error, response, body) => {
            let parsedBody = JSON.parse(body);
            console.log('Query  '+req.query.i);
            res.status(200).send({
                error: error, // Print the error if one occurred
                statusCode: response && response.statusCode, // Print the response status code if a response was received
                keywords: req.params.i,
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