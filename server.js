const express = require('express');
const bodyParser = require('body-parser');

const registration = require('./routes/registration');
const users = require('./routes/users'); 

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/assets/', express.static('assets'));

app.use('/', registration);
app.use('/', users); 

app.get([
  '/'
], (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`);
});

app.listen(port, () => {
  console.log(`Node app is running on port ${port}`);
});

module.exports = app;