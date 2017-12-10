const mongoose = require('mongoose');

const PagesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateEdited: {
    type: Date,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tag',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContentType',
    required: true,
  }
});

module.exports = mongoose.model('Page', PagesSchema);
