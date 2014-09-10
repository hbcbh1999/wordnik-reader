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
	request(options, function(err, response, html){
		console.log("we're requesting and cheering")
		if (!err) {
			var $ = cheerio.load(html);
			articleObj.title = $('h1.title').text();
			articleObj.summary = $('.deck p').text();
			articleObj.byline = $('header div a.navigate', '#page-body-content').text();
			articleObj.content = [];
			$('.prose p').each(function(i, elem){
				articleObj.content[i] = $(this).text();
			});
			console.log("boom", articleObj);
			res.send(articleObj);
		} else {
			return err;
		}
	});
};

// calls http://developer.wordnik.com/v4/word.json/{word}/definitions and returns the definition to the client
exports.definition = function(req, res) {

};