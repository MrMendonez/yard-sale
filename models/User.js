var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : {
      type : String,
      required : true,
      unique : true
    },
    password: {
      type: String,
      required: true
    },
    budget : {
      type : Number,
    },
    createdDate : {
      type : Date,
      default : Date.now()
    },
    expenses : [{
       type : Schema.Types.ObjectId,
        ref : 'Expense'
      }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;