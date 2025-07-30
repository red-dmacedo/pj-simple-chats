const express = require('express');
const User = require('../models/user.js');
const Conversation = require('../models/conversation.js');
const router = express.Router();

// router.get('/:id', async (req, res) => {});

router.get('/', async (req, res) => {
  // const user = await User.findById(req.session.user._id);
  const allUsers = await User.find({ _id: { $not: { $in: req.session.user._id } } }); // get all users EXCEPT current user
  res.render('conversations/show.ejs', { allUsers: allUsers });
});

router.post('/', async (req, res) => {
  const user = await User.findById(req.session.user._id); // user making the request
  const targetUser = await User.findById(req.body.userId); // user being added to conversation
  const conversations = await Conversation.find({ _id: { $in: User.conversations } });

  // find a conversation where the user and targetUser are included
  const convExists = conversations.find(conv => (conv.users.includes(user._id) && conv.users.includes(targetUser._id)) ? 1 : 0);
  // for (conv of conversations) { // find a conversation where the user and targetUser are included
  //   if (conv.users.includes(user._id) && conv.users.includes(targetUser._id)) { convExists = true; break; };
  // };

  if (convExists) { // show error if a conversation was found
    return res.send(`
    <h1 class="title-heading">Error: You already have a conversation with ${targetUser.displayName}</h1>
      <a href="/user/${user._id}/conversations">Return</a>
    `);
  } else {
    const newConversation = await Conversation.create({ name: targetUser.displayName, users: [user._id, targetUser._id], });

    user.conversations.push(newConversation._id); // add conversation to user's conversation list
    await user.save();

    targetUser.conversations.push(newConversation._id); // add conversation to targetUser
    await targetUser.save();

    res.redirect(`/user/${user._id}`);
  };
});

router.get('/:id', async (req, res) => { // get conversation
  const user = await User.findById(req.session.user._id);
  const targetConversation = user.conversations.find(el => el.toString() === req.params.id);

  if (!targetConversation) {
    return res.send(`
      <h1>Conversation not found</h1>
      <a href="/user/${req.session.user._id}/conversations">Return</a>
    `);
  };

  const sendObj = {};
  sendObj.conversations = user.conversations.filter(el => el.toString() !== req.params.id);
  sendObj.targetConversation = targetConversation;

  res.render('user/index.ejs', sendObj);
});

module.exports = router;
