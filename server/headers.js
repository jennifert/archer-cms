const mongoose = require('mongoose');

const HeaderImagesSchema = new mongoose.Schema({
  headerUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateSaved: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('HeaderImage', HeaderImagesSchema);
