const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   email : {
      type: String,
      lowercase: true,
      unique: true
   },
   password : String
})

module.exports = mongoose.model('user', userSchema);
