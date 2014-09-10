'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/articles', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .post('/api/articles')
      .send({url: 'http://www.fastcoexist.com/3034777/the-man-who-feeds-12-million-kids-a-day'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});