'use strict';

const test = require('tape');
const app = require('../server.js');
const request = require('supertest');

test('First test!', function (t) {
  t.end();
});

test('Test for nonexisting registration endpoint', function (test) {
  request(app)
    .post('/none')
    .expect(404)
    .end(function (err, res) {
      test.same(404, res.statusCode, 'correct status code to nonexisting endpoint')
    });
  test.end();
});

test('Test for nonexisting users endpoint', function (test) {
  request(app)
    .get('/none')
    .expect(404)
    .end(function (err, res) {
      test.same(404, res.statusCode, 'correct status code to nonexisting endpoint')
    });
  test.end();
});

test('GET /users get users from mongodb', function (test) {
  request(app) 
    .get('/users?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTUyODY1MTk1Mn0.522JpCSzkSIvNFZOJ9Q9kLuAfgbGpobBNGQNKOAWZA8')
    .expect(200)
    .end(function (err, res) {
      test.same(200, res.status, 'successfuly get users.')
      if (res.statusCode === 200) {
        const expected = [];
        test.same(expected, res.body, 'correct response to user endpoint');
      }
    });
  test.end();
})

test('POST /registration post user', function (test) {
  request(app)
    .post('/registration')
    .send({name: 'a', email: 'valaki@valaki.com'})
    .expect(200)
    .end(function (err, res) {
      test.same(200, res.statusCode, 'user datas saved.')
    });
  test.end();
});  
