const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json())
const db = require('../model/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: true }));
const Account = require('../model/users');

router.post('/registration', function (req, res) {

  const token = jwt.sign({ algorithm: 'RS256' }, process.env.SECRET);

  const user = {
    name: req.body.name,
    email: req.body.email 
  }

  const url = req.protocol + "://localhost" + process.env.PORT + '/users?token=' + token;

  const emailDatas = {
    service: process.env.EMAIL,
    auth: {
      user: process.env.ADDRESS,
      password: process.env.PASSWORD
    }
  }
  
  const emailDetails = {
    from: process.env.ADDRESS,
    to: user.email,
    subject: `Let's see who else use this app`,
    text: "Hello,<br> Please Click on the link to see the other users.<br><a href="+url+"></a>" 
  }
//insert into database
  Account.create({
    name : user.name,
    email : user.email,
  },
  function (err, user) {
    if (err) return res.send("Adding faild!");
    res.send(user);
  });
//email sender
  let transporter = nodemailer.createTransport({emailDatas});

  transporter.sendMail(emailDetails, function(error, info){
    if (error) {
        error
    } else {
        console.log(info.response);
    }
  });

});

module.exports = router;