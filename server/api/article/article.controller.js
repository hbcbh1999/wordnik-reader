'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');

// scrapes the article off of the URL then sends it back to the client
exports.index = function(req, res) {
	console.log(req.url);
	res.send(200);
};

// calls http://developer.wordnik.com/v4/word.json/{word}/definitions and returns the definition to the client
exports.definition = function(req, res) {

};