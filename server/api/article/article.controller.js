'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var config = require('../../config/environment');

// scrapes the article off of the URL then sends it back to the client
exports.index = function(req, res) {
	var options = {
		url: req.body.url,
		method: 'GET'
	};
	var articleObj = {};
	request(options, function(err, response, html){
		if (!err) {
			var $ = cheerio.load(html);
			articleObj.title = $('h1.title').text();
			articleObj.summary = $('.deck p').text();
			articleObj.byline = $('header div a.navigate', '#page-body-content').text();
			articleObj.content = [];
			$('.prose p').each(function(i, elem){
				articleObj.content[i] = $(this).text();
				articleObj.content[i] = articleObj.content[i].split(' ');
			});
			res.send(articleObj);
		} else {
			return err;
		}
	});
};

// calls http://developer.wordnik.com/v4/word.json/{word}/definitions and returns the definition to the client
exports.definition = function(req, res) {
	var options = {
		url: "https://api.wordnik.com/v4/word.json/"+req.body.word+"/definitions?limit=50&includeRelated=false&useCanonical=false&includeTags=false&api_key=3369a020785698ed6150309068b04e2f961502800c5fb00c4",//+config.wordnik.apiKey,
		method: "GET"
	};
	console.log(options);
	request(options, function(err, response, wordObj){
		console.log("here");
		if (!err){
			console.log(response.statusCode, wordObj);
			res.send(wordObj);
		} else {
			console.log(err, "everywhere");
			res.send(404);
		}
	});
};