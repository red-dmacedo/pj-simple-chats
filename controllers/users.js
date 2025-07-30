const express = require('express');
const User = require('../models/user');
const router = express.Router();

// router.get('/', (req,res) => {
//   res.redirect(`/user/${req.session.user._id}`);
// });

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const sendObj = {};
  sendObj.conversations = user.conversations
  if (user.conversations[0]) sendObj.selectedConversation = user.conversations[0];
  res.render('user/index.ejs', sendObj);
});

router.get('/:id/conversation/:convId', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const selectedConversation = user.conversations.find(el => el.toString() === req.params.convId);
  const sendObj = {};
  sendObj.conversations = user.conversations.filter(el => el.toString() !== req.params.convId);
  sendObj.selectedConversation = selectedConversation;
  res.render('user/index.ejs', sendObj);
});

module.exports = router;