const mongoose = require('mongoose');
const refs = require('./schemaRefs.js');

const userSchema = mongoose.Schema({
  username: refs.requiredString,
  password: refs.requiredString,
  displayName: refs.requiredString,
  email: refs.requiredString,
  conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
