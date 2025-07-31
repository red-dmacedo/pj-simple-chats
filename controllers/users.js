const express = require('express');
const User = require('../models/user');
const Conversation = require('../models/conversation');
const router = express.Router();

// router.get('/', (req,res) => {
//   res.redirect(`/user/${req.session.user._id}`);
// });

router.get('/:convId', async (req, res) => { // load user page for the first time
  const user = await User.findById(req.session.user._id);
  const conversations = await Conversation.find({ _id: { $in: user.conversations } });
  const sendObj = {};

  if (conversations) {
    const targetConversation = conversations[0];
    sendObj.targetConversation = conversations.find(conv => conv._id === targetConversation);
    sendObj.conversations = conversations.filter(conv => conv._id !== targetConversation);
  } else {
    console.log('conv0: null');
    sendObj.targetConversation = null;
    sendObj.conversations = null;
  };

  res.render('user/index.ejs', sendObj);
});

module.exports = router;
