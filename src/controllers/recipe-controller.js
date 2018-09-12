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
        console.log('Url: '+ url);

        request({url: url}, (error, response, body) => {
            
            validator.hasError(error, 'Erro '+ response.statusCode + error);
            
            // Se os não dados forem inválidos
            if (!validator.isValid()){
                res.status(400).send(validator.errors()).end();
                validator.clear();
                return;
            }

            let parsedBody = JSON.parse(body);
            // var gif = [];
            var recipes = [];

            // Chamar o request do Giphy a cada título, e o retorno adicionar a um array
            for (i in parsedBody.results){
                let q = encodeURIComponent(parsedBody.results[i].title);
                let search = 'https://api.giphy.com/v1/gifs/search?api_key=SeUJW7KKSHnD5FWZ3yY7PtQ9N448tYwH&q='+q+'&limit=1&offset=0&rating=R&lang=en';
                // console.log('Procurando giphy: '+search);

                request({url: search}, (error, response, body) => {
                    const info = JSON.parse(body);
                    var item2 = {};
                    item2.gif = info.data[0].images.original.url;
                    // console.log('Elem item '+item2.gif);
                    recipes.push(item2);
                });
            }

            
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