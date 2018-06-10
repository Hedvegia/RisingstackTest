const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/config');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
const Account = require('../model/users');

router.get('/users', function (req, res) {

  Account.find({}, function (err, users) {
    if (err) return res.send("Find users faild!");

    const token = req.query.token;

    try {
      jwt.verify(token, process.env.SECRET, { algorithm: ['RS256']});
    } catch (error) {
      console.log(error);
    } 

    res.send(users);
  }); 
});

module.exports = router;