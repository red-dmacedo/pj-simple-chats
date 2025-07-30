const express = require('express');
const User = require('../models/user');
const router = express.Router();

// router.get('/', (req,res) => {
//   res.redirect(`/user/${req.session.user._id}`);
// });

router.get('/:id', async (req, res) => { // load user page for the first time
  const user = await User.findById(req.session.user._id);
  const sendObj = {};

  if (user.conversations[0]) {
    sendObj.targetConversation = user.conversations[0];
    sendObj.conversations = user.conversations.slice(1, user.conversations.length - 1);
  } else {
    sendObj.targetConversation = null;
    sendObj.conversations = null;
  };

  res.render('user/index.ejs', sendObj);
});

module.exports = router;
