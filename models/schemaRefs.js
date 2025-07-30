const mongoose = require('mongoose');
const requiredString = { type: String, required: true, };
const requiredNumber = { type: Number, required: true, };
const requiredMongObjId = { type: mongoose.Schema.Types.ObjectId, required: true, };
const requiredDate = {type: Date, required: true}

module.exports = {
  requiredString,
  requiredNumber,
  requiredMongObjId,
  requiredDate,
};
