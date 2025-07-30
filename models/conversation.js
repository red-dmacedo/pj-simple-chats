const mongoose = require('mongoose');
const refs = require('./schemaRefs.js');

const messageSchema = mongoose.Schema({
  userId: refs.requiredMongObjId,
  content: refs.requiredString,
});

const conversationSchema = mongoose.Schema({
  messages: [messageSchema],
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;