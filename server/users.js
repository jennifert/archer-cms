const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'author', 'viewer'],
    default: 'viewer'
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
