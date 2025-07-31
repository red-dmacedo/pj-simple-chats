const express = require('express');
const User = require('../models/user');
const Conversation = require('../models/conversation');
const helpers = require('../modules/helpers.js');
const router = express.Router();

// extract helper functions
// const getConversationName = helpers.getConversationName;
const createSendConvObj = helpers.createSendConvObj;

router.get('/:id', async (req, res) => { // load user page for the first time
  const user = await User.findById(req.session.user._id);
  const targetConv = await Conversation.findOne({ _id: { $in: user.conversations } }); // later: user.conversations.map(conv => conv.refId)
  const sendObj = await createSendConvObj(req, targetConv);

  res.render('user/index.ejs', sendObj);
});

module.exports = router;
