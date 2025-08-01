const express = require('express');
const User = require('../models/user');
const Conversation = require('../models/conversation');
const helpers = require('../modules/helpers.js');
const router = express.Router();

// extract helper functions
// const getConversationName = helpers.getConversationName;
const createSendConvObj = helpers.createSendConvObj;

router.get('/:id', async (req, res) => { // load user page for the first time
  const sendObj = await createSendConvObj(req);
  res.render('user/index.ejs', sendObj);
});

module.exports = router;
