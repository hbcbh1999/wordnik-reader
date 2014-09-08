'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.post('/', controller.index);
router.post('/word/definition', controller.definition);

module.exports = router;