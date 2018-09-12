'use strict';

const request = require('request');
const url = require('url');  
const querystring = require('querystring');

const Validation = require('../validators/fluent-validator');
var validator = new Validation();

exports.get = async(req, res, next) => {
    try{
        let i = req.query.i;
        let ing = i.split(",");
        
        validator.hasMaxLen(ing, 3, 'A requisição deve conter no máximo 3 ingredientes');

        // Se os não dados forem inválidos
        if (!validator.isValid()){
            res.status(400).send(validator.errors()).end();
            validator.clear();
            return;
        }
        
        let url = 'http://www.recipepuppy.com/api/?i='+i;
        console.log('Url: '+url)

        request({url: url}, (error, response, body) => {
            
            validator.hasError(error, 'Erro '+ response.statusCode + error);
            
            // Se os não dados forem inválidos
            if (!validator.isValid()){
                res.status(400).send(validator.errors()).end();
                validator.clear();
                return;
            }

            let parsedBody = JSON.parse(body);
            let recipes = [];

            for (i in parsedBody.results){
                var item = {};
                item.title = parsedBody.results[i].title;
                item.ingredients = parsedBody.results[i].ingredients;
                item.link = parsedBody.results[i].href;
                recipes.push(item);
            }

            recipes.sort( (a, b) => {
                return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
            });
            
            res.status(200).send({
                keywords: ing,
                recipes: recipes
            })
        });
    } catch(e){
        res.status(500).send({
            message: 'Serviço Recipe Puppy indisponível'
        });
    }
}