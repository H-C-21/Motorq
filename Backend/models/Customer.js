const mongoose = require('mongoose');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const Schema = mongoose.Schema;

const users = new Schema({
  email: { type: String, required: true, validate: [validateEmail, 'Please fill a valid email address']},  
  username: { type: String, required: true},
  password:{type: String, required: true},
  enrollments: { type: Array, required: true},
});

module.exports = mongoose.model('users', users);