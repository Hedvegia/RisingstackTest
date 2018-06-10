const mongoose = require('mongoose');  

const AccountSchema = new mongoose.Schema({  
  name: String,
  email: String,
  token: String
});
mongoose.model('Account', AccountSchema);

module.exports = mongoose.model('Account');