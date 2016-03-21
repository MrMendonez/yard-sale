var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  _user: {
     type: Schema.Types.ObjectId,
      ref: 'User'
    },
  description: {
    type: String
  },
  amount: {
    type: Number,
    required:true
  },
  name: {
    type:String,
    required:true
  },
});

var Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;