'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');

// scrapes the article off of the URL then sends it back to the client
exports.index = function(req, res) {
	console.log(req.body.url);
	// start scraper and scrape article content
	// article = {title: title, summary: summary, body: body}
	// res.json(article);
	var options = {
		url: req.body.url,
		method: 'GET'
	};
	// extract postNum
	var articleObj = {};
	console.log("here");
	request(options, function(err, response, html){
		if (!err) {
			var $ = cheerio.load(html);
			articleObj.title = $('h1.title').text();
			articleObj.byline = $('header div a.navigate', '#page-body-content').text()
			console.log(articleObj);
			// get content of each .prose p
		} else {
			console.log(err);
		}
	});
	console.log(articleObj);
	res.send(200);
};

// calls http://developer.wordnik.com/v4/word.json/{word}/definitions and returns the definition to the client
exports.definition = function(req, res) {

};