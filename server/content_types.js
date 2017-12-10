const mongoose = require('mongoose');

const ContentTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ContentType', ContentTypesSchema);
