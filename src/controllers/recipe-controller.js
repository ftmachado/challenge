'use strict';

const r = require('request-promise');
const url = require('url');  
const querystring = require('querystring');
const https = require('https');

const Validation = require('../validators/fluent-validator');
var validator = new Validation();

var promises = [];

function getRecipe(ingredients) {

    return new Promise( (resolve, reject) => {
        let options = {
            uri: 'http://www.recipepuppy.com/api/',
            qs: {
                i: ingredients
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        r(options).then( (parsedBody) =>{

            var recipes = [];

            for (var i in parsedBody.results){
                var item = {};
                item.title = parsedBody.results[i].title;
                item.ingredients = parsedBody.results[i].ingredients;
                item.link = parsedBody.results[i].href;
                recipes.push(item);
            }
    
            recipes.sort( (a, b) => {
                return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
            });

            resolve(recipes);

        }).catch( (e) =>{
            reject('API RecippePuppy indisponível');
        })

    })

}

function getGiphy(title){
    return new Promise( (resolve, reject) => {
        
        let q = encodeURIComponent(title);
        let search = 'https://api.giphy.com/v1/gifs/search?api_key=SeUJW7KKSHnD5FWZ3yY7PtQ9N448tYwH&q='+q+'&limit=1&offset=0&rating=R&lang=en';
        // console.log('Url Giphy: '+search);

        r(search).then( (result) => {
            
            let parsedBody = JSON.parse(result);
            resolve(parsedBody.data[0].images.original.url);

        }).catch( (e) =>{
            reject('Giphy API indisponível');
        })
        
    })
}

let getOneGiphy = function(title){
    
    return new Promise(function(resolve, reject){
        
        let options = {
            hostname: 'https://api.giphy.com',
            port: 443,
            path: '/v1/gifs/search?api_key=SeUJW7KKSHnD5FWZ3yY7PtQ9N448tYwH&q='+title+'&limit=1&offset=0&rating=R&lang=en',
            method: 'GET'
        };

        let req = https.request(options, (res) => {
            
            res.on('data', (d) => {
                try{
                    let result = JSON.parse(d);
                    resolve(result.data[0].images.original.url);
                    
                } catch(ex) {
                    reject(ex);
                }
            });

        });

        req.on('error', (e) => { reject(e); });
        req.end();

    });

}

exports.get = async(req, res, next) => {
        
        let i = req.query.i;
        let ing = i.split(",");
        
        validator.hasMaxLen(ing, 3, 'A requisição deve conter no máximo 3 ingredientes');

        // Se os não dados forem inválidos
        if (!validator.isValid()){
            res.status(400).send(validator.errors()).end();
            validator.clear();
            return;
        }
        
        getRecipe(i).then( (result) =>{
            //popular um result[i].gif
            
            for (var i in result){

                return getGiphy(result[i].title).then( (resultGiphy) => {
                    result[i].gif = resultGiphy;
                    return result;
                })

            }

            // return result;
            // var i= 0;
            // return getGiphy(result[i].title).then( (resultGiphy) => {
                
            //     result[i].gif = resultGiphy;
            //     // console.log('Result giphy '+result[0].gif);
            //     // console.log('Result all giphys '+resultGiphy);

            //     if (result[i++] != undefined){
            //         return getGiphy(result[i++].title);
            //     } else{
            //         return result;
            //     }

                
            // })

            //.catch( (e) => {
            //     result[0].gif = e;
            // })

            // for (var i in result.title){
            //     console.log('Chamando o titulo '+i);
                
            //     promises.push( getOneGiphy( encodeURIComponent(result[i].title) ) );
            //     console.log( encodeURIComponent(result[i].title) );
            // }

            
            // return Promise.all(promises).then( (all) =>{
                
            //     // Merge dos Arrays para mostrar bonito
            //     for (var i in result){
            //         result[i].gif = all[i];
            //     }
                
            // })

        })
        .then( (result) =>{

            res.status(200).send({ 
                keywords: ing,
                recipes: result 
            });

        })
        .catch( (e) => {

            res.status(500).send({ msg: e });

        });

}