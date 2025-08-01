const mongoose = require('mongoose');
const refs = require('./schemaRefs.js');

const messageSchema = mongoose.Schema({
  userId: refs.requiredMongObjId,
  content: refs.requiredString,
}, { timestamps: true });

// Add later
// const usersSchema = mongoose.Schema({
//   refId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   chatName: String,
// });

const conversationSchema = mongoose.Schema({
  // name: refs.requiredString,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }],
  messages: [messageSchema],
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
