const User = require('../models/user');
const Conversation = require('../models/conversation');

async function getConversationName(req, targetConv) {
  const userId = req.session.user._id;
  const convUserIds = targetConv.users.filter(id => id.toString() !== userId); // filter out the user making the request // to be changed to: conv.users.map(usr => usr.refId).filter(id => id.toString() !== userId)
  const users = await User.find({ _id: { $in: convUserIds } }); // users involved in the conversation
  return users.map(usr => usr.displayName).join(', '); // get displayNames of all involved users and join them to a single string
};

async function createSendConvObj(req, targetConv) {
  // return object: sendConvObj {targetConversation, targetUsers, conversations}
  const user = await User.findById(req.session.user._id);
  const userConversations = await Conversation.find({ _id: { $in: user.conversations } }); // later: user.conversations.map(conv => conv.refId)
  const sendConvObj = {};

  const targetConversation = targetConv || userConversations[0]; // allow targetConv to be null
  targetConversation.name = await getConversationName(req, targetConversation); // set name
  sendConvObj.targetConversation = targetConversation; // attach to object

  const targetUsers = await User.find({ _id: { $in: targetConversation.users } });
  sendConvObj.targetUsers = targetUsers.map(usr => { return { _id: usr._id, displayName: usr.displayName } });

  if (userConversations) {
    const sendConvs = userConversations.filter((conv) => conv._id.toString() !== targetConversation._id.toString()) // filter out targetConversation
    const sendConversations = await Promise.all(
      sendConvs.map(async (conv) => {
        const returnObj = { name: (await getConversationName(req, conv)), _id: conv._id };
        return returnObj
      })
    ); // map to { name, _id }
    sendConvObj.conversations = sendConversations;
  } else {
    sendConvObj.conversations = null;
  };

  return sendConvObj;
};

module.exports = {
  createSendConvObj,
  getConversationName,
};