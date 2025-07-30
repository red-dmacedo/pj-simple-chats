const express = require('express');
const User = require('../models/user');
const router = express.Router();

// router.get('/:id', async (req, res) => {});

router.get('/new', async (req, res) => {
  // const user = await User.findById(req.session.user._id);
  const allUsers = await User.find({});
  res.render('conversations/new.ejs', {allUsers: allUsers});
});

router.get('/:id', async (req, res) => { // get conversation
  const user = await User.findById(req.session.user._id);
  const targetConversation = user.conversations.find(el => el.toString() === req.params.id);

  if (!targetConversation) {
    return res.send(`
      <h1>Conversation not found</h1>
      <a href="/user/${req.session.user._id}">Return</a>
    `);
  };

  const sendObj = {};
  sendObj.conversations = user.conversations.filter(el => el.toString() !== req.params.id);
  sendObj.targetConversation = targetConversation;

  res.render('user/index.ejs', sendObj);
});

module.exports = router;