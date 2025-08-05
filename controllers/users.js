const express = require('express');
const User = require('../models/user');
const Conversation = require('../models/conversation');
const helpers = require('../modules/helpers.js');
const router = express.Router();

// extract helper functions
// const getConversationName = helpers.getConversationName;
const createSendConvObj = helpers.createSendConvObj;
let sendObj;
router.get('/:id', async (req, res) => { // load user page for the first time
  const user = await User.findById(req.session.user._id);
  if (user.conversations.length) {
    sendObj = await createSendConvObj(req);
  } else {
    sendObj = {targetConversation: null, conversations: null};
  };
    res.render('user/index.ejs', sendObj);
});

module.exports = router;
